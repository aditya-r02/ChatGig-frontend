import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { setLoading } from "../Slices/LoadingSlice";

export default function ChatPage(){
    const token = useSelector((state)=>state.userDetails.token);
    const chatDiv = useRef(null);
    const userName = useParams().userName;
    const currentUserName = localStorage.getItem("userName");
    const socket = io("http://localhost:4000");
    const fetchChatUrl = "http://localhost:4000/api/v1/fetchchat";
    const sendMessageUrl = "http://localhost:4000/api/v1/sendmessage";
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const dispatch = useDispatch();

    socket.on("forwardMessage", ()=>{
        fetchChat();
    })

     
    // socket.on("connection", ()=>{
    //     console.log(socket.id);
    // })

    const fetchChat = async() =>{
        let result;
        
        try{
            result = await axios.post(fetchChatUrl, {token, userName});
            setChat(result.data.data);
            
            //console.log(result.data.data);
        }
        catch(error){
            console.log(error);
        }
        
    }

    const fetchChatFirst = async() => {
        dispatch(setLoading(true));
        await fetchChat();
        dispatch(setLoading(false));
    }

    const changeHandler = (e) =>{
        setMessage(e.target.value);
    }

    const submitHandler = async(e) =>{
        e.preventDefault();
        if (message==="") return;
        let result;
        try{
            result = await axios.post(sendMessageUrl, {token, userName, message});
            //console.log(result);
            socket.emit("sendMessage", userName,currentUserName, message)
            setMessage("");
            fetchChat();
        }   
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchChatFirst();
        socket.emit("setSocketId", currentUserName);
    }, [])

    useEffect(()=>{
        if (chatDiv.current) chatDiv.current.scrollTop = chatDiv.current.scrollHeight;
    }, [chat])

    return (
        <div className="w-full px-2 relative min-h-full flex-1 lg:max-h-full flex flex-col justify-between">

            <div className="h-[calc(100vh-150px)]">
                {
                    chat.length>0 &&
                    <div ref={chatDiv} className="scrollbar-dark w-full flex flex-col gap-2 overflow-y-auto  max-h-[calc(100vh-150px)] px-1">
                        {
                            chat.map((msg, index)=>{
                                return (
                                    <div key={index} className={`w-fit px-2 text-white lg:text-lg
                                    ${msg.receiver===userName?"self-end bg-green-600 rounded-l-lg":"rounded-r-lg self-start bg-gray-600"}`}>
                                        {msg.message}
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                }
            </div>
            
            <form onSubmit={submitHandler} className="flex gap-3 my-3  px-2">
                <input type="text" value={message} onChange={changeHandler} className="grow border-none rounded-lg bg-slate-500 outline-none px-1 lg:px-2 py-1 text-white"/>
                <button type="submit" className="text-violet-300">
                    Send
                </button>
            </form>
        </div>
    )
}
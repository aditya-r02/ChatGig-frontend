import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function ChatPage(){
    const token = useSelector((state)=>state.userDetails.token);
    const userName = useParams().userName;
    const currentUserName = localStorage.getItem("userName");
    const socket = io("https://chatgig-backend.onrender.com");
    const fetchChatUrl = "https://chatgig-backend.onrender.com/api/v1/fetchchat";
    const sendMessageUrl = "https://chatgig-backend.onrender.com/api/v1/sendmessage";
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

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
        fetchChat();
        socket.emit("setSocketId", currentUserName);
    }, [])

    return (
        <div className="w-full px-2 relative">
            {
                chat.length>0 &&
                <div className="w-full flex flex-col gap-2">
                    {
                        chat.map((msg, index)=>{
                            return (
                                <div key={index} className={`w-fit 
                                ${msg.receiver===userName?"self-end bg-green-400":"self-start bg-gray-500"}`}>
                                    {msg.message}
                                </div>
                            )
                        })
                    }
                </div>
                
            }
            
            <form onSubmit={submitHandler} className="flex gap-3 my-3 fixed bottom-5 left-0 px-2 right-0">
                <input type="text" value={message} onChange={changeHandler} className="grow border"/>
                <button type="submit">
                    Send
                </button>
            </form>
        </div>
    )
}
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { BsFillSendPlusFill } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { NavLink } from "react-router-dom";




export default function Dashboard(){
    const token = useSelector((state)=>state.userDetails.token);
    
    const [userName, setUserName] = useState("");
    const [searchResult, setSearchResult] =  useState(null);
    const fetchFriendsUrl = "https://chatgig-backend.onrender.com/api/v1/friends";
    const searchUserUrl = "https://chatgig-backend.onrender.com/api/v1/searchuser";
    const fetchRequestUrl = "https://chatgig-backend.onrender.com/api/v1/fetchrequests";
    const sendRequestUrl = "https://chatgig-backend.onrender.com/api/v1/sendrequest";
    const acceptRequestUrl = "https://chatgig-backend.onrender.com/api/v1/acceptrequest";
    const [friendsData, setFriendsData] = useState([]);
    const [requestData, setRequestData] = useState([]);

    

    


    const changeHandler = (event) =>{
        setUserName(event.target.value);
    }

    const fetchFriends = async() =>{
        //console.log("hello")
        if (token===null) return;
        let result; 
        try{
            //console.log(token);
           result = await axios.post(fetchFriendsUrl, {token});
            if (result.data.success){
                setFriendsData(result.data.data);
                //console.log(result.data.data);
            }else{
                toast.error(result.data.message);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const sendRequest = async(e) =>{
        e.preventDefault();
        let result;
        try{
            //console.log(token);
            //console.log(searchResult.userName);
            result = await axios.post(sendRequestUrl, {token, userName:searchResult.userName});
            //console.log(result);
        }
        catch(error){
            console.log(error);
        }
    }

    const fetchRequests = async() =>{
        
        if (token===null) return;
        let result; 
        try{
            //console.log(token);
           result = await axios.post(fetchRequestUrl, {token});
           //console.log(result)
            if (result.data.success){
                setRequestData(result.data.data);
                //console.log(result.data.data);
            }else{
                toast.error(result.data.message);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const searchUser = async(e) =>{
        e.preventDefault();
        if (!token || userName==="") return;
        let result;
        try{
            result = await axios.post(searchUserUrl, {token, userName});

            if (result.data.success){
                setSearchResult(result.data.data);
                //console.log(result.data.data);
            }
            else{
                toast.error(result.data.message);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const acceptRequest = async(otherId) =>{
        let result;
        console.log(otherId);
        try{
            result = await axios.post(acceptRequestUrl, {token, otherId});
            //console.log(result);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchFriends();
        fetchRequests();
        
        
    }, [token])

    return (
        <div className="w-full p-2">
            <h3 className="text-3xl font-semibold">
                Dashboard
            </h3>

            <form className="w-full py-2 pr-2" onSubmit={searchUser}>
                <label className="flex gap-3 items-center">
                    <input type="text" name="userName" value={userName} onChange={changeHandler}
                    className="grow rounded-sm text-lg border border-gray-400 px-1 outline-blue-300"
                    placeholder="Search by User Name"
                    />

                    <button className="text-lg text-blue-500" type="submit">
                        <FaSearch/>
                    </button>
                </label>
            </form>

            {
                searchResult!==null && 
                <form className="w-fit mx-auto rounded-lg flex gap-4 items-center my-4 justify-center
                py-2 px-4 border border-gray-700"
                onSubmit={sendRequest}>
                    <p>{searchResult.firstName+" "+searchResult.lastName}</p>
                    <button className="text-xl" type="submit">
                        <BsFillSendPlusFill/>
                    </button>
                </form>
            }

            <h3 className="text-3xl font-semibold">
                Friend Requests
            </h3>

            <div className="w-full flex flex-col gap-2 my-2">
                {   
                    
                    requestData.map((user, index)=>{
                        //console.log(user)
                        return (
                            <div key={index} className="flex gap-4 items-center">
                                <span className="text-lg">
                                    {user.firstName+" "+user.lastName}
                                </span>
                                <button className="text-lg " onClick={()=>{acceptRequest(user._id)}}>
                                    <CiCirclePlus/>
                                </button>
                            </div>
                        )
                    })
                }
            </div>

            <h3 className="text-3xl font-semibold">Friends</h3>

            <div className="w-full flex flex-col my-2">
                {
                    friendsData.map((friend, index)=>{
                        return (
                            <NavLink to={"/chat/"+friend.userName} className="" key={index}>
                                <span>
                                    {friend.firstName+" "+friend.lastName}
                                </span>
                            </NavLink>
                        )
                    })
                }
            </div>

        </div>
    )
}
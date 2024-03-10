import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { BsFillSendPlusFill } from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { IoIosSend } from "react-icons/io";




export default function Dashboard() {
    const token = useSelector((state) => state.userDetails.token);

    const [userName, setUserName] = useState("");
    const [searchResult, setSearchResult] = useState(null);
    const [isFriend, setIsFriend] = useState(false);
    const fetchFriendsUrl = "https://chatgig-backend.onrender.com/api/v1/friends";
    const searchUserUrl = "https://chatgig-backend.onrender.com/api/v1/searchuser";
    const fetchRequestUrl = "https://chatgig-backend.onrender.com/api/v1/fetchrequests";
    const sendRequestUrl = "https://chatgig-backend.onrender.com/api/v1/sendrequest";
    const acceptRequestUrl = "https://chatgig-backend.onrender.com/api/v1/acceptrequest";
    const [friendsData, setFriendsData] = useState([]);
    const [requestData, setRequestData] = useState([]);
    const [section, setSection] = useState(true);





    const changeHandler = (event) => {
        setUserName(event.target.value);
    }

    const fetchFriends = async () => {
        //console.log("hello")
        if (token === null) return;
        let result;
        try {
            //console.log(token);
            result = await axios.post(fetchFriendsUrl, { token });
            if (result.data.success) {
                setFriendsData(result.data.data);
                //console.log(result.data.data);
            } else {
                toast.error(result.data.message);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const sendRequest = async (e) => {
        e.preventDefault();
        let result;
        try {
            //console.log(token);
            //console.log(searchResult.userName);
            result = await axios.post(sendRequestUrl, { token, userName: searchResult.userName });
            //console.log(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    const fetchRequests = async () => {

        if (token === null) return;
        let result;
        try {
            //console.log(token);
            result = await axios.post(fetchRequestUrl, { token });
            //console.log(result)
            if (result.data.success) {
                setRequestData(result.data.data);
                //console.log(result.data.data);
            } else {
                toast.error(result.data.message);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const searchUser = async (e) => {
        e.preventDefault();
        if (!token || userName === "") return;
        let result;
        try {
            result = await axios.post(searchUserUrl, { token, userName });

            if (result.data.success) {
                setSearchResult(result.data.data);
                setIsFriend(result.data.isFriend);
                console.log(result.data.isFriend);
            }
            else {
                toast.error(result.data.message);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const acceptRequest = async (otherId) => {
        let result;
        console.log(otherId);
        try {
            result = await axios.post(acceptRequestUrl, { token, otherId });
            //console.log(result);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchFriends();
        fetchRequests();


    }, [token])

    return (
        <div className="w-full px-2 pt-5 h-full">
            {/*Select bar*/}
            <div className=" w-full grid grid-cols-2 relative pb-1 ">
                <div className={`text-center text-xl py-1 
                ${section ? 'text-white  border-b border-violet-400' : 'text-slate-400'}`}
                    onClick={() => { setSection(true) }}>
                    Friends
                </div>

                <div className={`text-center text-xl py-1 
                ${!section ? 'text-white border-b border-violet-400' : 'text-slate-400'}`}
                    onClick={() => { setSection(false) }}>
                    Requests
                </div>

            </div>

            {/*Friends list*/}
            {
                section &&
                <div className="w-full flex flex-col my-2 gap-2">
                    {
                        friendsData.map((friend, index) => {
                            return (
                                <NavLink to={"/chat/" + friend.userName} key={index}
                                    className="w-full bg-slate-500/50 rounded-lg px-5 py-2 text-lg text-white
                                    flex gap-2 items-center">
                                    <span>
                                        <img src={"https://api.dicebear.com/5.x/initials/svg?seed="+friend.firstName+
                                        " "+friend.lastName} className="w-8 h-8 rounded-full"/>
                                    </span>
                                    <span>
                                        {friend.firstName + " " + friend.lastName}
                                    </span>
                                </NavLink>
                            )
                        })
                    }
                </div>
            }

            {
                !section &&
                <div>
                    <form className="w-full py-2 pr-2" onSubmit={searchUser}>
                        <label className="flex gap-3 items-center">
                            <input type="text" name="userName" value={userName} onChange={changeHandler}
                                className="grow rounded-md text-lg bg-slate-500/50 py-1 px-2 outline-none
                                text-white"
                                placeholder="Search by User Name"
                            />

                            <button className="text-lg text-violet-500" type="submit">
                                <FaSearch />
                            </button>
                        </label>
                    </form>

                    {
                        searchResult !== null &&
                        <form className="w-fit mx-auto rounded-lg flex gap-4 items-center my-4 justify-center
                py-2 px-4 border border-gray-500"
                            onSubmit={sendRequest}>
                            <p className="text-white">{searchResult.firstName + " " + searchResult.lastName}</p>
                            {
                                !isFriend &&
                                <button className="text-xl text-violet-400" type="submit">
                                    <BsFillSendPlusFill />
                                </button>
                            }
                            {
                                isFriend &&
                                <NavLink to={"/chat/" + searchResult.userName} className="text-xl text-violet-400">
                                    <IoIosSend/>
                                </NavLink>
                            }
                        </form>
                    }


                    <div className="w-full flex flex-col gap-2 my-2">
                        {

                            requestData.map((user, index) => {
                                //console.log(user)
                                return (
                                    <div key={index} className="flex gap-4 items-center
                                    text-white bg-slate-500/70 rounded-md px-2 py-1 justify-between">
                                        <span className="text-lg">
                                            {user.firstName + " " + user.lastName}
                                        </span>
                                        <button className="text-3xl " onClick={() => { acceptRequest(user._id) }}>
                                            <CiCirclePlus />
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }





        </div>
    )
}
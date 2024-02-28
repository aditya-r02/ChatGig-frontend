import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa6";
import logo from "../assets/images/logo.png"
import { NavLink } from "react-router-dom";

import { setToken } from "../Slices/UserSlice";
import { useEffect } from "react";

export default function Home(){
    // const logo = "https://res.cloudinary.com/dqdy8u03v/image/upload/v1708175318/logo_lsavxw.png";
    const dispatch = useDispatch();
    const logOut = () =>{
        localStorage.clear();
        dispatch(setToken(null));
    }

    const token = useSelector((state)=>state.userDetails.token);

    useEffect(()=>{
        const to = (localStorage.getItem("token"))?localStorage.getItem("token"):null;
        dispatch(setToken(to));
    },[])


    return (
        <div className="w-full">
            <div className="flex flex-col w-full items-center">
                {/*Image part*/}
                <div className="w-full relative">
                    <img src={logo} loading="lazy" className="w-full h-auto" alt="home"/>
                    <div className="absolute top-0 text-white bottom-0 flex flex-col justify-center
                    items-center left-0 right-0">
                        <p className="text-3xl font-bold">Meet new people,</p>
                        <p className="text-3xl font-bold">chat with friends</p>
                        <p className="text-base font-normal">Join the chat community today!</p>
                    </div>
                </div>

                {/*For logged in users*/}
                {
                    token &&
                    <div className="w-full px-4 my-4 gap-4 flex flex-col">
                        <NavLink to="/dashboard" className="flex gap-1 items-center cursor-pointer py-2  bg-blue-600
                        text-white rounded-md text-lg w-full justify-center">
                            Dashboard
                            <FaArrowRight/>
                        </NavLink>

                        <div className="flex gap-1 items-center cursor-pointer py-2  bg-white
                        text-black rounded-md text-lg w-full justify-center"
                        onClick={logOut}>
                            LogOut
                        </div>
                    </div>
                }
                
                {/*for new users*/}
                {
                    !token &&
                    <div className="w-full px-4 my-4 gap-4 flex flex-col">
                        <NavLink to="/signup" className="flex gap-1 items-center cursor-pointer py-2  bg-blue-600
                        text-white rounded-md text-lg w-full justify-center">
                            Sign Up
                            <FaArrowRight/>
                        </NavLink>

                        <NavLink to="/login" className="flex gap-1 items-center cursor-pointer py-2  bg-white
                        text-black rounded-md text-lg w-full justify-center">
                            Log In
                        </NavLink>
                    </div>
                }
            </div>
        </div>
    )
}
import image from "../assets/images/signup.png"
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

export default function SignupPage(){
    const [data, setData] = useState({email:"", password:"", firstName:"", lastName:"", userName:"",
    otp:""});
    const url = "https://chatgig-backend.onrender.com/api/v1/getotp";
    const userNameUrl = "https://chatgig-backend.onrender.com/api/v1/checkusername";
    const otpUrl = "https://chatgig-backend.onrender.com/api/v1/signup"
    const [checked, setChecked] = useState(false);
    const [otpSection, setOtpSection] = useState(false);

    const navigate = useNavigate();

    const changeHandler = (e) =>{
        const {name, value} = e.target;
        setData({...data, [name]:value});
        
    }

    const submitHandler = async(e) =>{
        e.preventDefault();
        if (!checked) {
            toast.error("Enter a valid user name");
            return;
        }
        let result;
        try{
            result = await axios.post(url, {email:data.email, password:data.password, firstName:data.firstName,
            lastName:data.lastName, userName:data.userName});
            
            if (result.data.success){
                toast.success(result.data.message);
                setOtpSection(true);
            }
            else{
                toast.error(result.data.message);
            }
        }
        catch(error){
            console.log(error);
            return;
        }
        
    }

    const checkUserName = async(e) =>{
        let result;
        if (data.userName==="") return;
        //console.log(data.userName)
        try{
            result = await axios.post(userNameUrl, {userName:data.userName});
            //console.log(result)
            if (result.data.success){
                setChecked(true);
                toast.success(result.data.message);
                // Take him to login page
                
            }
            else{
                toast.error(result.data.message);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    const sendOtp = async (e) =>{
        e.preventDefault();
        let result;
        try{
            result = await axios.post(otpUrl, {email:data.email, password:data.password, firstName:data.firstName,
                lastName:data.lastName, userName:data.userName, otp:data.otp});
            //console.log(result);
            if (result.data.success){
                toast.success(result.data.message);
                navigate("/login")
            }else{
                toast.error(result.data.message);
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className="w-full max-w-full flex flex-col mx-3 min-h-fit">
            <div className="w-full overflow-x-hidden">
                <img src={image} alt="man" className="w-full h-auto"/>
            </div>

            {
                !otpSection &&
                <form className="w-full max-w-full mt-5 px-4 flex flex-col gap-3"
            onSubmit={submitHandler}>
                {/*First Name and Last Name*/}
                <div className="flex gap-1">
                    <label >
                        <p>First Name<span className="text-red-500">*</span></p>
                        <input type="text" name="firstName" value={data.firstName}
                        className=" border w-full rounded-sm text-lg"
                        onChange={changeHandler}
                        /> 
                    </label>
                    <label >
                        <p>Last Name<span className="text-red-500">*</span></p>
                        <input type="text" name="lastName" value={data.lastName}
                        className=" border w-full rounded-sm text-lg"
                        onChange={changeHandler}
                        /> 
                    </label>
                </div>

                <label className="">
                    <p>Email<span className="text-red-500">*</span></p>
                    <input type="email" name="email" value={data.email}
                    className=" border w-full rounded-sm text-lg"
                    onChange={changeHandler}
                    /> 
                </label>

                <label>
                    <p>Password<span className="text-red-500">*</span></p>
                    <input type="password" name="password" value={data.password}
                        className=" border w-full text-lg rounded-sm"
                        onChange={changeHandler}
                    />
                </label>

                {/*User Name*/}
                <div className="flex items-end gap-2">
                    <label className="">
                        <p>User Name<span className="text-red-500">*</span></p>
                        <input type="text" name="userName" value={data.userName}
                        className=" border w-full rounded-sm text-lg"
                        onChange={changeHandler}
                        /> 
                    </label>

                    <div className="cursor-pointer border border-gray-400 text-sm py-1 px-2"
                    onClick={checkUserName}>
                        Check 
                    </div>
                </div>

                <button type="submit" className="px-3 py-2 bg-blue-500 rounded-md 
                text-white font-semibold">
                    Sign Up
                </button>
                </form>
            }

            {
                otpSection &&
                <form  className="w-full max-w-full mt-5 px-4 flex flex-col gap-3"
                onSubmit={sendOtp}>
                    <label >
                        <p>Enter OTP<span className="text-red-500">*</span></p>
                        <input type="text" name="otp" value={data.otp}
                        className=" border w-full rounded-sm text-lg"
                        onChange={changeHandler}
                        /> 
                    </label>

                    <button type="submit" className="px-3 py-2 bg-blue-500 rounded-md 
                    text-white font-semibold">
                        Sign Up
                    </button>
                </form>
            }
        </div>
    )
}
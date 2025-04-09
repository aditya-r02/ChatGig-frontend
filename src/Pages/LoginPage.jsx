import { useEffect, useState } from "react"
import image from "../assets/images/login.png"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../Slices/UserSlice";
import { setLoading } from "../Slices/LoadingSlice";

export default function LoginPage(){
    const [data, setData] = useState({email:"", password:""});
    //const url = "https://res.cloudinary.com/dqdy8u03v/image/upload/v1708178893/login_u3e3kc.png"
    const url = "http://localhost:4000/api/v1/login"
    const token = useSelector((state)=>state.userDetails.token)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeHandler = (e) =>{
        const {name, value} = e.target;
        setData({...data, [name]:value});
        //console.log(name, value);
        //console.log(data);
    }

    const submitHandler = async(e) =>{
        e.preventDefault();
        let result;
        dispatch(setLoading(true));
        try{
            result = await axios.post(url, {email:data.email, password:data.password});

            if (result.data.success){
                const token = result.data.token;
                //console.log(token);
                localStorage.setItem("token", token);
                localStorage.setItem("userName", result.data.userName);
                dispatch(setToken(token));
                dispatch(setLoading(false));
                toast.success(result.data.message);
                // Navigate to dashboard
                navigate("/dashboard");
            }
            else{
                toast.error(result.data.message);
            }
            
        }
        catch(error){
            console.log(error);
            return;
        }
        dispatch(setLoading(false));
    }

    useEffect(()=>{
        if (token){
            navigate("/")
        }
    }, [])

    return (
        <div className="w-full max-w-full max-h-screen flex flex-col mx-3 mt-5 items-center">
            {/* <div className="w-full overflow-x-hidden">
                <img src={image} alt="man" className="w-full h-auto"/>
            </div> */}
            <h2 className="text-white text-center text-3xl font-semibold">
                Login
            </h2>

            <form className="w-full max-w-full mt-5 px-4 flex flex-col gap-3 text-white text-lg lg:max-w-[30rem]"
            onSubmit={submitHandler}>
                <label className="">
                    <p>Email<span className="text-red-500">*</span></p>
                    <input type="email" name="email" value={data.email}
                    className="outline-none bg-slate-500/50 w-full rounded-sm text-lg px-1"
                    onChange={changeHandler}
                    /> 
                </label>

                <label>
                    <p>Password<span className="text-red-500">*</span></p>
                    <input type="password" name="password" value={data.password}
                        className="outline-none bg-slate-500/50 w-full text-lg rounded-sm px-1"
                        onChange={changeHandler}
                    />
                </label>

                <button type="submit" className="px-3 py-2 bg-violet-400 rounded-md 
                text-white font-semibold mt-2">
                    Login
                </button>
            </form>
        </div>
    )
}
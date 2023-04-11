import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { LOGIN_USER } from "../queries/users";


export default function Login() {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    let [loginUser, { data, loading, error, reset }] = useMutation(LOGIN_USER);

    const handleChange = ({ name, value }) => {
        setLoginData({
            ...loginData,
            [name]: value
        })
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(loginData)
        let { data } = await loginUser({ variables: loginData })
        localStorage.setItem("access_token", data.login.access_token);
        localStorage.setItem("UserId", data.login.UserId)

        navigate('/');
    };

    if (data) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: "Login success",
            showConfirmButton: false,
            timer: 1000
        })
    }

    if (error) {
        console.log({ error }, "<<<<<<<<<")
        Swal.fire({
            icon: 'error',
            text: error.message,
        })
            .finally(() => {
                reset()
            })
    }
    // useEffect(() => {
    //     console.log(loginData)
    // }, [loginData])

    return (
        <div className=" w-screen h-screen bg-[#eafdfc] flex flex-col items-center">
            <img src="https://i.ibb.co/GFFRCg7/Logo2-removebg.png" className="h-28 my-10" />
            <div className=" w-1/3 h-3/5 bg-white p-6 rounded-md shadow-md">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold">Sign In</h1>
                    <text className=" text-gray-400 font-semibold">Sign In and start managing your pet clinic using Pet Plus</text>
                </div>
                <form onSubmit={handleLogin} className=" mt-4">
                    <div>
                        <div className=" py-2"> Email </div>
                        <input name="email" value={loginData.email} onChange={({ target }) => handleChange(target)} type="text" placeholder="Enter Your Email" className="input input-bordered input-secondary w-full " />
                    </div>
                    <div>
                        <div className=" py-2"> Password </div>
                        <input name="password" value={loginData.password} onChange={({ target }) => handleChange(target)} type="password" placeholder="Enter Your Password" className="input input-bordered input-secondary w-full" />
                    </div>
                    <div className="flex justify-between pt-2 pb-4 ">
                        <div className="flex items-center">
                            <input type="checkbox" className="checkbox-xs mr-2" />
                            <div>
                                Remember me
                            </div>
                        </div>
                        <div className="link-primary select-none hover:text-purple-600 hover:cursor-pointer underline-offset-2 underline">
                            Forgot your password?
                        </div>
                    </div>
                    <button type="submit" className=" flex justify-center font-semibold hover:cursor-pointer py-3 px-4 w-full rounded-md bg-emerald-300 hover:bg-emerald-400 active:bg-emerald-300 active:scale-95 duration-200 ">
                        <span className=" select-none">
                            Sign in
                        </span>
                    </button >
                    <div className=" pt-4 justify-center flex select-none">
                        Dont have an account ? <NavLink to="/register" className=" pl-2 link-primary hover:text-purple-600 hover:cursor-pointer underline-offset-2 underline"> Sign up now</NavLink>
                    </div>
                </form>
            </div>
        </div>
    )
}

import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { REGISTER_USER } from "../queries/users";
import FormData from "form-data";

export default function Register() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        address: '',
        phoneNumber: '',
        password: '',
        email: '',
        role: 'owner',
        imgUrl: null
    })
    const fileData = new FormData()
    let [registerUser, { data, loading, error, reset }] = useMutation(REGISTER_USER);


    // const { loading, error, data } = useQuery(REGISTER_USER, {
    //     variables: formData
    // })

    if (data) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.register.message,
            showConfirmButton: false,
            timer: 1000
        })
            .finally(() => {
                reset()
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData, "<submit")
        await registerUser({
            variables: formData
        })

        navigate('/login')
    }

    const handleChange = ({ name, value }) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleFile = async ({ files }) => {
        const [file] = files
        // console.log(file, "<<<<<<<<<<")
        fileData.append('file', file);
        // console.log(fileData.get('file'))
        setFormData({
            ...formData,
            imgUrl: await fileData.get('file')
        })
    }

    return (
        <div className=" w-screen h-screen bg-[#eafdfc] flex justify-center items-center">
            <div className="flex w-3/5 bg-white rounded-md shadow-md">
                <div className=" w-1/2 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex flex-col items-center">
                            <h1 className="text-3xl font-bold">Sign Up</h1>
                        </div>
                        <div className="text-sm breadcrumbs p-0 m-0 mt-2">
                            <ul>
                                <li><label className=" link cursor-default font-semibold"> Create Account</label></li>
                                <li><label className=" link cursor-default font-semibold text-gray-400"> Manage Clinic</label></li>
                            </ul>
                        </div>
                        <form className=" mt-2" onSubmit={handleSubmit}>
                            <div className=" flex gap-4">
                                <div>
                                    <div className=" py-2"> Username :</div>
                                    <input name="username" value={formData.username} onChange={({ target }) => handleChange(target)} type="text" placeholder="Enter Your Email" className="input input-bordered input-secondary w-full " />
                                </div>
                                <div>
                                    <div className=" py-2"> Email :</div>
                                    <input name="email" value={formData.email} onChange={({ target }) => handleChange(target)} type="text" placeholder="Enter Your Email" className="input input-bordered input-secondary w-full " />
                                </div>
                            </div>
                            <div>
                                <div className=" py-2"> Full Name :</div>
                                <input name="fullName" value={formData.fullName} onChange={({ target }) => handleChange(target)} type="text" placeholder="Enter Your Email" className="input input-bordered input-secondary w-full " />
                            </div>
                            <div>
                                <div className=" py-2"> Address :</div>
                                <input name="address" value={formData.address} onChange={({ target }) => handleChange(target)} type="text" placeholder="Enter Your Email" className="input input-bordered input-secondary w-full " />
                            </div>
                            <div>
                                <div className=" py-2"> Profile Picture :</div>
                                <input name="imgUrl" onChange={({ target }) => handleFile(target)} type="file" className="file-input file-input-bordered file-input-secondary w-full " />
                            </div>
                            <div className="flex gap-4">
                                <div>
                                    <div className=" py-2"> Phone Number :</div>
                                    <input name="phoneNumber" value={formData.phoneNumber} onChange={({ target }) => handleChange(target)} type="text" placeholder="Enter Your Email" className="input input-bordered input-secondary w-full " />
                                </div>
                                <div className=" pb-4">
                                    <div className=" py-2"> Password :</div>
                                    <input name="password" value={formData.password} onChange={({ target }) => handleChange(target)} type="password" placeholder="Enter Your Password" className="input input-bordered input-secondary w-full" />
                                </div>
                            </div>
                            <button type="submit" className=" flex justify-center font-semibold hover:cursor-pointer py-3 px-4 w-full rounded-md bg-emerald-300 hover:bg-emerald-400 active:bg-emerald-300 active:scale-95 duration-200 ">
                                <span className=" select-none">
                                    Sign Up
                                </span>
                            </button>
                        </form>
                    </div>
                    <div className=" pt-4 justify-center flex select-none">
                        Already have an account ? <NavLink to="/login" className=" pl-2 link-primary hover:text-purple-600 hover:cursor-pointer underline-offset-2 underline"> Sign in now</NavLink>
                    </div>
                </div>
                <div className=" rounded-r-md  w-1/2 border-l-2 bg-gray-700  flex justify-center items-center">
                    <img src="https://i.ibb.co/GFFRCg7/Logo2-removebg.png" className="h-28 my-10" />
                </div>
            </div>
        </div>
    )
}

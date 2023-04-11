import { useMutation } from "@apollo/client";
import FormData from "form-data"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import Swal from "sweetalert2";
import client from "../../config/apollo";
import { EDIT_DOCTOR } from "../../queries/doctors";
import LoadingScreen from "../LoadingScreen";


export default function VetsCard({ doctor }) {
    // console.log(doctor)
    const [formData, setFormData] = useState({
        name: doctor.name,
        imageUrl: "",
        gender: doctor.gender,
        education: doctor.gender,
        petshopId: Number(localStorage.getItem("petshopId")),
        doctorId: doctor.id
    })
    const handleChange = ({ name, value }) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const fileData = new FormData()
    const handleFile = async ({ files }) => {
        const [file] = files
        // console.log(file, "<<<<<<<<<<")
        fileData.append('file', file);
        // console.log(fileData.get('file'))
        setFormData({
            ...formData,
            imageUrl: await fileData.get('file')
        })
    }

    const [editDoctor, { loading, error, data, reset }] = useMutation(EDIT_DOCTOR);

    const submitForm = async (e) => {
        e.preventDefault();
        console.log(formData)
        // document.getElementById('note_modal').checked = false;
        await editDoctor({
            variables: formData
        })
        await client.refetchQueries({
            include: "active"
        })
    }

    if (loading) {
        return <LoadingScreen />
    }
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


    return (
        <div className=" shadow-md h-28 my-4 rounded-xl p-2 w-full flex items-center bg-[#eafdfc]">
            <div className="  p-4 w-5/12 ">
                <div className=" font-semibold text-[#567096] duration-200 flex items-center">
                    <div className="avatar w-4/12">
                        <div className="mask mask-squircle w-20 h-20">
                            <img className="" src={doctor.imgUrl} alt="Profile picture" />
                        </div>
                    </div>
                    <NavLink to={`/veterinarians/${doctor.id}`} className=" hover:cursor-pointer hover:scale-105 hover:underline underline-offset-2 duration-200 active:text-[#ff9787] select-none  w-fit">
                        {doctor.name}
                    </NavLink>
                </div>
            </div>
            <div className="  w-6/12">
                Monday, Thursday, Friday
            </div>
            <div className=" w-1/12 dropdown dropdown-end">
                <svg tabIndex={0} fill="none" className=" hover:bg-[#d4e6e6] duration-200 rounded-md active:scale-95  active:bg-[#ff9787] w-8 p-0" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><label htmlFor={`edit_doctor_${doctor.id}`}>Edit</label></li>
                    <li><a>Delete</a></li>
                </ul>
            </div>
            {/* edit doctor modal */}
            <div>
                <input type="checkbox" id={`edit_doctor_${doctor.id}`} className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box ml-72 p-4">
                        <form onSubmit={submitForm}>
                            <h3 className="text-xl font-bold mb-4">Edit a doctor</h3>
                            <label>
                                Name :
                            </label>
                            <input name="name" value={formData.name} onChange={({ target }) => handleChange(target)} type="text" placeholder="Enter doctor name" className=" my-2 input input-bordered w-full input-secondary" />
                            <div className=" flex flex-col">
                                <label> Profile Picture URL : </label>
                                <input name="imageUrl" onChange={({ target }) => handleFile(target)} type="file" className="file-input file-input-bordered file-input-secondary w-full" />
                            </div>
                            <div className=" flex  gap-2">
                                <div>
                                    <label>
                                        Gender :
                                    </label>
                                    <select name="gender" value={formData.gender} onChange={({ target }) => handleChange(target)} className="select select-secondary w-full max-w-xs my-2">
                                        <option disabled value="">Select a gender </option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label>
                                        Education :
                                    </label>
                                    <input name="education" value={formData.education} onChange={({ target }) => handleChange(target)} type="text" placeholder="Enter doctor's education" className=" my-2 input input-bordered w-full input-secondary" />
                                </div>
                            </div>
                            <div className=" flex justify-end gap-4 mt-4">
                                <label htmlFor={`edit_doctor_${doctor.id}`} className=" flex font-semibold justify-center hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-rose-300 hover:bg-rose-400 active:bg-rose-300 active:scale-95 duration-200 ">
                                    <span className=" select-none">
                                        Cancel
                                    </span>
                                </label>
                                <button typeof="submit" className=" flex font-semibold justify-center hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-emerald-300 hover:bg-emerald-400 active:bg-emerald-300 active:scale-95 duration-200 ">
                                    <span className=" select-none">
                                        Done
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
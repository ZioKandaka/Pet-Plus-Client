import { useState } from "react";
import VetsTable from "../components/Tables/VetsTable";
import FormData from "form-data"
import { useMutation, useQuery } from "@apollo/client";
import { ADD_DOCTOR, GET_DOCTORS } from "../queries/doctors";
import LoadingScreen from "../components/LoadingScreen";
import client from "../config/apollo";
import Swal from "sweetalert2";

export default function Veterinarians() {
    const [formData, setFormData] = useState({
        petshopId: Number(localStorage.getItem("petshopId")),
        education: "",
        name: "",
        gender: "",
        imgUrl: "",
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
            imgUrl: await fileData.get('file')
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        await addDoctor({
            variables: formData
        })
        await client.refetchQueries({
            include: "active"
        })
    }

    const { loading, error, data, reset } = useQuery(GET_DOCTORS, {
        variables: {
            petshopId: Number(localStorage.getItem("petshopId"))
        }
    })
    const [addDoctor, response] = useMutation(ADD_DOCTOR)
    const loadingAdd = response.loading
    const resetAdd = response.reset
    const errorAdd = response.error
    const dataAdd = response.data


    if (dataAdd) {
        setFormData({
            petshopId: Number(localStorage.getItem("petshopId")),
            education: "",
            name: "",
            gender: "",
            imgUrl: "",
        })

    }

    if (loading || loadingAdd) {
        return <LoadingScreen />
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
    } else if (errorAdd) {
        document.getElementById(`doctor_modal`).checked = true;
        console.log({ errorAdd }, "<<<<<<<<<")
        Swal.fire({
            icon: 'error',
            text: errorAdd.message,
        })
            .finally(() => {
                resetAdd()
            })
    }


    return (
        <>
            <div className="flex justify-between items-center">
                <div className="text-3xl pb-4 font-bold outline-1 outline-black text-[#ff9787]">
                    Our Veterinarians
                </div>
                <label htmlFor="doctor_modal" className=" flex font-semibold hover:cursor-pointer py-4 px-4  rounded-md bg-[#ff9787] hover:bg-[#ffa99b] active:bg-[#ff9787] active:scale-95 duration-200 ">
                    <span className=" mr-2">
                        <svg fill="none" className=" w-6 p-0" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                        </svg>
                    </span>
                    <span className=" select-none">
                        Veterinarian
                    </span>
                </label>
            </div>
            <VetsTable doctors={data.fetchDoctor} />
            {/* add doctor modal */}
            <div>
                <input type="checkbox" id="doctor_modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box ml-72 p-4">
                        <form onSubmit={handleSubmit}>
                            <h3 className="text-xl font-bold mb-4">Add a doctor</h3>
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
                                        <option value="Male" >Male</option>
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
                                <label htmlFor="doctor_modal" className=" flex font-semibold justify-center hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-rose-300 hover:bg-rose-400 active:bg-rose-300 active:scale-95 duration-200 ">
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
        </>
    )
}
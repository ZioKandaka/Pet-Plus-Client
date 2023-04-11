import { useMutation, useQuery } from "@apollo/client";
import FormData from "form-data";
import { useState } from "react";
import { useParams } from "react-router";
import ActionCard from "../components/Cards/ActionCard";
import LoadingScreen from "../components/LoadingScreen";
import { GET_DOCTOR } from "../queries/doctors";
import { CREATE_INVOICE } from "../queries/invoice";
import { GET_PET } from "../queries/pet";
import { CREATE_RECORD } from "../queries/record";
import { GET_SERVICES } from "../queries/services";

export default function CreateInvoice() {
    const [note, setNote] = useState()
    const [actions, setActions] = useState([])
    const [action, setAction] = useState({
        ServiceId: 0,
        totalPrice: "",
        document: null
    })
    let { id, petId, doctorId } = useParams();

    let invoice = {
        newPost: {
            PetshopId: Number(localStorage.getItem("petshopId")),
            PetScheduleId: id,
            PetId: petId,
            DoctorId: doctorId
        }
    }

    const getDoctor = useQuery(GET_DOCTOR, {
        variables: {
            doctorId: doctorId,
            petshopId: Number(localStorage.getItem("petshopId"))
        }
    })

    const getPet = useQuery(GET_PET, {
        variables: {
            fetchPetId: petId
        }
    })

    const services = useQuery(GET_SERVICES, {
        variables: {
            petshopId: Number(localStorage.getItem("petshopId"))
        }
    })

    let servicesData
    if (services.data) {
        servicesData = services.data.fetchService

    }

    const [createInvoice, { loading, error, data }] = useMutation(CREATE_INVOICE)

    const submitInvoice = async () => {

        try {
            const newInvoice = {
                "newInvoice": {
                    "total": total,
                    "fullname": getPet.data.fetchPet.User.fullName,
                    "email": getPet.data.fetchPet.User.email,
                    "PetshopId": Number(localStorage.getItem("petshopId"))
                }
            }
            await createInvoice({
                variables: newInvoice
            })
            document.getElementById('payment_modal').checked = true;
        } catch (error) {
            console.log(error)
        }

    }

    const [makeRecord, resRecord] = useMutation(CREATE_RECORD)
    const createRecord = async () => {
        invoice.newPost.notes = note
        invoice.newPost.Actions = actions
        await makeRecord({
            variables: invoice
        })
    }
    let loadingRecord = resRecord.loading
    let loadingData = resRecord.data
    let loadingError = resRecord.error

    console.log(loadingData)

    const addAction = (e) => {
        e.preventDefault()
        let temp = structuredClone(actions)
        // console.log(action, actions)
        temp.push(action);
        setActions(temp)
        setAction({
            ServiceId: 0,
            totalPrice: "",
            document: "-"
        })
        document.getElementById('action_modal').checked = false;
    }

    // console.log(actions)
    const handleAction = ({ name, value }) => {
        setAction({
            ...action,
            [name]: value
        })
    }

    if (getDoctor.loading || getPet.loading || services.loading) {
        return <LoadingScreen />
    }

    // console.log(getPet.data.fetchPet)


    const addNote = (e) => {
        e.preventDefault();
        console.log(note)
        document.getElementById('note_modal').checked = false;
    }

    const fileData = new FormData()
    const handleFile = async ({ files }) => {
        const [file] = files
        // console.log(file, "<<<<<<<<<<")
        fileData.append('file', file);
        // console.log(fileData.get('file'))
        setAction({
            ...action,
            document: await fileData.get('file')
        })
    }

    let total = actions.reduce((accumulator, el) => {
        return accumulator + Number(el.totalPrice);
    }, 0);

    const formatCurreny = (number) => {
        const options = { style: 'currency', currency: 'IDR' };
        const formatted = number.toLocaleString('id-ID', options);
        return formatted
    }

    const isLoading = () => {
        return <LoadingScreen />
    }

    return (
        <>
            {loading ? isLoading() : ""}
            <div className=" p-4 w-full flex-col bg-[#eafdfc] rounded-md shadow-md h-full">
                <div className=" flex gap-8">
                    <div className=" w-1/2 h-1/5 mb-8 p-4 bg-white rounded-md  shadow-md">
                        <div className="flex">
                            <div className=" w-1/3 font-bold text-lg text-[#181a2a]">
                                Owner name
                            </div>
                            <div className=" text-lg">
                                : {getPet.data.fetchPet.User.fullName}
                            </div>
                        </div>
                        <div className="flex">
                            <div className=" w-1/3 font-bold text-lg text-[#181a2a]">
                                Email
                            </div>
                            <div className=" text-lg">
                                : {getPet.data.fetchPet.User.email}
                            </div>
                        </div>
                        <div className="flex">
                            <div className=" w-1/3 font-bold text-lg text-[#181a2a]">
                                Pet name
                            </div>
                            <div className=" text-lg">
                                : {getPet.data.fetchPet.name}
                            </div>
                        </div>

                        <div className="flex">
                            <div className=" w-1/3 font-bold text-lg text-[#181a2a]">
                                Time
                            </div>
                            <div className=" text-lg">
                                : {new Date().toLocaleString() + ""}
                            </div>
                        </div>
                    </div>
                    <div className=" w-1/2 mb-8 p-4 bg-white rounded-md shadow-md">
                        <div className=" h-1/2">
                            <div className="flex">
                                <div className=" w-1/3 font-bold text-lg text-[#181a2a]">
                                    Doctor name
                                </div>
                                <div className=" text-lg">
                                    : {getDoctor?.data?.fetchOneDoctor.name}
                                </div>
                            </div>
                            <div className=" flex">
                                <div className=" w-1/3 font-bold text-lg text-[#181a2a]">
                                    Total Price
                                </div>
                                <div className=" text-lg">
                                    : {formatCurreny(total)}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-end  h-1/2 gap-4">
                            <div className=" flex  gap-4">
                                <label htmlFor="note_modal" className=" flex pl-[1.2rem] font-semibold hover:cursor-pointer py-3 px-4  w-28 rounded-md bg-amber-300 hover:bg-amber-400 active:bg-amber-300 active:scale-95 duration-200 ">
                                    <svg fill="none" className=" p-0  w-5" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    <span className=" select-none">
                                        NOTE
                                    </span>
                                </label>
                                <label htmlFor="action_modal" className=" flex pl-[1rem] font-semibold hover:cursor-pointer py-3 px-4  w-28 rounded-md bg-sky-300 hover:bg-sky-400 active:bg-sky-300 active:scale-95 duration-200 ">
                                    <svg fill="none" className=" p-0  w-5" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <span className=" select-none">
                                        Action
                                    </span>
                                </label>
                            </div>
                            <label onClick={submitInvoice} className=" flex font-semibold hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-emerald-300 hover:bg-emerald-400 active:bg-emerald-300 active:scale-95 duration-200 ">
                                <svg fill="none" className=" p-0  w-5" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                </svg>
                                <span className=" select-none">
                                    Proceed
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className=" w-full p-4 h-[33.3rem] bg-white rounded-md  shadow-md">
                    <div className=" border-b-2 mb-2 flex">
                        <div className=" pl-6 w-1/12 select-none">
                            No.
                        </div>
                        <div className=" w-4/12 select-none">
                            Service
                        </div>
                        <div className=" w-3/12 select-none">
                            Price
                        </div>
                        <div className=" w-3/12 select-none">
                            Attachments
                        </div>
                        <div className=" w-1/12">

                        </div>
                    </div>
                    <div className="overflow-y-scroll h-[29.5rem]">
                        {
                            actions.map((el, i) => {
                                return (
                                    <ActionCard service={el} no={i + 1} key={i} />
                                )
                            })
                        }

                    </div>
                </div>
            </div>
            <div>

                {/* payment modal */}
                <div>
                    <input type="checkbox" id="payment_modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box ml-60 p-4">
                            <div>
                                <h3 className="text-lg font-bold">Payment link</h3>
                                <div className="text-lg pb-8 link link-primary">
                                    <a href={data?.generateInvoice.invoice} target="_blank" rel="noreferrer">
                                        {
                                            data?.generateInvoice.invoice
                                        }
                                    </a>
                                </div>
                                <div className=" flex justify-end gap-4">
                                    <label onClick={createRecord} htmlFor="payment_modal" className=" flex font-semibold justify-center hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-emerald-300 hover:bg-emerald-400 active:bg-emerald-300 active:scale-95 duration-200 ">
                                        <span className=" select-none">
                                            Done
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* notes modal */}
                <div>
                    <input type="checkbox" id="note_modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box ml-60 p-4">
                            <form onSubmit={addNote}>
                                <h3 className="text-lg font-bold">Notes :</h3>
                                <textarea name="note" value={note} onChange={({ target }) => setNote(target.value)} className="textarea textarea-secondary w-full my-4 h-60" placeholder="Doctor's notes ..."></textarea>
                                <div className=" flex justify-end gap-4">
                                    <label htmlFor="note_modal" className=" flex font-semibold justify-center hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-rose-300 hover:bg-rose-400 active:bg-rose-300 active:scale-95 duration-200 ">
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
                {/* action modal */}
                <div>
                    <input type="checkbox" id="action_modal" className="modal-toggle" />
                    <div className="modal ml-64">
                        <div className="modal-box relative p-4">
                            <h3 className="text-lg font-bold">Add Action</h3>
                            <form onSubmit={addAction} className="flex flex-col w-full">
                                <div className=" flex gap-4 mt-2">
                                    <div className=" flex flex-col gap-2 w-1/2">
                                        <label className=" font-semibold">
                                            Select Service
                                        </label>
                                        <select name="ServiceId" onChange={({ target }) => handleAction(target)} value={action.ServiceId} className="select select-secondary select-bordered w-full">
                                            <option disabled value={0}>Service name</option>
                                            {
                                                servicesData.map((el, i) => {
                                                    return (
                                                        <option key={i} value={el.id} >{el.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className=" flex flex-col gap-2 w-1/2">
                                        <label className=" font-semibold">
                                            Price
                                        </label>
                                        <input name="totalPrice" onChange={({ target }) => handleAction(target)} value={action.totalPrice} type="number" placeholder="Enter Price" className="input input-bordered input-secondary w-full" />
                                    </div>
                                </div>
                                <div className=" flex flex-col gap-2 w-2/3 pb-4 pt-2">
                                    <label className=" font-semibold">
                                        Attachments
                                    </label>
                                    <input name="imageUrl" onChange={({ target }) => handleFile(target)} type="file" className="file-input file-input-bordered file-input-secondary w-full" />
                                </div>

                                <div className=" flex justify-end">
                                    <div>
                                        <div className=" flex justify-end gap-4">
                                            <label htmlFor="action_modal" className=" flex font-semibold items-center justify-center hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-rose-300 hover:bg-rose-400 active:bg-rose-300 active:scale-95 duration-200 ">
                                                <span className=" select-none">
                                                    Cancel
                                                </span>
                                            </label>
                                            <button type="submit" className=" flex font-semibold justify-center items-center hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-emerald-300 hover:bg-emerald-400 active:bg-emerald-300 active:scale-95 duration-200 ">
                                                <span className=" select-none">
                                                    Add
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
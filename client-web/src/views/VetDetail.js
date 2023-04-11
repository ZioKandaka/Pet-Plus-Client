import { useQuery } from "@apollo/client"
import { useState } from "react"
import { useParams } from "react-router-dom"
import LoadingScreen from "../components/LoadingScreen"
import { GET_DOCTOR } from "../queries/doctors"
import { GET_DOCTOR_SCHEDULE } from "../queries/schedules"

export default function VetDetail() {
    let { id } = useParams()
    const [formData, setFormData] = useState({
        petshopId: "",
        doctorId: "",
        status: "",
        time: "",
        day: ""
    })

    const { loading, error, data } = useQuery(GET_DOCTOR, {
        variables: {
            petshopId: Number(localStorage.getItem("petshopId")),
            doctorId: Number(id)
        }
    })

    const handleChange = ({ name, value }) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const [schedule, setSchedule] = useState({
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
    })
    let sessions = [
        "Session 1",
        "Session 2",
        "Session 3",
        "Session 4",
        "Session 5",
        "Session 6",
        "Session 7",
        "Session 8",
    ]
    let days = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ]

    const testData = [
        {
            "id": 1,
            "day": "Monday",
            "time": "Session 2",
            "status": "Available",
            "PetshopId": 1,
            "DoctorId": 1
        },
        {
            "id": 2,
            "day": "Saturday",
            "time": "Session 4",
            "status": "Unavailable",
            "PetshopId": 1,
            "DoctorId": 1
        },
        {
            "id": 3,
            "day": "Wednesday",
            "time": "Session 8",
            "status": "On Leave",
            "PetshopId": 1,
            "DoctorId": 1
        },
        {
            "id": 4,
            "day": "Saturday",
            "time": "Session 5",
            "status": "Unavailable",
            "PetshopId": 1,
            "DoctorId": 1
        },
    ]

    const { loading: load, error: err, data: dat } = useQuery(GET_DOCTOR_SCHEDULE, {
        variables: {
            petshopId: Number(localStorage.getItem("petshopId")),
            doctorId: Number(id)
        }
    });

    const scheduleFinder = (data) => {
        let temp = structuredClone(schedule)
        data.forEach(el => {
            temp[el.day].push({
                time: el.time,
                status: el.status
            })
        });
        setSchedule(temp)
        // console.log(schedule)
    }

    const available = (day, session) => {
        let { status } = schedule[day].find(el => el.time === session)
        if (status === "On Leave") {
            return (
                <div className=" text-blue-400 flex justify-center">
                    {schedule[day].find(el => el.time === session).status}
                </div>
            )
        } else if (status === "Available") {
            return (
                <div className=" text-green-400 flex justify-center">
                    {schedule[day].find(el => el.time === session).status}
                </div>
            )
        } else if (status === "Unavailable") {
            return (
                <div className=" text-red-400 flex justify-center">
                    {/* {schedule[day].find(el => el.time === session).status} */}
                    Booked
                </div>
            )

        }
    }

    const booked = (day, session) => {
        return (
            <div className=" text-gray-400 justify-center flex">
                {/* {session} */}
                -
            </div>
        )
    }
    useState(() => {
        scheduleFinder(testData)
    }, [])

    if (loading || load) {
        return <LoadingScreen />
    }

    if (data) {
        // console.log(data.fetchOneDoctor)
    }

    if (dat) {
        // console.log(dat.getDocSched)
        // console.log(testData)
        // scheduleFinder(dat.getDocSched)
    }
    return (
        <div className=" w-full h-full flex">
            <div className=" w-1/4 flex  flex-col items-center">
                <div className="text-3xl pb-4 font-bold outline-1 flex justify-center my-8 border-b-2 border[#b0bfbf] outline-black text-[#ff9787]">
                    Doctor Detail
                </div>
                <div>
                    <div className=" bg-[#eafdfc] rounded-t-md shadow-md">
                        <div className="w-full p-8 pb-4 flex flex-col">
                            <div className="">
                                <img className=" rounded-xl object-cover w-full h-56" src={data?.fetchOneDoctor.imgUrl} alt="Avatar Tailwind CSS Component" />
                            </div>
                            <div className="flex flex-col  items-center">
                                <div className=" text-lg font-bold">
                                    {data?.fetchOneDoctor.name}
                                </div>
                                <div className=" text-secondary">
                                    {data?.fetchOneDoctor.education}
                                </div>
                            </div>
                            <div className="flex w-full justify-center">
                                {data?.fetchOneDoctor.gender}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className=" shadow-md flex justify-center font-semibold hover:cursor-pointer py-4 px-4 rounded-b-md bg-[#ff9787] hover:bg-[#ffa99b] active:bg-[#ff9787] active:scale-95 duration-200 ">
                            <span className="select-none">
                                Edit
                            </span>

                        </label>
                    </div>
                </div>
            </div>

            <div className=" w-3/4 pl-8 h-2/3">
                <div className="text-3xl pb-4 font-bold outline-1 outline-black text-[#ff9787]">
                    Doctor Schedule
                </div>
                <div className=" bg-[#eafdfc] flex flex-col rounded-md shadow-md h-full p-4">
                    <div className=" w-full border-b-2 mb-2 pb-2 flex justify-between">
                        <div className=" w-2/12 font-bold pl-2">
                            Day
                        </div>
                        <div className="flex w-full  gap-2">
                            {sessions.map((el, i) => {
                                return (
                                    <div className=" w-[5rem] flex justify-center">
                                        {el}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {
                        days.map((day, iDay) => {
                            return (
                                <div key={iDay} className="flex w-full h-10 bg-white my-2 items-center pl-2 rounded-md shadow-md">
                                    <div className=" w-2/12 font-bold">
                                        {day}
                                    </div>
                                    <div className=" flex gap-2">
                                        {sessions.map((session, iSession) => {
                                            return (
                                                <div key={iSession} className=" w-[5rem]">
                                                    {
                                                        (schedule[day].some(el => el.time === session)) ? available(day, session) : booked(day, session)
                                                    }
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className=" w-full flex justify-end mt-8">
                        <label htmlFor="schedule_modal" className=" w-[10.5rem] flex font-semibold hover:cursor-pointer py-4 px-4  rounded-md bg-[#ff9787] hover:bg-[#ffa99b] active:bg-[#ff9787] active:scale-95 duration-200 ">
                            <span className=" mr-2">
                                <svg fill="none" stroke="currentColor" className=" p-0 w-6" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                </svg>
                            </span>
                            <span className=" select-none">
                                Edit Schedule
                            </span>
                        </label>
                    </div>
                </div>
            </div>
            {/* edit schedule modal */}
            <div>
                <input type="checkbox" id="schedule_modal" className="modal-toggle" />
                <label className="modal cursor-pointer" htmlFor="schedule_modal">
                    <label className="modal-box ml-96 mt-96 p-4" htmlFor="">
                        <form>
                            <h3 className="text-xl font-bold mb-4">Edit schedule</h3>
                            <div className=" flex w-full gap-4">
                                <div className=" flex flex-col w-1/2">
                                    <label> Day : </label>
                                    <select className="select select-secondary w-full">
                                        <option disabled selected>Select a day</option>
                                        <option>Monday</option>
                                        <option>Tuesday</option>
                                        <option>Wednesday</option>
                                        <option>Thursday</option>
                                        <option>Friday</option>
                                        <option>Saturday</option>
                                    </select>
                                </div>
                                <div className=" flex flex-col w-1/2">
                                    <label> Session : </label>
                                    <select className="select select-secondary w-full">
                                        <option disabled selected>Select a session</option>
                                        <option>Session 1</option>
                                        <option>Session 2</option>
                                        <option>Session 3</option>
                                        <option>Session 4</option>
                                        <option>Session 5</option>
                                        <option>Session 6</option>
                                        <option>Session 7</option>
                                        <option>Session 8</option>
                                    </select>
                                </div>
                            </div>
                            <div className=" flex justify-end gap-4 mt-4">
                                <label htmlFor="schedule_modal" className=" flex font-semibold justify-center hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-rose-300 hover:bg-rose-400 active:bg-rose-300 active:scale-95 duration-200 ">
                                    <span className=" select-none">
                                        Remove
                                    </span>
                                </label>
                                <label htmlFor="schedule_modal" className=" flex font-semibold justify-center hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-sky-300 hover:bg-sky-400 active:bg-rose-300 active:scale-95 duration-200 ">
                                    <span className=" select-none">
                                        On Leave
                                    </span>
                                </label>
                                <label typeof="submit" className=" flex font-semibold justify-center hover:cursor-pointer py-3 px-4 w-28 rounded-md bg-emerald-300 hover:bg-emerald-400 active:bg-emerald-300 active:scale-95 duration-200 ">
                                    <span className=" select-none">
                                        Available
                                    </span>
                                </label>
                            </div>
                        </form>
                    </label>
                </label>
            </div>
        </div>
    )
}
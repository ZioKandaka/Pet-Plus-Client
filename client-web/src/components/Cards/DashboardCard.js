import { useQuery } from "@apollo/client";
import { NavLink, useNavigate } from "react-router-dom"
import { GET_DOCTOR } from "../../queries/doctors";
import LoadingScreen from "../LoadingScreen";

export default function DashboardCard({ schedule }) {
    // console.log(schedule)
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_DOCTOR, {
        variables: {
            petshopId: Number(localStorage.getItem("petshopId")),
            doctorId: schedule.DoctorSchedule.DoctorId
        }
    })

    const changePage = () => {
        navigate(`/invoice/${schedule.id}/${schedule.Pet.id}/${schedule.DoctorSchedule.DoctorId}`)
    }


    if (loading) {
        return <LoadingScreen />
    }


    return (
        <div className="h-24 my-2 rounded-xl w-full flex items-center justify-between bg-[#eafdfc] shadow-md">
            <div className=" w-3/12 pl-4">
                <div className=" font-semibold text-[#567096] duration-200">
                    <NavLink to={`/pet/owner/${schedule.Pet.id}`} className=" hover:cursor-pointer hover:scale-105 hover:underline underline-offset-2 duration-200 active:text-[#ff9787] select-none  w-fit">
                        {schedule.Pet.name}
                    </NavLink>
                </div>
                <div className="text-sm text-gray-500 select-none">
                    {schedule.Pet.species}
                </div>
            </div>
            <div className=" w-1/12 select-none justify-center flex">
                <label htmlFor={`detail_${schedule.id}`} className="bg-sky-400 p-4 py-2 rounded-full hover:cursor-pointer text-white font-semibold">
                    Details
                </label>
            </div>
            <div className="  w-1/12 select-none">
                {schedule.DoctorSchedule.time}
            </div>
            <div className=" w-1/12 select-none">
                {schedule.DoctorSchedule.day}
            </div>
            <div className="  w-1/12 select-none">
                {data?.fetchOneDoctor.name}
            </div>


            <div className=" w-1/12 dropdown  dropdown-bottom dropdown-end">
                <svg tabIndex={0} fill="none" className=" hover:bg-[#d4e6e6] duration-200 rounded-md active:scale-95  active:bg-[#ff9787] w-8 p-0" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <label onClick={changePage} >
                            Complete
                        </label>
                    </li>
                </ul>
            </div>
            {/* modal_detail */}
            <div>
                <input type="checkbox" id={`detail_${schedule.id}`} class="modal-toggle" />
                <div class="modal  ml-72">
                    <div class="modal-box">
                        <h3 class="font-bold text-lg">Details</h3>
                        <p class="py-4">{schedule.details}</p>
                        <div class="modal-action">
                            <label for={`detail_${schedule.id}`} class="btn">Done</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
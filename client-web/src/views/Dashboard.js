import { useQuery } from "@apollo/client"
import LoadingScreen from "../components/LoadingScreen"
import DashboardTable from "../components/Tables/DashboardTable"
import { GET_SCHEDULES } from "../queries/schedules"

export default function ClinicProfile() {
    const { loading, error, data, reset } = useQuery(GET_SCHEDULES, {
        variables: {
            petshopId: Number(localStorage.getItem("petshopId"))
        }
    })

    

    if (loading) {
        return <LoadingScreen />
    }
    return (
        <div className=" w-full h-full gap-2 flex flex-col rounded-md ">
            <div className=" w-full flex gap-4 flex-wrap justify-between py-4 ">
                <div className=" md:w-1/5 w-full bg-rose-100 p-8 rounded-xl shadow-md">
                    <div className=" w-full text-lg font-semibold">
                        Posts :
                    </div>
                    <div className=" w-full flex justify-end text-4xl">
                        4
                    </div>
                </div>
                <div className="  md:w-1/5 w-full bg-emerald-100 p-8 rounded-xl shadow-md">
                    <div className=" w-full text-lg font-semibold">
                        Veterinarians :
                    </div>
                    <div className=" w-full flex justify-end text-4xl">
                        3
                    </div>
                </div>
                <div className="  md:w-1/5 w-full bg-blue-100 p-8 rounded-xl shadow-md">
                    <div className=" w-full text-lg font-semibold">
                        Services :
                    </div>
                    <div className=" w-full flex justify-end text-4xl">
                        12
                    </div>
                </div>
                <div className="  md:w-1/5 w-full bg-fuchsia-100 p-8 rounded-xl shadow-md">
                    <div className=" w-full text-lg font-semibold">
                        Medical Records :
                    </div>
                    <div className=" w-full flex justify-end text-4xl">
                        40
                    </div>
                </div>
            </div>
            <div className=" bg-white p-4 h-[34.7rem] rounded-xl ">
                <div className="text-3xl pb-4 font-bold outline-1 outline-black text-[#ff9787] ">
                    Appointment list
                </div>
                <DashboardTable schedules={data.fetchPetScheduleForPetshop} />
            </div>
        </div>
    )
}
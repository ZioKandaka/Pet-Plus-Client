import { useQuery } from "@apollo/client";
import { GET_SERVICES } from "../../queries/services";
import LoadingScreen from "../LoadingScreen";

export default function ActionCard({ service, no }) {
   
    const formatCurreny = (number) => {
        const options = { style: 'currency', currency: 'IDR' };
        const formatted = number.toLocaleString('id-ID', options);
        return formatted
    }

    const { loading, data, error } = useQuery(GET_SERVICES, {
        variables: {
            petshopId: Number(localStorage.getItem("petshopId"))
        }
    })
    // console.log(data)
    if (loading) {
        return <LoadingScreen />
    }
    let name = ""
    if (data) {
        let test = data.fetchService.find(el => {
            if (el.id === service.ServiceId) {
                return el
            }
        })
        name = test.name
    }

    return (
        <div className=" shadow-md h-24 my-4 rounded-xl p-2 w-full flex justify-around items-center bg-[#eafdfc]">
            <div className=" pl-6 w-1/12 select-none font-semibold ">
                {no}
            </div>
            <div className=" w-4/12 select-none font-semibold">
                {name}
            </div>
            <div className="  w-3/12 select-none font-semibold">
                {formatCurreny(Number(service.totalPrice))}
            </div>
            <div className="  w-3/12 select-none">
                {service.document?.name}
            </div>
            <div className=" w-1/12 dropdown  dropdown-left">
                <svg tabIndex={0} fill="none" className=" hover:bg-[#d4e6e6] duration-200 rounded-md active:scale-95  active:bg-[#ff9787] w-8 p-0" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32">
                    <li>
                        <label>
                            Edit
                        </label>
                    </li>
                    <li>
                        <label>
                            Delete
                        </label>
                    </li>
                </ul>
            </div>
        </div>
    )
}
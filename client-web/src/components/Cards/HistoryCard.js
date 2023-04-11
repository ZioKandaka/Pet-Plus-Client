import { NavLink } from "react-router-dom";

export default function HistoryCard() {
    return (
        <div className=" shadow-md h-24 my-4 rounded-xl p-2 w-full flex justify-around items-center bg-[#eafdfc]">
            <div className=" pl-6 w-2/12  ">
                1
            </div>
            <div className=" w-3/12">
                <NavLink to="/pet/history/1" className=" font-semibold text-[#567096] duration-200 w-fit hover:cursor-pointer hover:scale-105 hover:underline underline-offset-2 active:text-[#ff9787] select-none">
                    Randy
                </NavLink>
            </div>

            <div className=" w-3/12">
                January 2023
                {/* <span className=" bg-green-200 p-4 pt-1 pb-2 rounded-full">
                    active
                </span> */}
                {/* <span className=" bg-amber-200 p-4 pt-1 pb-2 rounded-full">
                    archived
                </span> */}
            </div>
            <div className="  w-3/12">
                <span className=" bg-sky-200 p-2 px-6 pt-1 pb-2 rounded-full">
                    view
                </span>
            </div>
            <div className=" w-1/12">
                <svg fill="none" className=" hover:bg-[#d4e6e6] duration-200 rounded-md active:scale-95  active:bg-[#ff9787] w-8 p-0" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </div>
        </div>
    )
}
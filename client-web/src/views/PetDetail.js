import { Outlet } from "react-router"
import { NavLink } from "react-router-dom"


export default function PetDetail() {
    return (
        <div className="flex justify-center gap-16 flex-col md:flex-row p-8 ">
            <div className=" w-full md:w-4/12 bg-[#91d8e4] rounded-md shadow-md">
                <div>
                    <img className=" rounded-t-md w-full h-72 object-cover" src="https://cdn.openai.com/labs/images/A%20Shiba%20Inu%20dog%20wearing%20a%20beret%20and%20black%20turtleneck.webp?v=1" />
                </div>

                <div className=" pt-2 px-4">
                    <div className="flex w-full">
                        <div className="text-3xl font-semibold text-center w-full pb-2">
                            Randy
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className=" w-1/3 text font-semibold text-[#2e5767]">
                            Species
                        </div>
                        <div className=" w-1/3 text font-semibold ">
                            : Dog
                        </div>
                    </div>
                    <div className="flex w-full">
                        <div className=" w-1/3 text font-semibold text-[#2e5767]">
                            Breed
                        </div>
                        <div className=" w-1/3 text font-semibold ">
                            : Corgi
                        </div>
                    </div>
                    <div className="flex justify-around py-4">
                        <div className="flex flex-col w-1/4  p-2 rounded-lg bg-[#19a7ce] justify-center items-center shadow-md">
                            <div className="text text-[#2e5767]">
                                Gender
                            </div>
                            <div className="text-lg font-semibold ">
                                Female
                            </div>
                        </div>
                        <div className="flex flex-col w-1/4  p-2 rounded-lg bg-[#19a7ce] justify-center items-center shadow-md">
                            <div className="text text-[#2e5767]">
                                Age
                            </div>
                            <div className="text-lg font-semibold ">
                                {"3 "} y.o.
                            </div>
                        </div>
                        <div className="flex flex-col w-1/4  p-2 rounded-lg bg-[#19a7ce] justify-center items-center shadow-md">
                            <div className=" text text-[#2e5767]">
                                Weight
                            </div>
                            <div className="text-lg font-semibold ">
                                5.2 Kg
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col  h-full">
                        <div className=" w-1/2 text-lg font-semibold text-[#2e5767]">
                            Description:
                        </div>
                        <div className=" p-8 pt-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, t enim ad minim veniam.
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-full md:w-5/12 bg-[#bfeaf5] flex flex-col rounded-md">
                <div className=" w-full bg-[#19a7ce] text-xl font-bold text-[#40526f] flex rounded-t-md">
                    <NavLink to="/pet/owner/1" className=" w-1/2 h-full flex justify-center items-center  hover:bg-[#91d8e4] p-4 rounded-tl-md"  >
                        <div className=" flex justify-center">
                            Owner's Info
                        </div>
                    </NavLink>
                    <NavLink to="/pet/history/1" className=" w-1/2 h-full justify-center items-center flex flex-wrap hover:bg-[#91d8e4] p-4" >
                        <div className=" flex justify-center">
                            History
                        </div>
                    </NavLink>
                </div>
                <Outlet />
            </div>
        </div>
    )
}
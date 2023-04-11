import DashboardCard from "../Cards/DashboardCard.js"

export default function DashboardTable({ schedules }) {
    return (
        <div className=" h-5/6">
            <div className="flex  gap-[3.8rem] border-b-2 mb-4 pb-2 border-[#b0bfbf] text-lg ">
                <div className=" pl-2 w-3/12">
                    Patient
                </div>
                <div className=" w-1/12  pl-2">
                    Details
                </div>
                <div className=" w-1/12">
                    Time
                </div>
                <div className=" w-1/12">
                    Day
                </div>
                <div className=" w-1/12">
                    Doctor
                </div>
                <div className=" w-1/12">

                </div>
              
            </div>
            <div className=" overflow-y-scroll h-[26.5rem]">

                {
                    schedules.map((el, id) => {
                        if (el.complete === "ongoing") {
                            return (
                                <DashboardCard schedule={el} no={id} />
                            )
                        }
                    })
                }

            </div>
        </div>

    )
}
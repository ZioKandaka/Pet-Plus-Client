import VetsCard from "../Cards/VetsCard";

export default function VetsTable({ doctors }) {
    return (
        <>
            <div className="flex justify-around border-b-2 border-[#b0bfbf] text-lg ">
                <div className=" pl-5 w-5/12 flex">
                    <div className=" w-4/12">

                    </div>
                    <div>
                        Name
                    </div>

                </div>
                <div className=" w-6/12">
                    Shifts
                </div>
                <div className=" w-1/12">

                </div>
            </div>

            {
                doctors?.map((doctor, i) => {
                    return (
                        <VetsCard doctor={doctor} key={i} />
                    )
                })
            }
        </>
    )
}
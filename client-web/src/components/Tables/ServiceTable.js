import ServiceCard from "../Cards/ServiceCard.js"

export default function ServiceTable({ services }) {
    return (
        <>
            <div className="flex border-b-2 border-[#b0bfbf] pb-2 mb-2 w-full select-none" >
                <div className=" pl-4 w-1/6">
                    Logo
                </div>
                <div className="flex w-4/6 gap-2">
                    <div className=" w-2/6">
                        Name
                    </div>
                    <div className=" w-2/6">
                        Min Price
                    </div>
                    <div className=" w-2/6">
                        Max Price
                    </div>
                </div>
                <div className=" w-1/6">

                </div>
            </div>

            <div className="flex flex-col overflow-y-scroll h-[38.6rem]">
                {
                    services.map((service, i) => {
                        return (
                            <ServiceCard service={service} />
                        )
                    })
                }

            </div>
        </>
    )
}
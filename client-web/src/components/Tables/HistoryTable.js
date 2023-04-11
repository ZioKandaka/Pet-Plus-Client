import HistoryCard from "../Cards/HistoryCard";

export default function HistoryTable() {
    return (
        <>
            <div className="flex justify-around border-b-2 border-[#b0bfbf] text-lg ">
                <div className=" pl-6 w-2/12">
                    Id.
                </div>
                <div className=" w-3/12">
                    Name
                </div>
                <div className=" w-3/12">
                    Date Created
                </div>
                <div className=" w-3/12">
                    Content
                </div>
                <div className=" w-1/12">

                </div>
            </div>
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
            <HistoryCard />
        </>
    )
}
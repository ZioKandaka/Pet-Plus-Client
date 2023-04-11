import HistoryTable from "../components/Tables/HistoryTable";

export default function History() {

    
    return (
        <>
            <div className="text-3xl pb-4 font-bold outline-1 outline-black text-[#ff9787]">
                Past Appointments
            </div>
            <HistoryTable />
        </>
    )
}
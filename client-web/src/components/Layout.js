import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { GET_PETSHOP } from "../queries/petshop";
import LoadingScreen from "./LoadingScreen";



export default function Layout() {
    const navigate = useNavigate()
    const changePage = (page) => {
        navigate(page)
    }
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("UserId");
        localStorage.removeItem("petshopPhone");
        localStorage.removeItem("petshopLon");
        localStorage.removeItem("talkjs:desktop_notify");
        localStorage.removeItem("petshopNumber");
        localStorage.removeItem("petshopId");
        localStorage.removeItem("petshopName");
        localStorage.removeItem("petshopLat");
        localStorage.removeItem("petshopAddress");

        changePage("/login")
    }
    const { loading, error, data } = useQuery(GET_PETSHOP, {
        variables: {
            userId: Number(localStorage.getItem("UserId"))
        }
    })

    if (data) {
        // console.log(data.getShopById)
        localStorage.setItem("petshopId", data.getShopById.id)
        localStorage.setItem("petshopName", data.getShopById.name)
        localStorage.setItem("petshopNumber", data.getShopById.phoneNumber)
        localStorage.setItem("petshopAddress", data.getShopById.address)
        localStorage.setItem("petshopLat", data.getShopById.location.coordinates[0])
        localStorage.setItem("petshopLon", data.getShopById.location.coordinates[1])
    }

    if (loading) {
        return <LoadingScreen />
    }

    return (<>
        <div className="navbar md:hidden absolute z-50 top-0 bg-[#2d3748] flex justify-between">
            <img className="h-16 ml-[4.6rem]" src="https://i.ibb.co/GFFRCg7/Logo2-removebg.png" />
            <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden">
                <svg fill="none" className=" w-8 p-0 text-white" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </label>
        </div>
        <div className="drawer  drawer-mobile ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content md:p-6 p-6 pt-28 ">
                {/* <!-- Page content here --> */}
                <Outlet />
            </div>
            <div className="drawer-side shadow-md">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-[#eafdfc] text-base-content ">
                    {/* <!-- Sidebar content here --> */}
                    {/* <img className=" h-28" src="https://i.ibb.co/GFFRCg7/Logo2-removebg.png" /> */}
                    <div>
                        <div className=" pl-6">
                            <img className="h-120  hidden md:block" src="https://i.ibb.co/GFFRCg7/Logo2-removebg.png" />
                        </div>
                        <li className=" px-12 my-6"></li>

                        <div tabIndex="0" className="avatar w-full p-20 py-0">
                            <div className="w-full rounded-full">
                                <img src={data.getShopById.logo} />
                            </div>
                        </div>
                        <li>
                            <NavLink to="/profile" className={({ isActive }) => isActive ? "font-bold bg-transparent active:bg-[#ff9787] active:text-[#272822]" : "active:bg-[#ff9787] active:text-[#272822] "} >
                                <div className=" text-lg flex justify-center w-full">
                                    {data.getShopById.name}
                                </div>
                            </NavLink>
                        </li>
                        <li className=" px-12"></li>
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? "font-bold bg-transparent active:bg-[#ff9787] active:text-[#272822]" : "active:bg-[#ff9787] active:text-[#272822] "} >
                                <svg fill="none" className="w-8 p-0" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/chat" className={({ isActive }) => isActive ? "font-bold bg-transparent active:bg-[#ff9787] active:text-[#272822]" : "active:bg-[#ff9787] active:text-[#272822] "} >
                                <svg fill="none" className=" w-8 p-0" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>
                                Chat
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/veterinarians" className={({ isActive }) => isActive ? "font-bold bg-transparent active:bg-[#ff9787] active:text-[#272822]" : "active:bg-[#ff9787] active:text-[#272822] "} >
                                <svg fill="none" className="w-8 p-0" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                                Veterinarians
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/posts" className={({ isActive }) => isActive ? "font-bold bg-transparent active:bg-[#ff9787] active:text-[#272822]" : "active:bg-[#ff9787] active:text-[#272822] "} >
                                <svg fill="none" className="w-8 p-0" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                                </svg>
                                Posts
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/histories" className={({ isActive }) => isActive ? "font-bold bg-transparent active:bg-[#ff9787] active:text-[#272822]" : "active:bg-[#ff9787] active:text-[#272822] "} >
                                <svg fill="none" className="w-8 p-0" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                                Histories
                            </NavLink>
                        </li>
                        <li className=" px-12"></li>

                        <li>
                            <label onClick={handleLogout} className={({ isActive }) => isActive ? "font-bold bg-transparent active:bg-[#ff9787] active:text-[#272822]" : "active:bg-[#ff9787] active:text-[#272822] "} >
                                <svg fill="none" className="w-8 p-0" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"></path>
                                </svg>
                                Log out
                            </label>
                        </li>
                    </div>
                </ul>

            </div>
        </div>
    </>
    )
}
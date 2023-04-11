import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "./components/Layout";
import OwnerInfo from "./components/OwnerInfo";
import Chat from "./views/Chat";
import ClinicProfile from "./views/ClinicProfile";
import CreateClinic from "./views/CreateClinic";
import CreateInvoice from "./views/CreateInvoice";
import Dashboard from "./views/Dashboard";
import History from "./views/History";
import Login from "./views/Login";
import PetDetail from "./views/PetDetail";
import Posts from "./views/Posts";
import Register from "./views/Register";
import VetDetail from "./views/VetDetail";
import Veterinarians from "./views/Veterinarian";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: "/",
                element: < Dashboard />
            },
            {
                path: "/posts",
                element: <Posts />
            },
            {
                path: "/veterinarians",
                element: <Veterinarians />
            },
            {
                path: "/histories",
                element: <History />
            },
            {
                path: "/profile",
                element: <ClinicProfile />
            },
            {
                path: "/veterinarians/:id",
                element: <VetDetail />
            },
            {
                path: "/pet",
                element: <PetDetail />,
                children: [
                    {
                        path: "owner/:id",
                        element: <OwnerInfo />
                    },
                    {
                        path: "history/:id",
                        element: <>Appointment history</>
                    }
                ]
            },
            {
                path: "/invoice/:id/:petId/:doctorId",
                element: <CreateInvoice />
            },
            {
                path: "/chat",
                element: <Chat />
            },
        ],
        loader: () => {
            if (!localStorage.getItem("access_token")) {
                return redirect("/login")
            }
            return null
        },
    },
    {
        path: "/login",
        element: <Login />,
        loader: () => {
            if (localStorage.getItem("access_token")) {
                return redirect('/')
            }
            return null
        }
    },
    {
        path: "/register",
        element: <Register />,
        loader: () => {
            if (localStorage.getItem("access_token")) {
                return redirect('/')
            }
            return null
        }
    },
    {
        path: "/register/clinic",
        element: <CreateClinic />,
        loader: () => {
            if (localStorage.getItem("access_token")) {
                return redirect('/')
            }
            return null
        }
    }

])
export default router
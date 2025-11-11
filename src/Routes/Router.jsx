import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";

import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MyProfile from "../Pages/MyProfile";
import PrivateRouts from "./PrivateRouts";

import ForgetPassword from "../Pages/ForgetPassword";
import UpdateProfile from "../Pages/UpdateProfile";
import ErrorPage from "../Pages/ErrorPage";

import Loading from "../Pages/Loading";
import AddProduct from "../Component/AddProduct";

import ServicePage from "../Pages/ServicePage";
import ServiceDetails from "../Pages/ServiceDetails";
import MyBooking from "../Pages/MyBooking";
import MyService from "../Pages/MyService";
import AddService from "../Pages/AddService";
import UpdateService from "../Pages/UpdateService";


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch('https://workly-server-two.vercel.app/sorted-data'),
                hydrateFallbackElement: <Loading></Loading>,
            },


        ]
    },
    // {
    //     path: '/about-us',
    //     element: <AboutUs></AboutUs>,
    // },
    {
        path: '/add-product',
        element: <AddProduct></AddProduct>,
    },
    // {
    //     path: '/update-app/:id',
    //     element: <UpdateApp></UpdateApp>,
    //     // loader: ({ params }) => fetch(`https://workly-server-two.vercel.app/models/${params.id}`),
    //     loader: () => fetch(`/appdata.json`),
    //     hydrateFallbackElement: <Loading></Loading>,
    // },
    {
        path: '/all-service',
        element: <ServicePage></ServicePage>,
        loader: () => fetch("https://workly-server-two.vercel.app/services"),
        // loader: () => fetch("https://workly-server-two.vercel.app/models"),
        hydrateFallbackElement: <Loading></Loading>,
    },
    {
        path: '/service-details/:id',
        element: (
            <PrivateRouts>
                <ServiceDetails />
            </PrivateRouts>
        ),
        loader: ({ params }) => fetch(`https://workly-server-two.vercel.app/services/${params.id}`),
        hydrateFallbackElement: <Loading />,
    },

    {
        path: '/my-service',
        element: <PrivateRouts>
            <MyService></MyService> ,
        </PrivateRouts>,
        loader: () => fetch(`https://workly-server-two.vercel.app/services`),
        // loader: ({ params }) => fetch(`https://workly-server-two.vercel.app/models/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
    },
    {
        path: '/update-service/:id',
        element: <PrivateRouts>
            <UpdateService></UpdateService> ,
        </PrivateRouts>,
        loader: ({ params }) => fetch(`https://workly-server-two.vercel.app/services/${params.id}`),
        // loader: ({ params }) => fetch(`https://workly-server-two.vercel.app/models/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
    },

    {
        path: '/add-service',
        element: <PrivateRouts>
            <AddService></AddService> ,
        </PrivateRouts>,
        loader: () => fetch(`/serviceData.json`),
        // loader: ({ params }) => fetch(`https://workly-server-two.vercel.app/models/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
    },
    {
        path: '/my-booking',
        element: <PrivateRouts>
            <MyBooking></MyBooking> ,
        </PrivateRouts>,
        loader: () => fetch(`https://workly-server-two.vercel.app/booking`),
        // loader: ({ params }) => fetch(`https://workly-server-two.vercel.app/models/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
    },
    {
        path: '/auth',
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: '/auth/login',
                element: <Login></Login>,
            },
            {
                path: '/auth/register',
                element: <Register></Register>,
            },

            {
                path: '/auth/forget-password',
                element: <ForgetPassword></ForgetPassword>,
            },
            {
                path: '/auth/my-profile',
                element: <PrivateRouts>
                    <MyProfile></MyProfile>
                </PrivateRouts>,
            },
            {
                path: '/auth/update-profile',
                element: <UpdateProfile></UpdateProfile>,
            },
        ]
    },
    {
        path: '/apps',
        element: <h2>Apps Layout</h2>,
    },
    {
        path: '/*',
        element: <ErrorPage></ErrorPage>,
    },
])
export default router
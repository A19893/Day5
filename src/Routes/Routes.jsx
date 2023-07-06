import Signup from "../Components/Signup"
import Login from "../Components/Login"
import Home from '../Components/Home'
import Profile from '../Components/Profile'
export const publicRoutes=[
    {
        path:"/",
        element:<Signup/>
    },
    {
       path:"/login",
       element:<Login/>
    },
    {
        path:"/profile",
        element:<Profile/>
    },
    {
        path:"/*",
        element:<Login/>
    }
    ]
    export const privateRoutes=[
        {
            path:"/home",
            element:<Home/>
        }
    ]
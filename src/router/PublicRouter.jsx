import {
    createBrowserRouter,
} from "react-router-dom";
import Root from "../layout/Root";
import Home from "../Home/Home/Home";
import AllPlants from "../Plants/AllPlants/AllPlants";
import FruitPlants from "../Plants/FruitPlants/FruitPlants";
import FlowerPlants from "../Plants/FlowerPlants/FlowerPlants";
import AllShops from "../AllShops/AllShops";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ViewDetails from "../Plants/ViewDetails/ViewDetails";
import Dashboard from "../layout/Dashboard";
import Admin from "../Dashboard/Admin/Admin/Admin";
import AllUsers from "../Dashboard/Admin/AllUsers/AllUsers";
import ViewShops from "../Dashboard/Admin/ViewShops/ViewShops";
import ShopHome from "../Dashboard/Shop/ShopHome/ShopHome";
import SalesReport from "../Dashboard/Shop/SalesReport/SalesReport";
import AllProducts from "../Dashboard/Shop/AllProducts/AllProducts";
import SearchPlants from "../Home/SearchPlants/SearchPlants";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/all-plants",
                element: <AllPlants></AllPlants>,
            },
            {
                path: "/fruit",
                element: <FruitPlants></FruitPlants>,
            },
            {
                path: "/flower",
                element: <FlowerPlants></FlowerPlants>,
            },
            {
                path: "/searchplants",
                element: <SearchPlants></SearchPlants>,
            },
            {
                path: "/shops",
                element: <AllShops></AllShops>,
            },
            {
                path: "/plantDetails/:id",
                element: <ViewDetails></ViewDetails>,
                loader: ({params})=> fetch(`http://localhost:5000/allplants/${params.id}`)
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            
        ]
    },


    //Dashboard
    {
        path:'dashboard',
        element: <Dashboard></Dashboard>,
        children: [

            /* Admin Route */
            {
                path: 'admin-home',
                element: <Admin></Admin>
            },
            {
                path:'all-users',
                element: <AllUsers></AllUsers>
            },
            {
                path:'all-shops',
                element: <ViewShops></ViewShops>
            },

            /* Shop Route */
            {
                path: 'shop-home',
                element: <ShopHome></ShopHome>
            },
            {
                path:'sales-report',
                element: <SalesReport></SalesReport>
            },
            {
                path:'all-products',
                element: <AllProducts></AllProducts>
            },
        ]

    }
]);

export default router;
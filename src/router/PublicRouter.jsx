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
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../shared/ErrorPage";
import SettingsPage from "../shared/SettingsPage";
import UserProfile from "../Dashboard/User/UserProfile/UserProfile";
import CreateShop from "../Dashboard/User/CreateShop/CreateShop";
import ShopDetails from "../AllShops/ShopDetails";
import CartShop from "../Dashboard/User/ShopCart/CartShop";
import OrderPlace from "../Dashboard/User/ShopCart/orderPlace";
import Receipt from "../Dashboard/User/ShopCart/Receipt";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
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
                path: "/shopcart",
                element: <CartShop></CartShop>,
            },
            {
                path: "/orderPlace",
                element: <OrderPlace></OrderPlace>,
            },
            {
                path: "/receipt",
                element: <Receipt></Receipt>,
            },
            {
                path: "/shops",
                element: <AllShops></AllShops>,
            },
            {
                path: "/plantDetails/:id",
                element: <ViewDetails></ViewDetails>,
                loader: ({params})=> fetch(`https://baganbari-server.vercel.app/allplants/${params.id}`)
            },
            {
                path: "/shopDetails/:id",
                element: <ShopDetails></ShopDetails>,
                loader: ({params})=> fetch(`https://baganbari-server.vercel.app/shops/${params.id}`)
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
        element: <PrivateRoutes>
            <Dashboard></Dashboard>
        </PrivateRoutes>,
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

            /* User Route */
            {
                path: 'user-home',
                element: <UserProfile></UserProfile>
            },
            {
                path: 'create-shop',
                element: <CreateShop></CreateShop>
            },

            {
                path:'setting',
                element: <SettingsPage></SettingsPage>
            },

        ]

    }
]);

export default router;
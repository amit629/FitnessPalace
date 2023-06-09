import { Navigate, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements, json, redirect } from "react-router-dom";
import Home from "./Components/Home";
import GymHome from "./Components/productsPages/gym/GymHome";
import NearbyPlaces from "./Components/productsPages/gym/partials/NearbyPlaces";
import StoreHome from "./Components/productsPages/store/StoreHome";
import WorkoutHome from "./Components/productsPages/workouts/WorkoutHome";
import GymDetails from "./Components/productsPages/gym/partials/GymDetails";
import axios from "axios";
import Landing from "./Components/partials/Landing";
import NotFound from "./NotFound";
import Logn from './Components/partials/Subcomponent/Logn'
import Register from './Components/partials/Subcomponent/Register'
import Auth from "./Components/partials/Auth";
import AddProducts from "./Components/productsPages/store/adminComponents/AddProducts";
import MyProducts from "./Components/productsPages/store/adminComponents/MyProducts";
import AdminDashBoard from "./Components/productsPages/store/adminComponents/AdminDashBoard";
import EditProduct from "./Components/productsPages/store/adminComponents/EditProduct";
import Accessdenied from "./Accessdenied";
import Logout from "./Components/partials/Subcomponent/Logout";
import StoreLanding from "./Components/productsPages/store/storeComponents/StoreLanding";
import Store from "./Components/productsPages/store/storeComponents/Store";
import StoreProduct from "./Components/productsPages/store/storeComponents/StoreProduct";
import Cart from "./Components/productsPages/store/storeComponents/Cart";
import Profile from "./Components/productsPages/store/Profile";
import ProfAbout from "./Components/productsPages/store/storeComponents/ProfAbout";
import Addresses from "./Components/productsPages/store/storeComponents/Addresses";
import CheckOut from "./Components/productsPages/store/storeComponents/CheckOut";
import AddWorkout from "./Components/productsPages/workouts/superAdmin/AddWorkout";
import WorkoutsLan from "./Components/productsPages/workouts/workOutComponent/WorkoutsLan";
import Workouts from "./Components/productsPages/workouts/workOutComponent/Workouts";
import AdminSection from "./Components/productsPages/workouts/superAdmin/AdminSection";
import Payments from "./Components/productsPages/store/storeComponents/Payments";
import { Order } from "./reduxConf/slices/Order";
import OrderStatus from "./Components/productsPages/store/storeComponents/OrderStatus";
import Orders from "./Components/productsPages/store/storeComponents/Orders";
import SingleOrder from "./Components/productsPages/store/storeComponents/SingleOrder";
import SingleOrderPage from "./Components/productsPages/store/storeComponents/SingleOrderPage";

const router=createBrowserRouter(
  createRoutesFromElements(
    <> 
    <Route path='*' element={<NotFound/>}></Route>
    <Route path="/" element={<Home/>}>
      <Route index element={<Landing/>}></Route>  



      <Route path="/app/auth" element={<Auth/>}>
        <Route index element={<Logn/>}></Route>
        <Route path="register" element={<Register/>}></Route>
        <Route path="logout" element={<Logout/>}></Route>
      </Route>




        <Route path="app/nearByGym"  element={<GymHome/>}>
          <Route index element={<NearbyPlaces/>}>
              
          </Route>
          <Route 
          path="gymLocation/:id" 
          element={<GymDetails/>}
          loader={async({params})=>{
            let data={
              place_id:params.id
            }
            let resp=await fetch(`${process.env.REACT_APP_SERVER_URL}getGymDetails`,{
              method:'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body:JSON.stringify(data)
            })
            resp=await resp.json()
            return resp;
          }}
      
          >
            
          </Route>
        </Route>

      <Route path="app" element={<StoreHome/>}>

          <Route index Component={Store}>
            
          </Route>
          <Route path="order">
            <Route index element={<Orders/>}
              loader={async({params})=>{
                    let resp=await axios.get(`${process.env.REACT_APP_SERVER_URL}orders`,{
                      headers:{
                        'Authorization':`token ${JSON.parse(localStorage.getItem('login')).accessToken}`
                      }
                    }).catch((e)=>{
                      throw json({
                        errorLine:'bhai mechanic lage hai server jodne me sabar karo',
                        actualError:e.code
                      },{
                        status:e.response?e.response.status:e.status
                      });   
                  })
                  if(resp.data.err)
                  {
                    throw json({
                      errorLine:'server ud gaya',
                      actualError:resp.data.err
                    },{
                      status:resp.status
                    })
                  }
                  return resp.data.data; 
              }}
              errorElement={<NotFound/>}
            >

            </Route>
            <Route
              path=":id"
              element={<SingleOrderPage/>}
              loader={async({params})=>{
                return params.id;
              }}
      
              errorElement={<NotFound/>}
            >

            </Route>
            <Route path="completion" element={<OrderStatus/>}
              errorElement={<NotFound/>}
            >

            </Route>
          </Route>
          <Route
            path="profile"
            element={<Profile/>}
            loader={async({params})=>{
              let accessToken=localStorage.getItem('login');
              if(accessToken==null)
              {
                throw new Error('login to kar be')
              }
              accessToken=JSON.parse(accessToken).accessToken;
              let resp=await axios.get(`${process.env.REACT_APP_SERVER_URL}getUser`,{
                headers:{
                  'Authorization':`token ${accessToken}`
                }
              })
              // console.log(resp.data);
              // return resp.data
              if(resp.data.userData==undefined)
              {
                localStorage.removeItem('login');
                redirect('/app/auth')
              }
              else{
                return resp.data.userData;
              }
            }}
            errorElement={<Accessdenied/>}
          >
            <Route index element={<ProfAbout/>}>

            </Route>
            <Route path="orders" element={<ProfAbout/>}>

            </Route>
            
            <Route path="address" element={<Addresses/>}
            loader={async({params})=>{
              let accessToken=localStorage.getItem('login');
              if(accessToken==null)
              {
                throw new Error('login to kar be')
              }
              accessToken=JSON.parse(accessToken).accessToken;
              let userData="";
              let resp=await axios.get(`${process.env.REACT_APP_SERVER_URL}getUser`,{
                headers:{
                  'Authorization':`token ${accessToken}`
                }
              })
              // console.log(resp.data);
              // return resp.data
              if(resp.data.userData==undefined)
              {
                localStorage.removeItem('login');
                redirect('/app/auth')
              }
              else{
                userData=resp.data.userData;
              }
              return userData;
            }}
            errorElement={<Accessdenied/>}
            >

            </Route>
          </Route>
          
          <Route 
            path="product/:id" 
            element={<StoreProduct/>}
            loader={async({params})=>{
              let resp=await axios.get(`${process.env.REACT_APP_SERVER_URL}products/getData/${params.id}`);
              let data=resp.data;
              if(data.error.length!=0)
              {
                console.log(data.error)
                throw new Error('errr aa gaya')
              }
              return resp;
            }}
            errorElement={<NotFound/>}
            >
            
          </Route>

          <Route path="cart" element={<CheckOut/> }>
            <Route index element={<Cart/>}>

            </Route>
            <Route path="checkOut" element={<Payments/>}>

            </Route>
          <Route path="selectAddress" element={<Addresses/>}
            loader={async({params})=>{
              let accessToken=localStorage.getItem('login');
              if(accessToken==null)
              {
                throw new Error('login to kar be')
              }
              accessToken=JSON.parse(accessToken).accessToken;
              let userData="";
              let resp=await axios.get(`${process.env.REACT_APP_SERVER_URL}getUser`,{
                headers:{
                  'Authorization':`token ${accessToken}`
                }
              })
              // console.log(resp.data);
              // return resp.data
              if(resp.data.userData==undefined)
              {
                localStorage.removeItem('login');
                redirect('/app/auth')
              }
              else{
                userData=resp.data.userData;
              }
              let address=userData.address
              let Address=await axios.get(`${process.env.REACT_APP_SERVER_URL}getAddress`,{
                headers:{
                  'Authorization':`token ${accessToken}`
                }
              })

              return {
                userData:userData,
                addressData:Address.data.address
              }
            }}
            errorElement={<Accessdenied/>}

          >

          </Route>

          </Route>


          <Route path="admin" Component={AdminDashBoard}>
            <Route index Component={AddProducts}></Route>
            <Route path="adminProducts" Component={MyProducts}></Route>
            <Route 
              path="edit/:id" 
              element={<EditProduct/>}
              loader={async({params})=>{
                let accessToken=localStorage.getItem('login')
                if(accessToken==null)
                {
                    throw new Error('accessTokenNotFound')
                }
                accessToken=JSON.parse(accessToken)
                let data={
                  place_id:params.id
                }
                let resp=await axios.get(`${process.env.REACT_APP_SERVER_URL}admin/myProduct/${data.place_id}/edit`,{
                  headers:{
                    'Authorization':`token ${accessToken.accessToken}`
                  }
                });

                return resp;
              }}
              errorElement={<Accessdenied />}
              >
            </Route>
          </Route>
      </Route>
      <Route path="app/workouts" element={<WorkoutHome/>}>
            <Route index element={<WorkoutsLan/>} ></Route>
            <Route 
              path="changeWorkouts" 
              element={<AdminSection/>}
              loader={async({params})=>{
                  let resp=await axios.get(`${process.env.REACT_APP_SERVER_URL}workout/pid/${params.category}`).catch((e)=>{
                      throw json({
                        errorLine:'bhai mechanic lage hai server jodne me sabar karo',
                        actualError:e.code
                      },{
                        status:e.response?e.response.status:e.status
                      });   
                  })
                  if(resp.data.err)
                  {
                    throw json({
                      errorLine:'server ud gaya',
                      actualError:resp.data.err
                    },{
                      status:resp.status
                    })
                  }
                  return resp.data.data;
              }}
            
            ></Route>
            <Route path="addWorkout" element={<AddWorkout/>}></Route>
            <Route path="category/:category" element={<Workouts/>}
              loader={async({params})=>{
                  
                    let resp=await axios.get(`${process.env.REACT_APP_SERVER_URL}workout/${params.category}`).catch((e)=>{
                        throw json({
                          errorLine:'bhai mechanic lage hai server jodne me sabar karo',
                          actualError:e.code
                        },{
                          status:e.response?e.response.status:e.status
                        });   
                    })
                    if(resp.data.err)
                    {
                      throw json({
                        errorLine:'server ud gaya',
                        actualError:resp.data.err
                      },{
                        status:resp.status
                      })
                    }
                    return resp.data.data; 
                  
              }}
              errorElement={<NotFound/> }
            ></Route>
      </Route>
  </Route>
  </>

  )
)

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;

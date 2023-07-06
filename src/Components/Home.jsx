import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Admin from './Admin'
import User from './User'
import Vendor from './Vendor'
import { useDispatch } from 'react-redux'
import { removeAuthentication } from '../Features/AuthSlice'
import { removeUserDetails } from '../Features/UserSlice'
const Home = () => {
  const state=useSelector((state)=>state.usersData.loggedInUserDetails)
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const logoutHandler=()=>{
    dispatch(removeAuthentication());
    dispatch(removeUserDetails())
  }
  return (
    <>
    <div className='updateProfile'>
       <button style={{borderRadius:"25px",color:"white",backgroundColor:"#7286d3",height:"30px"}}onClick={e=>navigate("/profile",{state:state})}>Update Your Profile</button>
    </div>
    <div className='updateProfile'>
    <button style={{borderRadius:"25px",color:"white",backgroundColor:"#7286d3",height:"30px",width:"70px",marginTop:"10px"}}onClick={logoutHandler}>Logout</button>
    </div>
       {(()=>{if(state.value3==='Admin'){
           return(
            <Admin/>
           )
        }
        else if(state.value3==='User'){
          return(
          <User/>
          )
        }
        else{
          return(
          <Vendor/>
          )
        }
       })()}
    </>
  )
}

export default Home
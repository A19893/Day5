import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import Admin from './Admin'
import User from './User'
import Vendor from './Vendor'
const Home = () => {
  const {state}=useLocation();
  const navigate=useNavigate();
  return (
    <>
    <div className='updateProfile'>
       <button style={{borderRadius:"25px",color:"white",backgroundColor:"#7286d3",height:"80px"}}onClick={e=>navigate("/profile",{state:state})}>Update Your Profile</button>
    </div>
       {(()=>{if(state[0].value3==='Admin'){
           return(
            <Admin/>
           )
        }
        else if(state[0].value3==='User'){
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
import React,{useState} from 'react'
import { Radio,Button, Space,Input } from 'antd';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addAuthentication } from '../Features/AuthSlice';
import { checkUser } from '../Services/authenticateUser.service';
import { addUserDetails } from '../Features/UserSlice';
const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const options = [
    { label: 'Admin', value: 'Admin' },
    { label: 'User', value: 'User' },
    { label: 'Vendor', value: 'Vendor' },
  ];
  const[name,setName]=useState('');
  const[password,setPassword]=useState('');
  const [value3, setValue3] = useState('Admin');
  const[credential,setCredential]=useState(false);
  const onChange3 = ({ target: { value } }) => {
    console.log('radio3 checked', value);
    setValue3(value);
  };
  const nameHandler=(e)=>{
    setCredential(false);
   setName(e.target.value)
  }
  const passwordHandler=(e)=>{
    setCredential(false);
    setPassword(e.target.value);
  }
  const clickHandler=async(e)=>{
      if(name===""||password===""){
        setCredential(true);
      }
    //   if (localStorage.getItem('formData')) {
    //     const login = JSON.parse(localStorage.getItem('formData'))
    //     let fetchData=login?.filter((item)=>{
    //       return item.name===name;
    //     })
    //     if(fetchData.length>0){
    //     if (fetchData.length && fetchData[0].name ===name && fetchData[0].password===password && fetchData[0].value3===value3) {
    //       navigate("/home",{state:fetchData})
    //     } else {
    //       setAuthenticated("Credentials Invalid");
    //     }
    //    }
    //     else {
    //         alert("Please Register First");
    //     }
    // }
    e.preventDefault();
     try{
        const data= await checkUser(name,password,value3);
        console.log("data",data)
        if(data.status===200){
          dispatch(addUserDetails({name,password,value3}))
          dispatch(addAuthentication(data.data._id));
        navigate("/home");
        }
        if(data.status===204){
            alert("User not found")
          }
     }
     catch(err){
        console.log(err)
        alert(err.response.data)
     }
  }
  return (
    <>
    <div className="container">
       <div className="left-column">
        <img src='https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=826&t=st=1686900142~exp=1686900742~hmac=5114ec1a2b0786afff6559cc1da085dad2e1f202db892096b8e831b0610c9f2e://www.w3schhttps://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=826&t=st=1686900142~exp=1686900742~hmac=5114ec1a2b0786afff6559cc1da085dad2e1f202db892096b8e831b0610c9f2eools.com/howto/img_ahttps://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=826&t=st=1686900142~exp=1686900742~hmac=5114ec1a2b0786afff6559cc1da085dad2e1f202db892096b8e831b0610c9f2evatar.png://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=826&t=st=1686898253~exp=1686898853~hmac=373cd01736647bcb6314373d94b17198346fc1681bbda0802acd88d82a547808' alt="No"/>
       </div>
       <div className="right-columnlogin">
        <div id="content">
          <div className='heading'>
           <h1>Login Page</h1>
          </div>
          <div className="form">
           <form className="inputs">
            Username <Input size="large" style={{width:250}}placeholder="Enter username" onChange={e=>nameHandler(e)} />
            <br/><br/>
            Password   <Space direction="vertical">
           <Input.Password  size="large" placeholder="Enter password" onChange={e=>passwordHandler(e)}/>
            </Space>
            <span>{credential?<h4>Please enter details</h4>:""}</span>
            <br/><br/>
            <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
            <br/><br/>
            <Link to="/">Not a Registered User?</Link>
            <br/><br/>
            {/* <span style={{height:20,color:'red'}}>{authenticated}</span><br/><br/> */}
            <Space wrap>
            <Button type="primary" id="primary" onClick={(e)=>clickHandler(e)}>Login</Button>
            </Space>
           </form>
           </div>
          </div>
       </div>
    </div>
    </>
  )
}

export default Login
import React,{useState} from 'react'
import { Radio,Button, Space,Input } from 'antd';
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addUserDetails } from '../Features/UserSlice';
import { addAuthentication } from '../Features/AuthSlice';
import { addUser } from '../Services/addUser.service';
const Signup = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
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
    // e.preventDefault();
    if(name===""||password===""){
      setCredential(true);
    }
    // let formData=JSON.parse(localStorage.getItem('formData'))||[];
    // formData.push({name,password,value3})
    // localStorage.setItem('formData',JSON.stringify(formData));
    // let userData=JSON.parse(localStorage.getItem('formData'));
    //  let specificData=userData.filter((item)=>{
    //   return item.name===name;
    //  })
    dispatch(addUserDetails({name,password,value3}));
    try{
      const role=value3;
      const res=await addUser(name,password,role)
      console.log(res)
      if(res.status===200){
        dispatch(addAuthentication(res.data.insertedId));
        navigate("/home")
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
        <img src='https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg?w=826&t=st=1686898061~exp=1686898661~hmac=4ccf650792bd294c24f2f45ed9d57475a483d2b3c2d85cf7172c9cae8d6c08dd' alt="No"/>
       </div>
       <div className="right-columnsignup">
        <div id="content">
          <div className='heading'>
           <h1>Signup Page</h1>
          </div>
          <div className="form">
           <form className="inputs">
            Username <Input size="large" style={{width:300}} placeholder="Enter username" onChange={e=>nameHandler(e)}/>
            <br/><br/>
            Password <Space direction="vertical">
           <Input.Password  size="large" placeholder="Enter password" onChange={e=>passwordHandler(e)}/>
            </Space>
            <span>{credential?<h4>Please enter details</h4>:""}</span>
            <br/><br/>
            <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
            <br/><br/>
            <Link to="/login">Already a User?</Link>
            <br/><br/>
            <Space wrap>
            <Button type="primary" id="primary" onClick={(e)=>clickHandler()}>SignUp</Button>
            </Space>
           </form>
           </div>
          </div>
       </div>
    </div>
    </>
  )
}

export default Signup
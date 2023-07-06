import React,{useState,useEffect} from 'react'
import { Radio,Button, Space,Input } from 'antd';
import { useLocation,useNavigate } from 'react-router-dom';
const Profile = () => {
  const {state}=useLocation();
  const navigate=useNavigate();
  // console.log(state[0].name);
  const options = [
    { label: 'Admin', value: 'Admin' },
    { label: 'User', value: 'User' },
    { label: 'Vendor', value: 'Vendor' },
  ];
  const[name,setName]=useState('');
  const[prevName,setPrevName]=useState(' ');
  const[password,setPassword]=useState('');
  const [value3, setValue3] = useState('');
  const[data,setData]=useState([]);
  const onChange3 = ({ target: { value } }) => {
    // console.log('radio3 checked', value);
    setValue3(value);
  };
  useEffect(()=>{
    const setData=()=>{
    setPrevName(state[0].name)
    setName(state[0].name);
    setPassword(state[0].password);
    setValue3(state[0].value3);
    }
    setData();
  },[])
  const nameHandler=(e)=>{
    setName(e.target.value);
  }
  const passwordHandler=(e)=>{
    setPassword(e.target.value);
  }
  const clickHandler=(id)=>{
    // console.log(id);
    const updateData=JSON.parse(localStorage.getItem("formData"));
    let idx=-1;
    for(let i=0;i<updateData.length;i++){
        if(updateData[i].name===prevName){
           idx=i;
        }
    }
    // console.log(idx);
    updateData.splice(idx,1);
    updateData.push({name,password,value3})
     setData({name,password,value3});
     console.log(data);
     localStorage.setItem("formData",JSON.stringify(updateData));
     alert("You have to login again with your updated credentials");
     navigate("/login");
  }
  return (
    <>
    <div className="container">
       <div className="left-column">
        <img src='https://websolutionsbd.com/wp-content/uploads/2022/01/14611-740x520-740x520.jpg' alt="No"/>
       </div>
       <div className="right-columnlogin">
        <div id="content">
          <div className='heading'>
           <h1>Update Page</h1>
          </div>
          <div className="form">
           <form className="inputs">
            Username <Input size="large" style={{width:250}} value={name} onChange={e=>nameHandler(e)}/>
            <br/><br/>
            Password <Space direction="vertical">
           <Input.Password  size="large"  value={password} onChange={e=>passwordHandler(e)}/>
            </Space>
            <br/><br/>
            <Radio.Group options={options} onChange={onChange3} value={value3} optionType="button" />
            <br/><br/>
            <Space wrap>
            <Button type="primary" id="primary" onClick={e=>clickHandler(state[0].name)}>Update</Button>
            </Space>
           </form>
           </div>
          </div>
       </div>
    </div>
    </>
  )
}

export default Profile
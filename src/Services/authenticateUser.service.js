import axios from "axios";
export const checkUser=async(name,password,value3)=>{
  return await axios.post("http://localhost:5000/checkUser",{name:name,password:password,value3})
}
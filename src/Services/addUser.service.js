import axios from "axios"
export const addUser=(name,password,role)=>{
    return axios.post("http://localhost:5000/addUser",{name:name,password:password,role:role})
}
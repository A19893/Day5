import axios from "axios";
export const addProduct=(prodId,prodName,prodDesc,prodStatus,userId)=>{
    return axios.post("http://localhost:5000/addProduct",{prodId,prodName,prodDesc,prodStatus,userId})
}
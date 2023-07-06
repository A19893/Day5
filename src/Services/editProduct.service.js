import axios from "axios";
export const editProduct=(id,prodId,prodName,prodDesc,prodStatus)=>{
    return axios.post("http://localhost:5000/editProduct",{id,prodId,prodName,prodDesc,prodStatus})
}
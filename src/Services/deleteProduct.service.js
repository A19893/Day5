import axios from 'axios'
export const deleteProduct=(id)=>{
    return axios.post("http://localhost:5000/deleteProduct",{id})
}
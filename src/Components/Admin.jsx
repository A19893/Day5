import React,{useEffect,useState} from 'react'
import PresentItems from './PresentItems';
import NoItems from './NoItems';
import { getProducts } from '../Services/getProduct.service';
const Admin = () => {
 const[renderList,setrenderList]=useState(null);
 useEffect(()=>{
  // const ProductList=localStorage.getItem('productData')||[];
  // setrenderList(ProductList);
  const fetchProducts=async()=>{
    const ProductList=await getProducts();
    setrenderList(ProductList.data);
  }
  fetchProducts();
 },[]);
 return (
  <>
  {console.log(renderList,"render")}
  <div>
     {
      renderList && renderList.length>0?<PresentItems setrenderList={setrenderList}/>:<NoItems setrenderList={setrenderList}/>
     }
  </div>
  </>
);
}
 export default Admin;
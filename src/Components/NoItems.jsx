import { Button, Space,Input } from 'antd';
import { useState,useEffect } from 'react';
import { getProducts } from '../Services/getProduct.service';
import { addProduct } from '../Services/addProduct.service';
import { AddProduct } from '../Features/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
const NoItems =(props)=>{
  const userId=useSelector((state)=>state.authentication.currentUserId)
    const[addItems,setAddItems]=useState(false);
    const[prodId,setprodId]=useState('');
    const[prodName,setprodName]=useState('');
    const[prodDesc,setProdDesc]=useState('');
    const[list,setList]=useState([]);
    const prodStatus='Publish';
    const[click,setClick]=useState(false);
    const dispatch=useDispatch();
    useEffect(()=>{
    //   const ProductList=localStorage.getItem('productData')||[];
    //     setList(ProductList);
        const fetchProducts=async()=>{
            const ProductList=await getProducts();
            console.log(ProductList)
            setList(ProductList.data);
          }
          fetchProducts();
       },[click]);
    const addHandler=(e)=>{
     setAddItems(true);
    }
    const productAdd=async(e)=>{
        // let productData=JSON.parse(localStorage.getItem('productData'))||[];
        // console.log(prodId);
        // productData.push({prodId,prodName,prodDesc,prodStatus});
        // localStorage.setItem('productData',JSON.stringify(productData));
       const res=await addProduct(prodId,prodName,prodDesc,prodStatus,userId);
       if(res.status===200){
        dispatch(AddProduct({prodId,prodName,prodDesc,prodStatus}))
        setAddItems(false);
        setClick(true);
       }
    }
    return(
      <>
      <div className='adminPage'>
        <div>
            {console.log("list",list)}
        {list.length===0 && click===false?
        <img src="https://www.shutterstock.com/image-vector/no-item-found-vector-filled-260nw-2087433073.jpg" style={{width:"400px",height:"400px"}}alt="No Iamge"/>
        :""}
        </div>
        <div>
          <button onClick={e=>addHandler(e)}>Add Items</button>
         {
         addItems?
         <form>
          Product ID    <Input size="large" style={{width:300}} placeholder="Enter Product ID" onChange={e=>setprodId(e.target.value)}/><br/><br/>
          Product Name <Input size="large" style={{width:300}} placeholder="Enter Product Name" onChange={e=>setprodName(e.target.value)} /><br/><br/>
          Product Description <Input size="large" style={{width:300}} placeholder="Enter Description" onChange={e=>setProdDesc(e.target.value)}/><br/><br/>
          <Space wrap>
              <Button type="primary" id="primary" onClick={e=>productAdd(e)}>Submit Product Details</Button>
              </Space>
         </form>
          : " "}
        </div>
        <div>
          {
            list && list.length>0?
            props.setrenderList(list):' '
          }
        </div>
      </div>
      </>
    )
  }
  export default NoItems;
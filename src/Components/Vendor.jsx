import React,{useState,useEffect}from 'react';
import { Button, Space,Input } from 'antd';
import Modal from 'react-modal'
import { getProducts } from "../Services/getProduct.service";
import { AddProduct } from "../Features/UserSlice";
import { addProduct } from "../Services/addProduct.service";
import { editProduct } from '../Services/editProduct.service';
import { deleteProduct } from '../Services/deleteProduct.service';
import { useDispatch, useSelector } from "react-redux";
const Vendor = () => {
  const userId=useSelector((state)=>state.authentication.currentUserId)
  console.log("current user",userId)
  const[prodId,setprodId]=useState('');
  const[prodName,setprodName]=useState('');
  const[prodDesc,setProdDesc]=useState('');
  const[prodStatus,setProdStatus]=useState('Publish')
  const[addItems,setAddItems]=useState(false);
  const[modalIsOpen,setModalIsOpen]=useState(false);
  const[list,setList]=useState(null);
  // const[renderList,setrenderList]=useState(null);
  const[click,setClick]=useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
  // const ProductList=localStorage.getItem('productData')||[];
  // setrenderList(ProductList);
  // const data=JSON.parse(localStorage.getItem("productData"));
  //   setList(data);
  const fetchProducts = async () => {
    const ProductList = await getProducts();
    console.log(ProductList);
    setList(ProductList.data);
  };
  fetchProducts();
  },[click]);
  const addHandler=(e)=>{
    setAddItems(true);
   }
   const productAdd=async(id)=>{
    // let productData=JSON.parse(localStorage.getItem('productData'))||[];
    // productData.push({prodId,prodName,prodDesc,prodStatus});
    // localStorage.setItem('productData',JSON.stringify(productData));
    // productData=JSON.parse(localStorage.getItem('productData'))||[];
    // setList(productData)
    // setAddItems(false);
    const res = await addProduct(prodId, prodName, prodDesc, prodStatus,userId);
    if (res.status === 200) {
      dispatch(AddProduct({ prodId, prodName, prodDesc, prodStatus }));
      setAddItems(false);
      setClick(true);
    }
    setprodId("");setprodName("");setProdDesc("");
  }
  const productEdit=async(id)=>{
    // console.log(idx);
    // let productData=JSON.parse(localStorage.getItem('productData'))||[];
    // productData.splice(idx,1);
    // console.log(productData);
    // productData.push({prodId,prodName,prodDesc,prodStatus});
    // localStorage.setItem('productData',JSON.stringify(productData));
    // productData=JSON.parse(localStorage.getItem('productData'))||[];
    // setList(productData)
    const res=await editProduct(id,prodId,prodName,prodDesc,prodStatus);
    if(res.status===200)
    setClick(!click)
    setprodId("");setprodName("");setProdDesc("");
  }
  const deleteHandler=async(id)=>{
  //  let data=JSON.parse(localStorage.getItem('productData'));
  //  data.splice(idx,1);
  //  if(data.length>0){
  //  localStorage.setItem('productData',JSON.stringify(data));
  //  setList(data);
  //  }
  //  else{
  //   localStorage.removeItem('productData');
  //   setrenderList(null);
  //  }
  const res=await deleteProduct(id);
    if(res.status===200)
    setClick(!click);
  }
  return (
    <div>
       <div>
        <br/>
       <button style={{borderRadius:"25px",color:"white",backgroundColor:"#7286d3",height:"80px",width:"120px"}} onClick={e=>addHandler(e)}>Add Items</button>
       {
         addItems?
         <form>
          Product ID    <Input size="large" style={{width:300}} placeholder="Enter Product ID" onChange={e=>setprodId(e.target.value)}/><br/><br/>
          Product Name <Input size="large" style={{width:300}} placeholder="Enter Product Name" onChange={e=>setprodName(e.target.value)} /><br/><br/>
          Product Description <Input size="large" style={{width:300}} placeholder="Enter Description" onChange={e=>setProdDesc(e.target.value)}/><br/><br/>
          Product Status <Input size="large" style={{width:300}} placeholder="Enter Status" onChange={e=>setProdStatus(e.target.value)}/><br/><br/>
          <Space wrap>
              <Button type="primary" id="primary" onClick={e=>productAdd()}>Submit Product Details</Button>
              </Space>
         </form>
          : " "}
        </div>
        {console.log("list",list)}
        {
          list?.map((item,idx)=>{
            if(item.productBy===userId)
            return(
              <>
              <div className='specificProd'>
              Product ID-{item.id}<br/>
              Prod Name-{item.name}<br/>
              Prod Description-{item.description}<br/>
              {item.status==='Publish'?<button type="submit" style={{width:"100px",backgroundColor:'green',borderRadius:"25px",color:'white'} } onClick={() => setModalIsOpen(!modalIsOpen)}>Edit</button>:" "}
              <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
              Product ID  <Input size="large" style={{width:300}} placeholder="Enter Product ID" onChange={e=>setprodId(e.target.value)}/><br/><br/>
              Product Name <Input size="large" style={{width:300}} placeholder="Enter Product Name" onChange={e=>setprodName(e.target.value)} /><br/><br/>
              Product Description <Input size="large" style={{width:300}} placeholder="Enter Description" onChange={e=>setProdDesc(e.target.value)}/><br/><br/>
             <Space wrap>
              <Button type="primary" id="primary" onClick={e=>productEdit(item._id)}>Submit Product Details</Button>
              </Space>
              </Modal>
              {item.status==='Draft'?<button type="submit" style={{width:"100px",backgroundColor:'red',borderRadius:"25px",color:'white'} }onClick={e =>deleteHandler(item._id)}>Delete</button>:" "}
              </div>
              </>
            )
          })
        }
    </div>
  );
}

export default Vendor;
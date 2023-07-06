import React,{useState,useEffect}from 'react';
import { Button, Space,Input } from 'antd';
import Modal from 'react-modal'
const Vendor = () => {
  const[prodId,setprodId]=useState('');
  const[prodName,setprodName]=useState('');
  const[prodDesc,setProdDesc]=useState('');
  const[prodStatus,setProdStatus]=useState('Publish')
  const[addItems,setAddItems]=useState(false);
  const[modalIsOpen,setModalIsOpen]=useState(false);
  const[list,setList]=useState(null);
  const[renderList,setrenderList]=useState(null);
  useEffect(()=>{
  const ProductList=localStorage.getItem('productData')||[];
  setrenderList(ProductList);
  const data=JSON.parse(localStorage.getItem("productData"));
    setList(data);
  },[]);
  const addHandler=(e)=>{
    setAddItems(true);
   }
   const productAdd=(e)=>{
    let productData=JSON.parse(localStorage.getItem('productData'))||[];
    productData.push({prodId,prodName,prodDesc,prodStatus});
    localStorage.setItem('productData',JSON.stringify(productData));
    productData=JSON.parse(localStorage.getItem('productData'))||[];
    setList(productData)
    setAddItems(false);
  }
  const productEdit=(idx)=>{
    console.log(idx);
    let productData=JSON.parse(localStorage.getItem('productData'))||[];
    productData.splice(idx,1);
    console.log(productData);
    productData.push({prodId,prodName,prodDesc,prodStatus});
    localStorage.setItem('productData',JSON.stringify(productData));
    productData=JSON.parse(localStorage.getItem('productData'))||[];
    setList(productData)
  }
  const deleteHandler=(idx)=>{
   let data=JSON.parse(localStorage.getItem('productData'));
   data.splice(idx,1);
   if(data.length>0){
   localStorage.setItem('productData',JSON.stringify(data));
   setList(data);
   }
   else{
    localStorage.removeItem('productData');
    setrenderList(null);
   }
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
        {
          list?.map((item,idx)=>{
            return(
              <>
              <div className='specificProd'>
              Product ID-{item.prodId}<br/>
              Prod Name-{item.prodName}<br/>
              Prod Description-{item.prodDesc}<br/>
              {item.prodStatus==='Publish'?<button type="submit" style={{width:"100px",backgroundColor:'green',borderRadius:"25px",color:'white'} } onClick={() => setModalIsOpen(!modalIsOpen)}>Edit</button>:" "}
              <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
              Product ID  <Input size="large" style={{width:300}} placeholder="Enter Product ID" onChange={e=>setprodId(e.target.value)}/><br/><br/>
              Product Name <Input size="large" style={{width:300}} placeholder="Enter Product Name" onChange={e=>setprodName(e.target.value)} /><br/><br/>
              Product Description <Input size="large" style={{width:300}} placeholder="Enter Description" onChange={e=>setProdDesc(e.target.value)}/><br/><br/>
             <Space wrap>
              <Button type="primary" id="primary" onClick={e=>productEdit(idx)}>Submit Product Details</Button>
              </Space>
              </Modal>
              {item.prodStatus==='Draft'?<button type="submit" style={{width:"100px",backgroundColor:'red',borderRadius:"25px",color:'white'} }onClick={e =>deleteHandler(idx)}>Delete</button>:" "}
              </div>
              </>
            )
          })
        }
    </div>
  );
}

export default Vendor;
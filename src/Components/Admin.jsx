import React,{useEffect,useState} from 'react'
import { Button, Space,Input } from 'antd';
import Modal from 'react-modal'
const Admin = () => {
 const[renderList,setrenderList]=useState(null);
 useEffect(()=>{
const ProductList=localStorage.getItem('productData')||[];
  setrenderList(ProductList);
 },[]);
  function PresentItems(){
    const[list,setList]=useState(null);
    const[prodId,setprodId]=useState('');
    const[prodName,setprodName]=useState('');
    const[prodDesc,setProdDesc]=useState('');
    const[prodStatus,setProdStatus]=useState('Publish');
    const[addItems,setAddItems]=useState(false);
    const[modalIsOpen,setModalIsOpen]=useState(false);
    useEffect(()=>{
      const data=JSON.parse(localStorage.getItem("productData"));
      console.log(prodStatus);
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
    return(
      <>
      <div className='prodList'>
        <div className='addBtn'>
        <button style={{borderRadius:"25px",color:"white",backgroundColor:"#7286d3",height:"80px",width:"120px"}} onClick={e=>addHandler(e)}>Add Items</button>
         {
         addItems?
         <form>
          Product ID    <Input size="large" style={{width:300}} placeholder="Enter Product ID" onChange={e=>setprodId(e.target.value)}/><br/><br/>
          Product Name <Input size="large" style={{width:300}} placeholder="Enter Product Name" onChange={e=>setprodName(e.target.value)} /><br/><br/>
          Product Description <Input size="large" style={{width:300}} placeholder="Enter Description" onChange={e=>setProdDesc(e.target.value)}/><br/><br/>
          <Space wrap>
              <Button type="primary" id="primary" onClick={e=>productAdd()}>Submit Product Details</Button>
              </Space>
         </form>
          : " "}
        </div>
        <div className='product'>
        {
          list?.map((item,idx)=>{
            return(
              <>
              <div className='specificProd'>
              Product ID-{item.prodId}<br/>
              Prod Name-{item.prodName}<br/>
              Prod Description-{item.prodDesc}<br/>
              <button type="submit" style={{width:"100px",backgroundColor:'green',borderRadius:"25px",color:'white'} } onClick={() => setModalIsOpen(!modalIsOpen)}>Edit</button>
              <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false}>
              Product ID  <Input size="large" style={{width:300}} placeholder="Enter Product ID" onChange={e=>setprodId(e.target.value)}/><br/><br/>
              Product Name <Input size="large" style={{width:300}} placeholder="Enter Product Name" onChange={e=>setprodName(e.target.value)} /><br/><br/>
              Product Description <Input size="large" style={{width:300}} placeholder="Enter Description" onChange={e=>setProdDesc(e.target.value)}/><br/><br/>
             <Space wrap>
              <Button type="primary" id="primary" onClick={e=>productEdit(idx)}>Submit Product Details</Button>
              </Space>
              </Modal>
              <button type="submit" style={{width:"100px",backgroundColor:'red',borderRadius:"25px",color:'white'} } onClick={e =>deleteHandler(idx)}>Delete</button>
              </div>
              </>
            )
          })
        }
        </div>
        </div>
      </>
    )
  }
  function NoItems (){
    const[addItems,setAddItems]=useState(false);
    const[prodId,setprodId]=useState('');
    const[prodName,setprodName]=useState('');
    const[prodDesc,setProdDesc]=useState('');
    const[list,setList]=useState([]);
    const[prodStatus,setProdStatus]=useState('Publish');
    const[click,setClick]=useState(false);
    useEffect(()=>{
      const ProductList=localStorage.getItem('productData')||[];
        setList(ProductList);
       },[click]);
    const addHandler=(e)=>{
     setAddItems(true);
    }
    const productAdd=(e)=>{
        let productData=JSON.parse(localStorage.getItem('productData'))||[];
        console.log(prodId);
        productData.push({prodId,prodName,prodDesc,prodStatus});
        localStorage.setItem('productData',JSON.stringify(productData));
        setAddItems(false);
        setClick(true);
    }
    return(
      <>
      <div className='adminPage'>
        <div>
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
            setrenderList(list):' '
          }
        </div>
      </div>
      </>
    )
  }
 return (
  <>
  <div>
     {
      renderList && renderList.length>0?<PresentItems/>:<NoItems/>
     }
  </div>
  </>
);
}
 export default Admin;
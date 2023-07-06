import React, { useState, useEffect } from 'react';
import { getProducts } from "../Services/getProduct.service";
const User = () => {
    const [list, setList] = useState(null);
    useEffect(() => {
        const fetchProducts = async () => {
            const ProductList = await getProducts();
            console.log(ProductList);
            setList(ProductList.data);
          };
          fetchProducts();
    }, []);
    const addHandler = (idx) => {
        let userData = JSON.parse(localStorage.getItem('userData')) || [];
        let cartItems = JSON.parse(localStorage.getItem('productData')) || [];
        userData.push(cartItems[idx]);
        localStorage.setItem('userData', JSON.stringify(userData));
    }
    return (
        <div className='user'>
            {
                list?.map((item, idx) => {
                    return (
                        <>
                            <div className='specificProd'>
                                Product ID-{item.id}<br />
                                Prod Name-{item.name}<br />
                                Prod Description-{item.description}<br />
                                <button type="submit" style={{ width: "100px", backgroundColor: 'blue', borderRadius: "25px", color: 'white' }} onClick={e => addHandler(idx)}>Add to Cart</button>
                            </div>
                        </>
                    )
                })
            }
        </div>
    );
}

export default User;
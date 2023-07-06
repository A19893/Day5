import React, { useState, useEffect } from 'react';
const User = () => {
    const [list, setList] = useState(null);
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("productData"));
        setList(data);
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
                                Product ID-{item.prodId}<br />
                                Prod Name-{item.prodName}<br />
                                Prod Description-{item.prodDesc}<br />
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
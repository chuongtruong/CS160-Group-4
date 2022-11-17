import React, {useEffect} from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Basket from "../components/Basket";
import "./Cart.css"
import {useState} from 'react'
import axios from "axios";

function Cart() {


     //const {products} = data
     const products = JSON.parse(window.sessionStorage.getItem("item"))
     //let data = {products: products}
     console.log(products, "These are the products from menu")

     let [cartItems, setCartItems] = useState([]);



     const onOrder = async (requestBody, TABLE_ID) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        };

        const response = await fetch(`http://localhost:5000/t=${TABLE_ID}/create2`, requestOptions);

        if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
        }

        const result = await response.json();

        console.log('result is: ', JSON.stringify(result, null, 4));
    };


     const onAdd = (product) =>{
         const exist = cartItems.find(x=>x.id === product.id);
         if(exist){
             setCartItems(cartItems.map((x)=>
                 x.id === product.id ? {...exist, quantity: exist.quantity + 1} : x
             ))
         }else{
             setCartItems([...cartItems, { ...product, quantity:1}]);
         }
     };

     const onRemove = (product) => {
         const exist = cartItems.find((x)=> x.id === product.id);
         if(exist.quantity === 1){
             setCartItems(cartItems.filter((x)=> x.id !== product.id));
         }else{
             setCartItems(cartItems.map((x)=>
                 x.id === product.id ? {...exist, quantity: exist.quantity - 1} : x
             ))
         }
     }

     return (
         <div className="table-mid w-1/2 my-0 mx-auto box-border h-12">
             <Header countCartItems={cartItems.length}></Header>
             <div className="row">
                 <Main onAdd={onAdd} onRemove={onRemove} products={products}></Main>
                 <Basket onAdd={onAdd} onRemove={onRemove} onOrder={onOrder} products={products} cartItems={cartItems}></Basket>
             </div>
         </div>
     );


 }


export default Cart;
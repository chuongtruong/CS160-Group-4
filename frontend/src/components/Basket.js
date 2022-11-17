import React, {useEffect, useState} from 'react';
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";

export default function Basket(props){
    let {cartItems, onAdd, onRemove, products, init_cart, onOrder} = props


    if (products != undefined) {
        cartItems = products
    }

    console.log(products)
    const itemsPrice = cartItems.reduce((a,c)=> a + c.price * c.quantity, 0);
    const taxPrice = itemsPrice * 0.14;
    const totalPrice = itemsPrice + taxPrice;

    return (
        <aside className={"block col-1"}>
            <h2>Your Total</h2>
            <div>{cartItems.length ===0 && <div>Cart Is Empty</div>}</div>
            {cartItems.map((item)=>(
                <div key={item.id} className="row">
                    <div className="col-2">{item.name}</div>
                    <div className="col-2 text-right">
                        {item.qty} x ${item.price.toFixed(2)}
                    </div>
                </div>

            ))}
            {cartItems.length !== 0 && (
                <>
                <hr></hr>
                    <div className="row">
                        <div className={"col-2"}>Items Price</div>
                        <div className={"col-1 text-right"}>${itemsPrice.toFixed(2)}</div>
                    </div>
                     <div className="row">
                        <div className={"col-2"}>Tax Price</div>
                        <div className={"col-1 text-right"}>${taxPrice.toFixed(2)}</div>
                    </div>
                     <div className="row">
                         <div className={"col-2"}><strong>Total Price</strong></div>
                        <div className={"col-1 text-right"}>${totalPrice.toFixed(2)}</div>
                    </div>
                    <hr/>
                    <div className={"row"}>
                        <button onClick={async ()=> {

                            let order = {}
                            await products.forEach((product)=> {
                                order[product.id] = {name:product.name, quantity:product.quantity, price:product.price}
                            })
                            console.log(order, "order sent to the backend")
                            onOrder(order, 1);
                            setTimeout(()=>{window.open('http://localhost:3000/confirmation')},500);
                        }} >Place Order</button>
                    </div>
                </>
            )}
        </aside>
    );
}
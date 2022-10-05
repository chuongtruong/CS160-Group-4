import React,{useState,useEffect} from 'react'
import { OrderList } from '../order/OrderList'
import { OrderSummary } from '../order/OrderSummary';

export const TableDetail = ({orderList}) => {

    const [subtotal,setSubtotal] = useState();
    const [tax,setTax] = useState();
    const [total,setTotal] = useState();

    useEffect(() => {
        let total = 0;
        let tax = 0;
        orderList.orders.map(order => (
            Object.entries(order).map(([name,values]) => (
                total += parseFloat(values[0]) * parseFloat(values[1])
            ))
        ))
        tax = (total * (20/100)).toFixed(2);
        setSubtotal(total.toFixed(2));
        setTax(tax);
        setTotal(parseFloat(total) + parseFloat(tax));
    },[])

    return (
        <div className="table-bottom">
            <span className='table-name'>{`Table ${orderList.table}`}</span>
            <div className="order-container">
                <div className="order-info">
                    {orderList.orders.map(order => (
                        Object.entries(order).map(([name,values]) => (
                        <OrderList
                            name={name}
                            quantity={values[0]}
                            amount={values[1]}
                        />
                        ))
                    ))}
                </div>
                <div className="order-info">
                    <OrderSummary subtotal={subtotal} tax={tax} total={total}/>
                </div>
                <div className="order-buttons">
                    <button>Update Order</button>
                    <button>Print Bill</button>
                </div>
            </div>
        </div>
    )
}

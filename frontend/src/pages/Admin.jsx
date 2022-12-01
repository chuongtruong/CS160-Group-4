import React,{useState,useEffect} from 'react'
import { AdminMid } from '../components/admin/AdminMid'
import { Navbar } from '../components/navbar/Navbar'
import { ListItems } from '../components/admin/ListItems'
import {useParams} from 'react-router-dom'
import axios from 'axios'

import {io} from "socket.io-client";
const socket = io.connect("http://localhost:3001") //

export const Admin = () => {

  const {id} = useParams()
  const [category,setCategory] = useState("Main")
  const [items,setItems] = useState()
  const [orderNum,setOrderNum] = useState(0)
  const [customerItems,setCustomerItmes] = useState([])


    ///Socket code starts here

  useEffect(()=>{socket.on("added_item", (data)=>{
        console.log("client side event add", data);
        setOrderNum(orderNum+1)

        setCustomerItmes(prev => [...prev,data])


    })},[socket])

  useEffect(()=>{socket.on("removed_item", (data)=>{
        console.log("client side event remove", data);

        if(data){
                setCustomerItmes(customerItems.filter(item => (
                    item !== data
                )))
                setOrderNum(orderNum-1)
            }

    })},[socket])

//Socket code ends here



  useEffect(() => {
    const getAllMenus = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/menu")
        setItems(res.data)
      } catch(err) {
        console.log(err)
      }
    }

    getAllMenus()
  },[])


  useEffect(() => {
    setItems(category === "Main" ? items : items.filter((item) => item.category === category))
  },[category])

  useEffect(()=> {
    window.sessionStorage.setItem("item",JSON.stringify(customerItems))
  },[customerItems])

  return (
    <>
      <div className="table-top">
        <Navbar orderNum={orderNum} id={id}/>
        <AdminMid setCategory={setCategory}/>
      </div>
         <div className="table-bottom admin-bottom w-1/2 mt-10 mx-auto">
          {items?.map((item) => (
            <ListItems
              key={item.id}
              name={item.name}
              category={item.category}
              price={item.price}
              calories={item.calories}
              url={item.url}
              desc={item.desc}
              item_id={item.item_Id}
              orderNum={orderNum}
              setOrderNum={setOrderNum}
              customerItems={customerItems}
              setCustomerItmes={setCustomerItmes}
            />
          ))}
      </div>
    </>
  )
}

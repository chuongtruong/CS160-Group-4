import {useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import {io} from "socket.io-client"

//const socket = io.connect("http://127.0.0.1:5000", {cors: {origin: "*"}})

//Whenever an event is emitted this function will run, the dependency is
// the socket variable
//useEffect(()=>{socket.on("name of event from backend", (data)=>{
  //add code to add item to the cart after receiving event

//})},[socket])


// backend needs to listen to an event called some data and then the backend
// needs to emit broadcast(emit an event to everyone)..the backend will
// send the data(which was sent to the backend) to everyone
// Lastly the front end will receive


export const ListItems = ({item_id,name,category,price,calories,url,desc,orderNum,setOrderNum,customerItems,setCustomerItmes}) => {


    /*********************/
    const handleClick = (v) => {

        const socket = io.connect("http://localhost:3001")
        if (v === "add") {
            const newOrder = {
                id: item_id,
                name: name,
                category: category,
                img: url,
                quantity: 1,
                price: price,
                calories: calories,
                desc: desc
            }

                socket.emit("add_item", {newOrder})
                socket.off()

        } else if (v === "remove") {
            const modItems = customerItems.find(item => item.name === name)

            socket.emit("remove_item", {modItems})
            socket.off()
        }
    }

    // useEffect(()=>{socket.on("added_item", (data)=>{
    // //add code to add item to the cart after receiving event
    //
    //     console.log("client side event add", data);
    //     setOrderNum(orderNum+1)
    //
    //     setCustomerItmes(prev => [...prev,data])
    //
    //
    // })},[socket])
    //
    // useEffect(()=>{socket.on("removed_item", (data)=>{
    //     //add code to remove item to the cart after receiving event
    //
    //     console.log("client side event remove", data);
    //
    //     if(data){
    //             setCustomerItmes(customerItems.filter(item => (
    //                 item !== data
    //             )))
    //             setOrderNum(orderNum-1)
    //         }
    //
    //
    // })},[socket])




    //************************************ OLD WORKING CODE
    // const handleClick = (v) => {
    //     if (v === "add") {
    //         setOrderNum(orderNum + 1)
    //         const newOrder = {
    //             id: item_id,
    //             name: name,
    //             category: category,
    //             img: url,
    //             quantity: 1,
    //             price: price,
    //             calories: calories,
    //             desc: desc
    //         }
    //         setCustomerItmes(prev => [...prev, newOrder])
    //
    //     } else if (v === "remove") {
    //         const modItems = customerItems.find(item => item.name === name)
    //         if (modItems) {
    //             setCustomerItmes(customerItems.filter(item => (
    //                 item !== modItems
    //             )))
    //             setOrderNum(orderNum - 1)
    //         }
    //     }
    // }


    return (
        <div className="item-container w-full my-6 h-52 flex relative">
            <div className="item-left w-4/12 h-full box-border overflow-hidden">
                <img src={url} className="item-img w-full h-full rounded-md"></img>
            </div>
            <div className="item-right flex flex-col justify-between p-4 w-full">
                <div>
                    <h2 className="text-lg font-bold">{name}</h2>
                    <span className="font-light">{calories}</span>
                </div>
                <div className="flex w-full justify-between">
                    <div className="flex">
                        <span className="item-price font-bold">{`$${price}`}</span>
                    </div>
                    <div className="flex">
                        <FontAwesomeIcon icon={faPlus} className="plus-icon rounded-full border-red-500 border-2 p-0.5 text-red-500 cursor-pointer" onClick={() => handleClick("add")}/>
                        <FontAwesomeIcon icon={faMinus} className="minus-icon rounded-full border-gray-500 border-2 p-0.5 text-black-500 ml-3 cursor-pointer" onClick={() => handleClick("remove")}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

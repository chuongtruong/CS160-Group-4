import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

export default function Product(props){
    const {product, onAdd, onRemove } = props;

    return(

        <div>
            <img className="small" src={product.img} alt={product.name}></img>
            <h2>{product.name}</h2>
                <div>${product.price}</div>
               <div style={{display: 'flex', justifyContent:'flex-end'}}>
                        <FontAwesomeIcon icon={faPlus} className="plus-icon rounded-full border-red-500 border-2 p-0.5 text-red-500 cursor-pointer" onClick={()=>onAdd(product)}/>
                        <FontAwesomeIcon icon={faMinus} className="minus-icon rounded-full border-gray-500 border-2 p-0.5 text-black-500 ml-3 cursor-pointer" onClick={()=>onRemove(product)}/>
               </div>
        </div>
    )

}
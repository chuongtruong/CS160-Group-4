import React from 'react'

export const TableMid = ({setIsEmpty,setIsDetail}) => {


    const handleClick = (name) => {
        setIsEmpty(name);
        setIsDetail(false);
    }
    
    return (
        <div className="table-mid">
            <div className="table-buttons">
                <button onClick={()=>handleClick('empty')}>Empty</button>
                <button onClick={()=>handleClick('occupied')}>Occupied</button>
            </div>
        </div>
    )
}

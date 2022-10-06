import React from 'react'

export const TableList = ({name,number,setIsDetail,setOrderList,orderList}) => {

  const handleClick = () => {
    if(name === 'occupied') {
      setIsDetail(true);
      setOrderList(orderList);
    }
  }

  return (
    <div className={`table-number table-${name}`} onClick={()=>handleClick()}>{number}</div>
  )
}

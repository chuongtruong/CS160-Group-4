import React,{useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export const OrderList = ({name,quantity,amount}) => {

    return (
      <>
      <div className="order-wrapper">
        <div className="order-list">
          <div className="list-left">
            <i><FontAwesomeIcon icon={faCircleXmark}/></i>
            <span>{name}</span>
          </div>
          <div className="list-right">
            <span>{`x${quantity}`}</span>
            <span>{`$${amount}`}</span>
          </div>
        </div>
        <div className="order-border"></div>
      </div>
      </>
    )
}

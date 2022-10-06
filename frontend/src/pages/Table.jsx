import React, { useState } from 'react'
import { TableTop } from '../components/table/TableTop';
import { TableMid } from '../components/table/TableMid';
import { TableLists } from '../components/table/TableLists';
import { TableDetail } from '../components/table/TableDetail';

export const Table = () => {

    const [isEmpty,setIsEmpty] = useState('empty');
    const [isDetail,setIsDetail] = useState(false);
    const [orderList,setOrderList] = useState([]);

    return (
        <div className="table-container">
            <div className="table-wrapper">
                <TableTop/>
                <TableMid setIsEmpty={setIsEmpty} setIsDetail={setIsDetail}/>
                {isDetail ? <TableDetail orderList={orderList}/> : <TableLists isEmpty={isEmpty} setIsDetail={setIsDetail} setOrderList={setOrderList}/>}
            </div>
        </div>
    )
}

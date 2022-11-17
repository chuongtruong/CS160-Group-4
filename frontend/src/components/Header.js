import React from 'react';

export default function Header(props){

    const {countCartItems} = props;

    return (
        <header className="row block center">
            <div>
                <a href="#/">
                    <h1>Order Summary</h1>
                </a>
            </div>
            <div>
                <a href="/table=1/admin"> Back </a>
            </div>
        </header>
    );
}
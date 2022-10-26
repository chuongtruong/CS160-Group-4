import React from "react";

export const Menu = ({ menu }) => {
  return (
    <main className="product-space">
      <dv className="container">
        <div className="row">
          {menu.map((item) => {
            const { id, img, price, cal, title } = item;
            return (
              <div className="col-6">
                <article key={id} className="main-div">
                  <div className="main-img">
                    <img src={img} alt="" />
                  </div>
                  <div className="content">
                    <h5>{title}</h5>
                    <h6>${price}</h6>
                    <h6>{cal}</h6>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </dv>
    </main>
  );
};

export default Menu;

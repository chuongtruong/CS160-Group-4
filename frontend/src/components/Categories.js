import React from "react";

export const Categories = ({ filterItems, categories }) => {
  return (
    <div className="container-category position-fixed">
      <div className="row">
        <div className="col-8 mx-auto">
          <div className="category-tab">
            {categories.map((category) => {
              return (
                <button
                  className="filterItems"
                  onClick={() => filterItems(category)}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;

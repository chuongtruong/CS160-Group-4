import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Menu from "./components/Menu";
import Categories from "./components/Categories";
import { menu } from "./components/Data";
import { useState } from "react";
import { Table } from "./pages/Table";
import { TableTop } from "./components/table/TableTop";

const allcategories = ["Home", ...new Set(menu.map((item) => item.category))];

function App() {
  const [menuItems, setMenuItems] = useState(menu);
  const [categories, setCategories] = useState(allcategories);

  const filterItems = (category) => {
    if (category == "Home") {
      return setMenuItems(menu);
    }
    const newMenu = menu.filter((item) => item.category === category);
    return setMenuItems(newMenu);
  };

  return (
    <div className="container py-5">
      <TableTop />
      <Categories filterItems={filterItems} categories={categories} />
      <Menu menu={menuItems} />
      <div className="App">
        <Table />
      </div>
    </div>
  );
}

export default App;

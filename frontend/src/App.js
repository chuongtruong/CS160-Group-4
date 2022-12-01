import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import  Cart  from "./pages/Cart"
import Confirm from "./pages/Confirm"
import { Admin } from "./pages/Admin";
function App() {

  return (
    <div className="App w-screen h-screen">
      <BrowserRouter>
          <Routes>
              <Route exact path="/cart" exact element={<Cart/>} />
              <Route exact path="/confirmation" exact element={<Confirm/>} />
              <Route path="/table=:id/admin" element={<Admin/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

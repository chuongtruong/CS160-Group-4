import { Table } from "./pages/Table";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'


import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<Register/>} ></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/table' element={<Table/>}></Route>
              <Route path='/admin' element={<Admin/>}></Route>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

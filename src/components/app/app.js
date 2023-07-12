// import { Routes, Route, Link,Switch,BrowserRouter as Router } from "react-router-dom";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import './app.css';
import HeaderComponent from '../header/header';
import FooterComponent from '../footer/footer';
import Table from "../table/table";

function App() {
    return (
        <div>
            <HeaderComponent/>
            <Table/>
            <div className="container mt-3">
                <Routes>
                    {/*<Route path="/" element={<BusList/>}/>*/}
                    {/*<Route path="/buses" element={<BusList/>} />*/}
                    {/*<Route path = "/addBus/:id" component = {CreateBusComponent}></Route>*/}
                    {/*<Route path = "/buses/:id" component = {ViewBusComponent}></Route>*/}
                    {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
                </Routes>
            </div>
            <FooterComponent/>
        </div>
    );
}

export default App;

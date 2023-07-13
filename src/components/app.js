// import { Routes, Route, Link,Switch,BrowserRouter as Router } from "react-router-dom";
import {Routes} from 'react-router-dom'

import HeaderComponent from './header';
import FooterComponent from './footer';
import Table from "./table";

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

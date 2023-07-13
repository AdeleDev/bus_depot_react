// import { Routes, Route, Link,Switch,BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom"

import HeaderComponent from './header';
import FooterComponent from './footer';
import Table from "./table";

function App() {
    return (
        <div>
            <HeaderComponent/>
            <Table/>
            <div className="container mt-3">
                {/*<Routes>*/}
                {/*        <Route exact path="/" element={<Table/>}/>*/}
                {/*        /!*<Route path="/create" element={<ProjectCreate/>}/>*!/*/}
                {/*        /!*<Route path="/edit/:id" element={<ProjectEdit/>}/>*!/*/}
                {/*        /!*<Route path="/show/:id" element={<ProjectShow/>}/>*!/*/}
                {/*</Routes>*/}
            </div>
            <FooterComponent/>
        </div>
    );
}

export default App;

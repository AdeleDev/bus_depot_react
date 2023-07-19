// import { Routes, Route, Link,Switch,BrowserRouter as Router } from "react-router-dom";
import HeaderComponent from './header';
import FooterComponent from './footer';
import Table from "./table/table";

function App() {
    return (
        <div>
            <HeaderComponent/>
            <Table/>
            <div className="container mt-3">
            </div>
            <FooterComponent/>
        </div>
    );
}

export default App;

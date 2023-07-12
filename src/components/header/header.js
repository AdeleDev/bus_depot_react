import './header.css'
import React, { Component } from 'react'
import {Link} from "react-router-dom";

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <header>
                        <nav className="app-menu">
                            <a href="/buses" className="navbar-brand">
                                <h2>Bus Depot</h2>
                            </a>
                        </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
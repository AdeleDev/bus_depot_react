import React, {Component} from 'react'
import {Toolbar} from "@mui/material";

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div>
                <header>
                    <Toolbar sx={{
                        padding: '25px', backgroundColor: '#12445e', borderRadius: '4px',
                        boxShadow: '15px 15px 30px rgba(0,0,0, .15)', color: '#fff'
                    }}>Bus Depot</Toolbar>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
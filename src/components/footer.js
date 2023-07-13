import React, {Component} from 'react'
import {Toolbar} from "@mui/material";

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        return (
            <div>
                <Toolbar className="footer">
                    <span className="text-muted">All Rights Reserved 2023 @Adele</span>
                </Toolbar>
            </div>
        )
    }
}

export default FooterComponent
import { Col, Image, Row } from "antd";
import React, { Component } from "react";

import Calc_logo from '../Images/calc-logo.png'

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            
        };
    }
   
    render() {
        return (
            <Row type="flex" align={'middle'} justify={'space-between'} >
                <Col>
                    <Image width={50} src={Calc_logo} style={{ borderRadius: '50%', boxShadow: '2px 2px 5px #ccc' }} />
                </Col>
                <Col></Col>
            </Row>
        )
    }
}

export default Navbar;

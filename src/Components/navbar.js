import { CaretDownOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Image, Row } from "antd";
import React, { Component } from "react";
import { Colors } from "../Config/colors";

import Calc_logo from '../Images/calc-logo.png'

class Navbar extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        const menuProps = {
            items: [...calculatorTypes]
        };

        return (
            <Row type="flex" align={'middle'} justify={'space-between'} >
                <Col style={{ display: 'flex' }}>
                    <Image width={50} src={Calc_logo} style={{ borderRadius: '50%', boxShadow: '2px 2px 5px #ccc', display: 'flex', alignItems: 'center', height: '100%' }} />
                </Col>
                <Col>
                    <Dropdown menu={menuProps} trigger={'click'}>
                        <Button type="text" style={{ color: Colors["light"].headerTextColor, fontWeight: 'bold', fontSize: 16, }}>Calculators<CaretDownOutlined /></Button>
                    </Dropdown>
                </Col>
            </Row>
        )
    }
}

export default Navbar;

const calculatorTypes = [
    {
        label: (
            <a href="/maths" rel="noopener noreferrer">
                Mathematics Calculator
            </a>
        ),
        link: '/maths',
        key: '1',
    },
    {
        label: (
            <a href="/bmi" rel="noopener noreferrer">
                BMI Calculator
            </a>
        ),
        link: '/bmi',
        key: '2',
    }
];
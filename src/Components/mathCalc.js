import { EnterOutlined } from "@ant-design/icons";
import { ClockCircleOutlined } from "@ant-design/icons/lib/icons";
import { Button, Col, Row } from "antd";
import { Component } from "react";
import { Colors } from "../Config/colors";


class MathCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            answer: null,
            operation: null,
            operandInput: 0,
        }
    }

    _handleBtnClick = (value, action, type) => {
        switch (action) {
            case "clear":
                return this._handleClear();
            case "plus-minus":
                return this._handlePlusMinus();
            case "divider":
                return this._handleDivide();
            case "delete":
                return this._handleDelete();
            case "multiplier":
                return this._handleMultiply();
            case "plus":
                return this._handleAdd();
            case "minus":
                return this._handleSubstract();
            case "ans":
                return this._handleGetAns();
            case null:
                return this._handleSetOperand(value);
            default:
                return null;
        }
    }
    _handleClear = () => {
        this.setState({
            operation: 0,
            operandInput: 0
        })
    }
    _handlePlusMinus = () => {
        this.setState({
            operandInput: this.state.operandInput * (-1)
        },()=> {
            let split = this.state.operation?.split(" ");
            if (split?.length > 0) {
                split[split?.length - 1] = this.state.operandInput;
                split.join(' ')
            }
    
            this.setState({
                operation: split ? split.join(' ') : this.state.operandInput
            });
        })
    }
    _handleDivide = () => {
        this.setState({
            operation: this.state.operation + " / "
        }, () => {
            this.setState({
                operandInput: 0
            })

        })
    }
    _handleDelete = () => {
        const temp = this.state.operandInput.toString().slice(0, -1) || 0
        this.setState({
            operandInput: temp
        });

    }
    _handleMultiply = () => {
        this.setState({
            operation: this.state.operation + " * "
        }, () => {
            this.setState({
                operandInput: 0
            })

        })
    }
    _handleAdd = () => {
        this.setState({
            operation: this.state.operation + " + "
        }, () => {
            this.setState({
                operandInput: 0
            })

        })
    }
    _handleSubstract = () => {
        this.setState({
            operation: this.state.operation + " - "
        }, () => {
            this.setState({
                operandInput: 0
            })

        })
    }
    _handleGetAns = () => {
        console.log(this.state.operation)
        const ans = eval(this.state.operation)
        const completeAction = this.state.operation + ` = ${ans}`;
        const tempHistory = [...this.state.history];
        tempHistory.push(completeAction);
        this.setState({
            history: tempHistory,
            answer: ans,
            operandInput: 0,
            operation: null
        }, () => {
            this._handleSetOperand(ans)
        })
    }
    _handleSetOperand = (value) => {
        const temp = this.state.operandInput === 0 ? '' + value
            : ('' + this.state.operandInput + value)
        let split = this.state.operation?.split(" ");
        console.log('tepm', temp)
        if (split?.length > 0) {
            split[split?.length - 1] = temp;
            split.join(' ')
        }

        this.setState({
            operandInput: temp,
            operation: split ? split.join(' ') : temp
        });
    }

    render() {
        const { _handleBtnClick } = this;
        const { operandInput, answer, history } = this.state;
        console.log('==========',this.state.operation)
        return (
            <Row
                style={{ height: '100%' }}
                justify={'center'}
                align={'middle'}
            >
                <Col style={{ height: 318 }} xs={20} md={12} lg={9}>
                    <Row style={{ padding: 3 }}>
                        <Col span={24} style={{ borderRadius: 5, minHeight: 80, background: '#DCDCDC' }}>
                            <Row style={{ height: '100%' }}>
                                <Col style={{ padding: 10 }} span={2}>
                                    <ClockCircleOutlined />
                                </Col>
                                <Col span={22} style={{}}>
                                    <Row align={'top'} justify={'end'} style={{ height: '50%', padding: "5px 10px" }}>
                                        {
                                            answer !== null ? (`Ans = ${answer}`) : null
                                        }
                                    </Row>
                                    <Row align={'bottom'} justify={'end'} style={{ height: '50%', padding: "5px 10px" }}>
                                        {operandInput}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify={'space-between'}>
                        {
                            keys.map((key, keyIndex) => {
                                return (
                                    <Col key={keyIndex} style={{ padding: 3 }} span={key.span}>
                                        <Button
                                            size="large"
                                            style={{
                                                width: '100%',
                                                background: Colors['light'][key.type],
                                                color: '#fff',
                                                fontWeight: 'bold'
                                            }}
                                            onClick={() => _handleBtnClick(key.value, key.action, key.type)}
                                        >
                                            {key.value}
                                        </Button>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default MathCalculator;

const keys = [
    { value: "AC", span: 6, type: 'mathsClearBtn', action: 'clear' },
    { value: "+/-", span: 6, type: 'operator', action: 'plus-minus' },
    { value: "÷", span: 6, type: 'operator', action: 'divider' },
    { value: <EnterOutlined />, span: 6, type: 'mathsDeleteBtn', action: 'delete' },

    { value: 7, span: 6, type: 'operand', action: null },
    { value: 8, span: 6, type: 'operand', action: null },
    { value: 9, span: 6, type: 'operand', action: null },
    { value: "×", span: 6, type: 'operator', action: 'multiplier' },

    { value: 4, span: 6, type: 'operand', action: null },
    { value: 5, span: 6, type: 'operand', action: null },
    { value: 6, span: 6, type: 'operand', action: null },
    { value: "+", span: 6, type: 'operator', action: 'plus' },

    { value: 3, span: 6, type: 'operand', action: null },
    { value: 2, span: 6, type: 'operand', action: null },
    { value: 1, span: 6, type: 'operand', action: null },
    { value: "-", span: 6, type: 'operator', action: 'minus' },

    { value: 0, span: 12, type: 'operand', action: null },
    { value: ".", span: 6, type: 'operand', action: null },
    { value: "=", span: 6, type: 'equalSign', action: 'ans' }
]
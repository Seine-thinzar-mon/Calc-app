import { Component } from "react";
import { Button, Col, Popover, Row, Typography } from "antd";
import { EnterOutlined } from "@ant-design/icons";
import { ClockCircleOutlined } from "@ant-design/icons/lib/icons";
import { Colors } from "../Config/colors";
const { Text } = Typography;

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

    _handleCheckInprogressOperation = (callback) => {
        let temp = this.state.operation;
        const last2Char = temp?.charAt(temp.length - 2)
        const lastChar = temp?.charAt(temp.length - 1)

        if (['+', '-', '*', '/'].includes(last2Char) && lastChar === " ") {
            var substring = temp.slice(0, -3);
            this.setState({
                operation: substring
            }, () => { return callback() })
        } else {
            return callback();
        }
    }

    _handleBtnClick = (value, action, type) => {
        if (type === 'operator' && value !== '+/-') {
            const callbackFunc = () => {
                switch (action) {
                    case "divider":
                        return this._handleDivide();
                    case "multiplier":
                        return this._handleMultiply();
                    case "plus":
                        return this._handleAdd();
                    case "minus":
                        return this._handleSubstract();
                    default:
                        return null;
                }
            }
            this._handleCheckInprogressOperation(callbackFunc)

        } else {
            switch (action) {
                case "clear":
                    return this._handleClear();
                case "plus-minus":
                    return this._handlePlusMinus();
                case "delete":
                    return this._handleDelete();
                case "ans":
                    return this._handleGetAns();
                case null:
                    return this._handleSetOperand(value);
                default:
                    return null;
            }
        }

    }
    _handleClear = () => {
        this.setState({
            operation: null,
            operandInput: 0
        })
    }
    _handlePlusMinus = () => {
        if (this.state.operandInput !== 0) {
            this.setState({
                operandInput: this.state.operandInput * (-1)
            }, () => {
                // to replace with deciaml value
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

    }
    _handleDivide = () => {
        this.setState({
            operation: (this.state.operation || 0) + " / "
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
            operation: (this.state.operation || 0) + " * "
        }, () => {
            this.setState({
                operandInput: 0
            })

        })
    }
    _handleAdd = () => {
        this.setState({
            operation: (this.state.operation || 0) + " + "
        }, () => {
            this.setState({
                operandInput: 0
            })

        })
    }
    _handleSubstract = () => {
        this.setState({
            operation: (this.state.operation || 0) + " - "
        }, () => {
            this.setState({
                operandInput: 0
            })

        })

    }
    _handleGetAns = () => {
        if (this.state.operation !== null) {
            const lastChar = this.state.operation?.charAt(this.state.operation.length - 1)
            const operation = lastChar === " " ? this.state.operation + '0' : this.state.operation
            const ans = eval(operation)
            const completeAction = operation + ` = ${ans}`;
            const tempHistory = [...this.state.history];
            tempHistory.push(completeAction);
            this.setState({
                history: tempHistory,
                answer: ans,
                operandInput: 0,
                operation: null
            }, () => {
                if (ans === 0) {
                    this.setState({
                        operandInput: 0
                    })
                } else {
                    this._handleSetOperand(ans)
                }
            })
        }
    }
    _handleSetOperand = (value) => {
        if (value === '.' && String(this.state.operandInput).includes('.')) {
            //terminate
        } else {
            const temp = (this.state.operandInput === 0 && value !== '.') ? '' + value
                : ('' + this.state.operandInput + value)

            // to replace decimal value
            let split = this.state.operation?.split(" ");
            if (split?.length > 0) {
                split[split?.length - 1] = temp;
                split.join(' ')
            }

            this.setState({
                operandInput: temp,
                operation: split ? split.join(' ') : temp
            });
        }

    }

    render() {
        const { _handleBtnClick } = this;
        const { operandInput, answer, history } = this.state;
        const historyContent = (
            <Row style={{ display: 'block', maxHeight: 200, overflow: 'auto' }}>
                {
                    history.length > 0 ?
                        (history?.map((h, i) => {
                            return (
                                <Col
                                    span={24}
                                    key={i}
                                    style={{ marginTop: '10px' }}
                                >
                                    <Text style={{ padding: 4, border: '1px solid gray', borderRadius: 5 }}>
                                        {h}
                                    </Text>
                                </Col>
                            )
                        }))
                        :
                        <Col style={{ margin: 'auto' }}>No History!</Col>
                }
            </Row>
        )
        return (
            <Row
                style={{ height: '100%' }}
                justify={'center'}
                align={'middle'}
            >
                <Col className="box-shadow" style={{ height: 338, borderRadius: 5 }} xs={20} md={12} lg={9}>
                    <Row style={{ padding: 3 }}>
                        <Col span={24} style={{ borderRadius: 5, minHeight: 80, background: '#DCDCDC' }}>
                            <Row style={{ height: '100%' }}>
                                <Col style={{ padding: 10 }} span={2}>
                                    <Popover content={historyContent} title="History" placement="bottom" trigger="click">
                                        <ClockCircleOutlined
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                        />
                                    </Popover>
                                </Col>
                                <Col span={22} style={{}}>
                                    <Row
                                        align={'top'}
                                        justify={'end'}
                                        style={{
                                            height: '50%',
                                            padding: "5px 10px",
                                            fontSize: 16,
                                            color: Colors['light'].secondaryTextColor
                                        }}
                                    >
                                        {
                                            answer !== null ? (`Ans = ${answer}`) : null
                                        }
                                    </Row>
                                    <Row
                                        align={'bottom'}
                                        justify={'end'}
                                        style={{
                                            height: '50%',
                                            padding: "5px 10px",
                                            overflow: 'hidden',
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            color: Colors['light'].textColor
                                        }}
                                    >
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
    { value: "??", span: 6, type: 'operator', action: 'divider' },
    { value: <EnterOutlined />, span: 6, type: 'mathsDeleteBtn', action: 'delete' },

    { value: 7, span: 6, type: 'operand', action: null },
    { value: 8, span: 6, type: 'operand', action: null },
    { value: 9, span: 6, type: 'operand', action: null },
    { value: "??", span: 6, type: 'operator', action: 'multiplier' },

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
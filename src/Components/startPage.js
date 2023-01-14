import { useEffect } from "react"
import { Image, Row } from "antd"
import { useNavigate } from "react-router-dom";

import Calc_logo from '../Images/calc-logo.png';
import '../App.css'

const StartPage = () => {

    const navigate = useNavigate();
    useEffect(()=>{
        function Timer() {
            document.getElementsByClassName('starting-component')[0].style.display = "none";
            navigate('/maths')
          }
        setTimeout(Timer, 2000);
    }, []);
    
    return(
        <Row className='starting-component' style={{ position: 'absolute', top: '50%', left: '50%' }}>
          <Image className='starting-img' width={70} src={Calc_logo} style={{ borderRadius: '50%', boxShadow: '2px 2px 5px #ccc' }} />
        </Row>
    )
}

export default StartPage;
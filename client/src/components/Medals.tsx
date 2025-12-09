import '../css/medals.css';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {
    Row,
    Col,
    Container} from 'react-bootstrap';
import gold from '../photos/gold.png';
import silver from '../photos/silver.png';
import bronze from '../photos/bronze.png';



const Medals = (): JSX.Element => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);

    useGSAP(() => {
        gsap.to('.medal1', {
            scrollTrigger: {
                trigger: '.containerMedals',
                start: '20% 80%',
                end: 'bottom bottom',
                toggleActions: 'restart none resume none'
            },
            x: 0,
            rotationY: 360,
            duration: 1
        });
        gsap.to('.medal2', {
            scrollTrigger: {
                trigger: '.containerMedals',
                start: '20% 80%',
                end: 'bottom bottom',
                toggleActions: 'restart none resume none'
            },
            x: 0,
            rotationY: 360,
            duration: 1.3
        });
        gsap.to('.medal3', {
            scrollTrigger: {
                trigger: '.containerMedals',
                start: '20% 80%',
                end: 'bottom bottom',
                toggleActions: 'restart none resume none'
            },
            x: 0,
            rotationY: 360,
            duration: 1.6
        });
    });

    return (
        <div className='containerMedals'>
        <Container fluid className='text-center'>
            <Row>
                <Col lg={2} md={2} xs={2}>
                </Col>
                <Col lg={2} md={2} xs={2} className='medals'>
                    <img src={gold}
                         alt='Gold Medals'
                         className='medal1'
                    />
                </Col>
                <Col lg={4} md={4} xs={4} className='medals'>
                    <img src={silver}
                         alt='Silver Medals'
                         className='medal2'
                    />
                </Col>
                <Col lg={2} md={2} xs={2} className='medals'>
                    <img src={bronze}
                         alt='Bronze Medals'
                         className='medal3'
                    />
                </Col>
                <Col lg={2} md={2} xs={2}>
                </Col>
            </Row>
        </Container>
        </div>
    )
}

export default Medals;
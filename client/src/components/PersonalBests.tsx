import {useEffect} from 'react';
import '../css/personalBests.css';
import gsap from 'gsap';

import {
    Row,
    Col,
    Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import {useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../store/store';

import circle4 from '../photos/bubble.png';
import circle1 from '../photos/blob2.png';
import Loader from '../components/Loader';



const PersonalBests = observer ( (): JSX.Element => {
    const {personal_bests} = useContext(Context);

    const parseTime = (timeStr: string): number => {
        const parts = timeStr.split(':').map(parseFloat);
            if (parts.length === 1) {
                return parts[0];
            } else if (parts.length === 2) {
                return parts[0] * 60 + parts[1];
            } else {
                return 0; 
            }
    };


    useEffect(() => {
        personal_bests.fetchBests();
    }, [personal_bests]);

    useEffect(() => {
        if (personal_bests.isLoading || personal_bests.personalBests.length === 0) return;

        const dropAnim = gsap.to('.drop', {
            rotation: -360,
            repeat: -1,
            duration: 5,
            ease: 'none',
            transformOrigin: '50% 50%',
        });

        const bgDropAnim = gsap.to('.bgDrop', {
            rotation: 360,
            repeat: -1,
            duration: 5,
            delay: 1,
            ease: 'none',
            transformOrigin: '50% 50%',
        });

        return () => {
            dropAnim.kill();
            bgDropAnim.kill();
        };
    }, [personal_bests.isLoading, personal_bests.personalBests.length]);

    if (personal_bests.isLoading) {
        return <Loader />;
    }

    
    return (
        <Container fluid className='text-center'>
            <Row className='d-flex flex-wrap'>
            {personal_bests.personalBests.slice() 
              .sort((a, b) => parseTime(a.result) - parseTime(b.result))
              .map((item) => (
                <Col key={item.id} xs={6} md={4} lg={4} className='containerDrop'>
                    <Link to='/personal-bests' style={{textDecoration: 'none'}}>
                        <div className='bgDrops'>
                        <div className='drops'>
                            <img src={circle1} 
                                 className='bgDrop' 
                                 alt='Swimming' 
                            />
                            <img src={circle4} 
                                 className='drop' 
                                 alt='Swimming' 
                            />
                            <div className='styleText' style={{marginTop: '5%'}}>
                                {item.pool_m_type}
                                <h3>
                                    {item.style_m_name}
                                    <br />
                                    {item.style_m_name2}
                                </h3>
                                <span className='styleSpan'>{item.result}</span>
                            </div>
                        </div>
                        </div>
                    </Link>
                </Col>
            ))}
            </Row>
        </Container>
    );
});

export default PersonalBests;
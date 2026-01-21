import {
    useContext, 
    useEffect, 
    useRef} from 'react';
import {
    Container, 
    Row, 
    Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import {observer} from 'mobx-react-lite';
import {Context} from '../store/store';

import circle1 from '../photos/blob2.png';
import circle4 from '../photos/bubble.png';
import gsap from 'gsap';



const HomePersonalBests = observer(() => {
    const {personal_bests} = useContext(Context);
    const animRef = useRef(null);

    useEffect(() => {
        personal_bests.fetchBests();
    }, [personal_bests]);

    useEffect(() => {
        if (personal_bests.isLoading || personal_bests.personalBests.length === 0) return;

        const el = animRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    gsap.to('.drop', {
                        rotation: -360,
                        repeat: -1,
                        duration: 5,
                        ease: 'none',
                        transformOrigin: '50% 50%',
                    });

                    gsap.to('.bgDrop', {
                        rotation: 360,
                        repeat: -1,
                        duration: 5,
                        delay: 1,
                        ease: 'none',
                        transformOrigin: '50% 50%',
                    });
                    observer.unobserve(el); 
            }},
            {
                threshold: 0.3, 
        });

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, [personal_bests.isLoading, personal_bests.personalBests.length]);


    const top4 = personal_bests.personalBests.slice(0, 4);

    return (
      <Container fluid className='text-center' ref={animRef}>
        <Row className='d-flex flex-wrap'>
        {top4.map((best) => (
          <Col lg={6} md={6} xs={6} className='containerDrop' key={best.id}>
            <Link to='/personal-bests' style={{ textDecoration: 'none' }}>
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
                    {best.pool_m_type}
                    <h3>
                      {best.style_m_name}
                      <br />
                      {best.style_m_name2}
                    </h3>
                    <span className='styleSpan'>{best.result}</span>
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

export default HomePersonalBests;

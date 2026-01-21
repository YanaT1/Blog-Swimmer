import '../css/results.css';
import {
    Row,
    Col,
    Container} from 'react-bootstrap';
import {
    useContext, 
    useRef} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../store/store';

import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

import ResultCard from '../components/result/ResultCard';
import swimmerImg from '../photos/swimmer.png';



gsap.registerPlugin(ScrollTrigger);

const HomeResults = observer((): JSX.Element => {
    const {years_results} = useContext(Context);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const sortedYears = [...(years_results?.availableYears || [])].sort((a, b) => Number(b) - Number(a));
    const lastTwoYears = sortedYears.slice(0, 2);

    useGSAP(() => {
        if (!containerRef.current) return;

        const cards = containerRef.current.querySelectorAll('.styleCards');

        cards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 40%',
                    toggleActions: 'play none none none',
                },
                y: 50,
                autoAlpha: 0, 
                duration: 0.8,
                ease: 'power2.out',
                delay: index * 0.2, 
            });
        });

        ScrollTrigger.refresh();
    }, [lastTwoYears.length]);

    return (
      <Container fluid className='homeResultsContainer' ref={containerRef}>
        <Row>
        {lastTwoYears.map((year) => (
          <Col key={year} xs={12} md={6} lg={6} className='styleCol'>
            <ResultCard image={swimmerImg}
                        link={`/results/${year}`}
                        name={`Results ${year}`}
            />
          </Col>
        ))}
        </Row>
      </Container>
  );
});

export default HomeResults;


import '../css/results.css';
import {
    Row,
    Col,
    Container} from 'react-bootstrap';
import {
    useContext, 
    useRef,
    useMemo} from 'react';
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

    const lastTwoYears = useMemo(() => {
        const years = years_results?.availableYears ? [...years_results.availableYears] : [];
        return years.sort((a, b) => Number(b) - Number(a)).slice(0, 2);
    }, [years_results?.availableYears]);

    useGSAP(() => {
        if (!containerRef.current || lastTwoYears.length === 0) return;

        const cards = containerRef.current.querySelectorAll('.styleCards');

            gsap.from(cards, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                y: 50,
                autoAlpha: 0, 
                duration: 0.8,
                ease: 'power2.out',
                stagger: 0.2,
                clearProps: 'all', 
            });
        }, { scope: containerRef, dependencies: [lastTwoYears] });

        if (lastTwoYears.length === 0) return <></>;


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


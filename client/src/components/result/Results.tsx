import '../../css/results.css';
import {
    Row,
    Col,
    Container} from 'react-bootstrap';
import {
    useContext, 
    useRef} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../../store/store';

import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

import ResultCard from './ResultCard';
import swimmerImg from '../../photos/swimmer.png';



const Results = observer((): JSX.Element => {
    const {years_results} = useContext(Context);
    const containerRef = useRef<HTMLDivElement | null>(null);

    gsap.registerPlugin(ScrollTrigger);

    const sortedYears = [...years_results.availableYears].sort((a, b) => Number(b) - Number(a));

    useGSAP(() => {
        if (!containerRef.current) return;

        const cards = containerRef.current.querySelectorAll('.styleCards');

        cards.forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out',
                delay: i * 0.1, 
            });
        });
        ScrollTrigger.refresh();
    }, [years_results.availableYears.length]);

    return (
      <Container fluid ref={containerRef}>
        <Row>
        {sortedYears.map((year: string) => (
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

export default Results;

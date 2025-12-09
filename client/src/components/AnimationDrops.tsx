import drop from '../photos/drop.png';
import gsap from 'gsap';
import {
    useEffect, 
    useRef} from 'react';
import {
    Row, 
    Col} from 'react-bootstrap';
import '../css/animationDrop.css';



const AnimationDrops = (): JSX.Element => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const drops = containerRef.current?.querySelectorAll('img.drop') || [];

        drops.forEach((drop, index) => {
            const size = 5 + Math.random() *20;
            (drop as HTMLElement).style.width = `${size}px`;
            (drop as HTMLElement).style.height = `${size}px`;
            (drop as HTMLElement).style.marginBottom = '15px';

            const startY = 500 + Math.random() * 500;
            const durationFall = 9 + Math.random() * 6;
            const repeatDelay = 2 + Math.random() * 3;
            const delay = Math.random() * 5;

            const tl = gsap.timeline({ repeat: -1, repeatDelay, delay });

      
            tl.fromTo(drop,{
                opacity: 0, 
                y: startY, 
                scale: 1
            },
            {
                opacity: 1, 
                y: 0, 
                scale: 1, 
                duration: durationFall, 
                ease: 'power1.out',
            });

            // Эффект лопания капли (увеличение и исчезновение)
            tl.to(drop, {
                scale: 1.5,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
            });

            tl.set(drop, {
                scale: 1, 
                opacity: 0, 
                y: startY 
            });
        });

    
        const bubblesCount = 20;
        for (let i = 0; i < bubblesCount; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.style.left = `${Math.random() * 100}%`;
            bubble.style.bottom = `0px`;

            const size = 5 + Math.random() * 10;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            containerRef.current?.appendChild(bubble);

            const bubbleTl = gsap.timeline({ repeat: -1, repeatDelay: 3, delay: Math.random() * 5 });
            bubbleTl.to(bubble, {
                y: -150 - Math.random() * 100,
                opacity: 0,
                duration: 4 + Math.random() * 3,
                ease: 'power1.out',
                onComplete: () => {
                    gsap.set(bubble, { y: 0, opacity: 1 });
                },
            });
        }
    }, []);

    const dropsArray = new Array(30).fill(0);

    return (
        <div className='animationDropsContainer' ref={containerRef}>
            <Row>
                <Col lg={6} className='d-flex flex-wrap justify-content-center'>
                    {dropsArray.map((_, i) => (
                        <img key={i}
                             className='drop dropImgStyle'
                             src={drop}
                             alt='Drop'
                        />
                    ))}
                </Col>
                <Col lg={6} className='d-flex flex-wrap justify-content-center'>
                    {dropsArray.map((_, i) => (
                        <img key={i}
                             className='drop dropImgStyle'
                             src={drop}
                             alt='Drop'
                        />
                    ))}
                </Col>
            </Row>
        </div>
    );
};

export default AnimationDrops;

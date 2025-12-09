import '../css/header.css';
import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {Link} from 'react-router-dom';
import mainImg from '../photos/swimmingPool.jpg';
import {AppRoutes} from '../models/AppRoutes';
import AnimationDrops from './AnimationDrops';



const Header = (): JSX.Element => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);

    useGSAP(() => {
        const animationHeader = gsap.timeline()
        
        animationHeader
        .fromTo('.styleH4',
                  {x: -100, opacity: 0,},
                  {x: 0, opacity: 1, duration: 1,},
                1,
        ).fromTo('.styleH1',
                  {y: 20, opacity: 0,},
                  {y: 0, opacity: 1, duration: 1,},
                0.4,
        ).fromTo('.styleH5',
                  {y: 20, opacity: 0, },
                  {y: 0, opacity: 1, duration: 1,},
                0.6,
        ).fromTo('.pStyle',
                  {y: 20, opacity: 0,},
                  {y: 0, opacity: 1, duration: 1,},
                0.8,
        ).fromTo('.buttonStyle2',
                  {y: 20, opacity: 0,},
                  {y: 0, opacity: 1, duration: 1,},
                1.2,
        ).fromTo('.buttonStyle1',
                  {y: 20, opacity: 0,},
                  {y: 0, opacity: 1, duration: 1,},
                1.6
        )

        gsap.to('.containerText', {
            scrollTrigger: {
                trigger: '.header',
                start: 'top top',
                scrub: true,
            },
            yPercent: -170,
            scale: 0.5,
            // xPercent: -80,
        })
        gsap.to('.mainImg', {
            scrollTrigger: {
                trigger: '.header',
                start: 'top top',
                scrub: true,
            },
            scale: 1.4,
        })
    });
    

    return(
     <div>
        <header className='header'>
            <img src={mainImg}
                 className='mainImg'
                 alt='Ivan Tryputen'
            />
            <AnimationDrops />
                    <div className='containerText'>
                        <h4 className='styleH4'>SWIMMER</h4>
                        <h1 className='styleH1'>IVAN<br />TRYPUTEN</h1>
                        <h5 className='styleH5'>POLAND<br />MKS ZNICZ KOSZALIN</h5>
                        <p className='pStyle'>Hello everyone! I'm Ivan. And I like to swim so much. This page is for my results and personal bests.
                        </p>
                        <div className='buttonGroup'>
                            <Link to={AppRoutes.Medals} 
                                  className='buttonStyle2'
                            >Medals
                            </Link>
                            <Link to={AppRoutes.PersonalBests} 
                                  className='buttonStyle1'
                            >My Bests
                            </Link>
                        </div>
                    </div>
        </header>
     </div>
    );
}

export default Header;
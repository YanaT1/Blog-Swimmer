import {
  FC,
  useRef,
} from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import gsap from 'gsap';
import '../../css/results.css';

interface ResultCardProps {
  image: string;
  link: string;
  name: string;
}

const ResultCard: FC<ResultCardProps> = ({image, link, name}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleHoverShake = (el: HTMLDivElement | null) => {
    if (!el) return;

    gsap.to(el, {
      keyframes: [
        { x: -5, duration: 0.05 },
        { x: 5, duration: 0.05 },
        { x: -4, duration: 0.05 },
        { x: 4, duration: 0.05 },
        { x: -2, duration: 0.05 },
        { x: 2, duration: 0.05 },
        { x: 0, duration: 0.05 }
      ],
      ease: 'power1.inOut'
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => handleHoverShake(cardRef.current)}
    >
      <Card className='styleCards'>
        <Link to={link} style={{ textDecoration: 'none' }}>
          <Card.Img variant='top' src={image} alt='Results' />
        </Link>

        <div className='cardBodyStyle'>
          <Link to={link} style={{textDecoration: 'none' }}>
            <Card.Body>
              <Card.Title className='titleStyle'>{name}</Card.Title>
            </Card.Body>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ResultCard;

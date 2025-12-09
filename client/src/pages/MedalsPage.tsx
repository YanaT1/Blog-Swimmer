import {useNavigate} from 'react-router-dom';
import {
    Button, 
    Container, 
    Row, 
    Col} from 'react-bootstrap';
import Medals from '../components/Medals';
import './stylePage.css';



function MedalsPage() {
    const navigate = useNavigate();

    const currentYear = new Date().getFullYear();
    const startYear = 2024;
    const endYear = currentYear; 

    const years = [];
    for (let y = startYear; y <= endYear; y++) {
        years.push(y);
    }
    years.sort((a, b) => b - a); 

    return (
    <>
        <h2 className='title'>Medals</h2>
        <Container fluid>
        <Row className='containerMargin'>
          {years.map((year) => (
            <Col key={year} xs={6} md={4} lg={4}   
              className='d-flex justify-content-center mb-4'
            >
                <Button type='button'
                        variant='outline-primary'
                        className='d-flex justify-content-center mb-4'
                        style={{width: '100%', maxWidth: 400, borderRadius: 15}}
                        onClick={() => navigate(`/medals/${year}`)}
                >
                Medals {year}
                </Button>
            </Col>
          ))}
        </Row>
        </Container>
        <div style={{ margin: '5% 5% 1% 5%' }}>
            <Medals />
        </div>
    </>
  );
}

export default MedalsPage;

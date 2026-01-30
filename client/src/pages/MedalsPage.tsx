import {
  useContext,
  useEffect,
  useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {Context} from '../store/store';
import {
    Button, 
    Container, 
    Row, 
    Col} from 'react-bootstrap';
import Medals from '../components/Medals';
import Loader from '../components/Loader';
import './stylePage.css';



const MedalsPage = observer(() => {
    const navigate = useNavigate();
    const {typeOfMedals} = useContext(Context);


    useEffect(() => {
        typeOfMedals.fetchMedals();
    }, [typeOfMedals]);

    if (typeOfMedals.isLoading) {
        return <Loader />;
    }

    const sortedYears = useMemo(() => {
        const medalsData = typeOfMedals.medals; 
        const keys = Object.keys(medalsData);
        return keys
            .map(Number)                 
            .sort((a, b) => b - a)       
            .map(String);                 
    }, [typeOfMedals.medals, typeOfMedals.availableYears]);

  
    return (
    <>
        <h2 className='title'>Medals</h2>
        <Container fluid>
        <Row className='containerMargin'>
          {sortedYears.map((year) => (
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
});

export default MedalsPage;

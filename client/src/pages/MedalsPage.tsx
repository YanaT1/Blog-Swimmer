import {
  useNavigate,
  useParams} from 'react-router-dom';
import {
  useContext,
  useMemo} from 'react';
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
    const {year} = useParams<{year: string}>();
    const {typeOfMedals} = useContext(Context);
    const yearData = typeOfMedals.getResultsByYear(year ?? '');

    if (typeOfMedals.isLoading) {
        return <Loader />;
    }

    if (!yearData || yearData.length === 0) {
        return (
            <h2
              className="text-center"
              style={{margin: '5% 0 3%', color: 'rgb(3, 51, 109, 0.6)'}}
            >
            No medals for {year}
            </h2>
        );
    }

    const sortedYearData = useMemo (() => {
        if (!yearData) return []; 
        return [...yearData].sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB.getTime() - dateA.getTime(); 
        });
    }, [yearData]);

    // const currentYear = new Date().getFullYear();
    // const startYear = 2024;
    // const endYear = currentYear; 

    // const years = [];
    // for (let y = startYear; y <= endYear; y++) {
    //     years.push(y);
    // }
    // years.sort((a, b) => b - a); 

    return (
    <>
        <h2 className='title'>Medals</h2>
        <Container fluid>
        <Row className='containerMargin'>
          {sortedYearData.map((year) => (
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

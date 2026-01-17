import {useParams} from 'react-router-dom';
import {
  useContext,
  useMemo} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../../index';
import { 
  Container, 
  Table, 
  Row, 
  Col} from 'react-bootstrap';
import {IYearsResultsStore} from '../../models/storeModels/IYearsResultsStore';
import ResultCard from './ResultCard';
import swimmerImg from '../../photos/swimmer.png';
import Loader from '../Loader';



const TableResults = observer(() => {
  const {year} = useParams();
  const {years_results} = useContext(Context);

  const yearData = years_results.getResultsByYear(year ?? '');

  if (years_results.isLoading) {
    return <Loader />;
  }

  if (!yearData || yearData.length === 0) {
    return (
      <h2
        className="text-center"
        style={{margin: '5% 0 3%', color: 'rgb(3, 51, 109, 0.6)'}}
      >
        No data for {year}
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

  const currentYear = parseInt(year ?? '0');
  const nextTwoYears = years_results.availableYears
    .map((y) => parseInt(y))
    .filter((y) => y > currentYear)
    .sort((a, b) => a - b)
    .slice(0, 2)
    .map((y) => y.toString());

  const getMedalStyle = (medal: string): string => {
    switch (medal) {
      case 'Gold':
        return 'rgba(200, 151, 16, 0.75)';
      case 'Silver':
        return 'rgba(144, 137, 137, 0.75)';
      case 'Bronze':
        return 'rgba(184, 54, 14, 0.75)';
      default:
        return 'transparent';
    }
  };

  return (
    <Container fluid>
      <h2
        className='text-center'
        style={{ margin: '5% 0 3%', color: 'rgb(3, 51, 109, 0.6)'}}
      >
        Results {year}
      </h2>

      <Table striped bordered hover responsive className='text-center'>
        <thead style={{ fontSize: '10px' }}>
          <tr>
            <th>№</th>
            <th>Date</th>
            <th>Place</th>
            <th>Pool</th>
            <th>Style</th>
            <th>Result</th>
            <th>Pts</th>
            <th>Medal</th>
          </tr>
        </thead>
        <tbody style={{fontSize: '7px'}}>
          {sortedYearData.map((res: IYearsResultsStore, index: number) => (
            <tr key={res.id}>
              <td>{index + 1}</td> 
              <td>{res.date.slice(0, 10)}</td>
              <td>{res.place}</td>
              <td>{res.pool_m_type}</td>
              <td>{res.style_m_name}</td>
              <td>{res.result}</td>
              <td>{res.pts}</td>
              <td>
                <div
                  style={{
                    backgroundColor: getMedalStyle(res.medal ?? ''),
                    borderRadius: 0,
                    padding: '4px',
                    display: 'inline-block',
                    width: '90%',
                  }}
                >
                  {res.medal || 'N/A'}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {nextTwoYears.length > 0 && (
        <Row>
          {nextTwoYears.map((nextYear: string) => (
            <Col key={nextYear} xs={12} md={6} lg={6} className='styleCol'>
              <ResultCard
                image={swimmerImg}
                link={`/results/${nextYear}`}
                name={`Results ${nextYear}`}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
});

export default TableResults;

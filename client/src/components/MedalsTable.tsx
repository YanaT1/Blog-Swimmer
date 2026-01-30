import {
    FC,
    useMemo,
    useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {Context} from '../store/store';
import {
    Container, 
    Table,
    Button,
    Row, 
    Col} from 'react-bootstrap';
import {ITypeOfMedalsStore} from '../models/storeModels/ITypeOfMedalsStore';



const getMedalStyle = (medalType: string): string => {
    switch (medalType) {
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

interface Props {
    filtered: ITypeOfMedalsStore[];
}

const MedalsTable: FC<Props> = observer(({ filtered }) => {
    const navigate = useNavigate();
    const {year} = useParams<{year: string}>();
    const {typeOfMedals} = useContext(Context);

    const sortedFiltered = useMemo (() => {
        if (!filtered) return [];
        return [...filtered].sort((a, b) => {
            const dateA = new Date(a.medal_date);
            const dateB = new Date(b.medal_date);
            return dateB.getTime() - dateA.getTime(); 
        });
    }, [filtered]);

    const neighborYears = useMemo(() => {
        const currentYear = parseInt(year || '0', 10);
        const years = typeOfMedals.availableYears;
        return years
        .map(Number)
        .filter((y) => y !== currentYear)
        .sort((a, b) => Math.abs(currentYear - a) - Math.abs(currentYear - b))
        .slice(0, 2)
        .sort((a, b) => a - b)
        .map(String);
  }, [typeOfMedals.availableYears, year]);


    return (
        <Container fluid>
            <Table striped bordered hover responsive>
                <thead style={{ fontSize: '10px', textAlign: 'center' }}>
                    <tr>
                        <th>№</th> 
                        <th>Medal</th>
                        <th>Date</th>
                        <th>Place</th>
                        <th>Pool</th>
                        <th>Style</th>
                        <th>Result</th>
                        <th>Pts</th>
                    </tr>
                </thead>
                <tbody style={{ fontSize: '7px', textAlign: 'center', verticalAlign: 'middle' }}>
                    {sortedFiltered.map((medal, index: number) => (
                        <tr key={medal.id}>
                            <td>{index + 1}</td>
                            <td>
                                <div
                                    style={{
                                        backgroundColor: getMedalStyle(medal.medalType),
                                        borderRadius: 0,
                                        padding: '4px',
                                        display: 'inline-block',
                                        width: '90%',
                                    }}
                                >
                                    {medal.medalType || 'N/A'}
                                </div>
                            </td>
                            <td>{medal.medal_date}</td>
                            <td>{medal.place}</td>
                            <td>{medal.pool}</td>
                            <td>{medal.style}</td>
                            <td>{medal.result}</td>
                            <td>{medal.pts}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {neighborYears.length > 0 && (
                <Row>
                    {neighborYears.map((nextYear: string) => (
                        <Col key={nextYear} xs={12} md={6} lg={6} className='styleCol'>
                            <Button type='button'
                                variant='outline-primary'
                                className='d-flex justify-content-center mb-4'
                                style={{width: '100%', maxWidth: 400, borderRadius: 15}}
                                onClick={() => navigate(`/medals/${nextYear}`)}
                            >
                            Medals {nextYear}
                            </Button>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
});

export default MedalsTable;

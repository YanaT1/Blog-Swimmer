import {useContext, 
    useEffect, 
    useState, 
    useMemo} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../../store/store';
import {
    Button, 
    Container, 
    Spinner, 
    Card, 
    Row, 
    Col, 
    Form, 
    Pagination
} from 'react-bootstrap';

import CreateResultsYears from '../modals/CreateResultsYears';
import {IYearsResultsStore} from '../../models/storeModels/IYearsResultsStore';
import '../../pages/stylePage.css';



const AdminResultsPanel = observer(() => {
    const {years_results} = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [editResult, setEditResult] = useState<IYearsResultsStore | null>(null);

    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10; //шт на странице
    

    useEffect(() => {
        if (!years_results.isLoaded) {
            years_results.fetchResults();
        }
    }, [years_results.isLoaded]);

    const years = years_results.availableYears.slice().sort((a, b) => Number(b) - Number(a));
    const allResults = years_results.allResults;

    const filteredResults = useMemo(() => {
        if (selectedYear === 'all') return allResults;
        return allResults.filter(result => result.date.startsWith(selectedYear));
    }, [selectedYear, allResults]);

    const start = (currentPage - 1) * itemsPerPage;
    const paginatedResults = filteredResults.slice(start, start + itemsPerPage);

    const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

    const handleEdit = (result: IYearsResultsStore) => {
        setEditResult(result);
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditResult(null);
        setShowModal(true);
    };

    const handleClose = async () => {
        await years_results.fetchResults();
        setEditResult(null);
        setShowModal(false);
    };

    
    return (
      <>
        <div className='title'></div>
        <div className='containerMargin'>
        <Container className='mt-5' style={{display: 'flex', flexDirection: 'column'}}>
            <div className='text-center mb-4' style={{color: 'rgb(3, 51, 109, 0.6)'}}>
                <h4>Panel administratora</h4>
                <br />
                <h2>Wyniki</h2>
                <Button
                    variant='success'
                    className='modalButton'
                    style={{margin: '4%'}}
                    onClick={handleAdd}
                >
                    Dodaj nowy wynik
                </Button>
            </div>

            <div className='text-center mb-4'>
                <Form.Select
                    value={selectedYear}
                    onChange={(e) => {
                        setSelectedYear(e.target.value);
                        setCurrentPage(1);
                    }}
                    className='selectYear'
                >
                    <option value='all'>Wszystkie lata</option>
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </Form.Select>
            </div>

            {years_results.isLoading ? (
                <Spinner animation='border' />
            ) : (
                <>
                    {filteredResults.length === 0 ? (
                        <p className='text-center'>Brak wyników.</p>
                    ) : (
                        <>
                            <Row xs={1} md={2} className='g-4'>
                                {paginatedResults.map(result => (
                                    <Col key={result.id}>
                                        <Card className='shadow-sm'>
                                            <Card.Body>
                                                <Card.Title style={{color: 'rgb(3, 51, 109)'}}>
                                                    Wynik #{result.id}
                                                </Card.Title>
                                                <Card.Text>
                                                    {/* <strong>Numer:</strong> {result.numer} <br /> */}
                                                    <strong>Data:</strong> {result.date.slice(0, 10)} <br />
                                                    <strong>Miejsce:</strong> {result.place} <br />
                                                    <strong>Basen:</strong> {result.pool_m_type} <br />
                                                    <strong>Styl:</strong> {result.style_m_name} <br />
                                                    <strong>Wynik:</strong> {result.result} <br />
                                                    <strong>Punkty:</strong> {result.pts} <br />
                                                    <strong>Medal:</strong> {result.medal ?? '-'}
                                                </Card.Text>
                                                <div className='d-flex justify-content-end gap-2'>
                                                    <Button variant='outline-primary' size='sm' onClick={() => handleEdit(result)}>Edytuj</Button>
                                                    <Button variant='outline-danger' size='sm' onClick={async () => {
                                                        const confirmed = window.confirm('Czy na pewno chcesz usunąć ten wynik?');
                                                        if (!confirmed) return;
                                                        try {
                                                            await years_results.deleteResult(result.id);
                                                            alert('Wynik został usunięty!');
                                                        } catch (e) {
                                                            console.error('Błąd:', e);
                                                            alert('Nie udało się usunąć wyniku.');
                                                        }
                                                    }}>Usuń</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>


                            {totalPages > 1 && (
                                <Pagination className='justify-content-center mt-4'>
                                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                                    <Pagination.Prev onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} />
                                    {[...Array(totalPages)].map((_, idx) => (
                                        <Pagination.Item
                                            key={idx + 1}
                                            active={currentPage === idx + 1}
                                            onClick={() => setCurrentPage(idx + 1)}
                                        >
                                            {idx + 1}
                                        </Pagination.Item>
                                    ))}
                                    <Pagination.Next onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} />
                                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
                                </Pagination>
                            )}
                        </>
                    )}
                </>
            )}
            
            <CreateResultsYears show={showModal} onHide={handleClose} editResult={editResult ?? undefined} />
        </Container>
        </div>
      </>
    );
});

export default AdminResultsPanel;

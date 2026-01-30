import {
    useContext,
    useEffect,
    useState,
    useMemo
} from 'react';
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

import {ITypeOfMedalsStore} from '../../models/storeModels/ITypeOfMedalsStore';
import CreateMedals from '../modals/CreateMedals';
import '../../pages/stylePage.css';



const AdminMedalsPanel = observer(() => {
    const {typeOfMedals} = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [editMedal, setEditMedal] = useState<ITypeOfMedalsStore | null>(null);

    const [selectedYear, setSelectedYear] = useState<string>('all'); 
    const [currentPage, setCurrentPage] = useState<number>(1); 
    const itemsPerPage = 10; // медалей на странице

    useEffect(() => {
        typeOfMedals.fetchMedals();
     }, []);

    const handleEdit = (medal: ITypeOfMedalsStore) => {
        setEditMedal(medal);
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditMedal(null);
        setShowModal(true);
    };

    const handleClose = async () => {
        await typeOfMedals.fetchMedals();
        setEditMedal(null);
        setShowModal(false);
    };

  
    const years = useMemo(() => {
        const uniqueYears = new Set<string>();
        typeOfMedals.allMedals.forEach(medal => {
            if (medal.medal_date) {
                const year = medal.medal_date.slice(0, 4);
                uniqueYears.add(year);
            }
        });
        return Array.from(uniqueYears).sort((a, b) => Number(b) - Number(a)); 
    }, [typeOfMedals.medals]);

    const filteredMedals = useMemo(() => {
        if (selectedYear === 'all') {
            return typeOfMedals.medals;
        }
        return typeOfMedals.medals.filter(medal => medal.medal_date.startsWith(selectedYear));
    }, [selectedYear, typeOfMedals.medals]);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMedals = filteredMedals.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(filteredMedals.length / itemsPerPage);


    return (
      <>
        <div className='title'></div>
        <div className='containerMargin'>
        <Container className='mt-5'
                   style={{display: 'flex', flexDirection: 'column'}}
        >
            <div className='text-center mb-4'
                 style={{color: 'rgb(3, 51, 109, 0.6)'}}
            >
                <h4>Panel administratora</h4>
                <br />
                <h2>Medale</h2>
                <Button variant='success'
                        className='modalButton'
                        style={{margin: '4%'}}
                        onClick={handleAdd}
                >Dodaj nowy medal
                </Button>
            </div>
            <div className='text-center mb-4'>
                <Form.Select value={selectedYear}
                    onChange={e => {setSelectedYear(e.target.value);
                        setCurrentPage(1);}}
                    className='selectYear'
                >
                     <option value='all'>Wszystkie lata</option>
                      {years.map(year => (
                          <option key={year} value={year}>
                              {year}
                          </option>
                      ))}
                </Form.Select>
            </div>

            {typeOfMedals.isLoading ? (
                <Spinner animation='border' />
            ) : (
                <>
                    {filteredMedals.length === 0 ? (
                        <p className='text-center'>Brak medali.</p>
                    ) : (
                        <>
                            <Row xs={1} md={2} className='g-4'>
                               {paginatedMedals.map(medal => (
                                   <Col key={medal.id}>
                                       <Card className='shadow-sm'>
                                           <Card.Body>
                                              <Card.Title style={{color: 'rgb(3, 51, 109)'}}>
                                                  Medal #{medal.id}
                                              </Card.Title>
                                              <Card.Text>
                                                  <strong>Numer:</strong> {medal.numer} <br />
                                                  <strong>Typ medalu:</strong> {medal.medalType} <br />
                                                  <strong>Data:</strong> {medal.medal_date.slice(0, 10)} <br />
                                                  <strong>Miejsce:</strong> {medal.place} <br />
                                                  <strong>Basen:</strong> {medal.pool} <br />
                                                  <strong>Styl:</strong> {medal.style} <br />
                                                  <strong>Wynik:</strong> {medal.result} <br />
                                                  <strong>Punkty:</strong> {medal.pts}
                                              </Card.Text>
                                              <div className='d-flex justify-content-end gap-2'>
                                                    <Button variant='outline-primary' size='sm'
                                                       onClick={() => handleEdit(medal)}
                                                    >Edytuj
                                                    </Button>
                                                    <Button variant='outline-danger' size='sm'
                                                        onClick={async () => {
                                                            const confirmed = window.confirm('Czy na pewno chcesz usunąć tą medal?');
                                                            if (!confirmed) return;
                                                            try {
                                                                await typeOfMedals.deleteMedal(medal.id);
                                                                alert('Medal został usunięty!');
                                                            } catch (e) {
                                                                console.error('Błąd podczas usuwania medalu:', e);
                                                                alert('Błąd podczas usuwania medalu.');
                                                            }
                                                        }}
                                                    >Usuń
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>

                            {/* Пагинация */}
                            {totalPages > 1 && (
                                <Pagination className='justify-content-center mt-4'>
                                    <Pagination.First
                                        onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}
                                    />
                                <Pagination.Prev
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                />
                                {[...Array(totalPages)].map((_, idx) => (
                                    <Pagination.Item
                                        key={idx + 1}
                                        active={currentPage === idx + 1}
                                        onClick={() => setCurrentPage(idx + 1)}
                                    >{idx + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                />
                                <Pagination.Last
                                    onClick={() => setCurrentPage(totalPages)}
                                    disabled={currentPage === totalPages}
                                />
                                </Pagination>
                            )}
                        </>
                    )}
                </>
            )}
            
          <CreateMedals show={showModal} onHide={handleClose} editMedal={editMedal ?? undefined} />
        </Container>
        </div>
      </>
    );
});

export default AdminMedalsPanel;

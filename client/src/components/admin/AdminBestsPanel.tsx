import {
    useContext,
    useEffect,
    useState} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../../store/store';

import {
    Button, 
    Container, 
    Spinner, 
    Card, 
    Row, 
    Col} from 'react-bootstrap';
import {IBestsStore} from '../../models/storeModels/IBestsStore';
import CreateBests from '../modals/CreateBests';
import '../../pages/stylePage.css';



const AdminBestsPanel = observer(() => {
    const {personal_bests} = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [editBest, setEditBest] = useState<IBestsStore | null>(null);

    useEffect(() => {
        personal_bests.fetchBests();
    }, []);

    const handleEdit = (best: IBestsStore) => {
        setEditBest(best);
        setShowModal(true);
    };

    const handleAdd = () => {
        setEditBest(null);
        setShowModal(true);
    };

    const handleClose = () => {
        setEditBest(null);
        setShowModal(false);
    };


    return (
      <>
        <div className='title'></div>
        <div className='containerMargin'>
        <Container className='mt-5' style={{display:'flex', flexDirection:'column'}}>
            <div className='text-center mb-4'
                 style={{color:'rgb(3, 51, 109, 0.6)'}}>
                <h4>Panel administratora</h4>
                <br /> 
                <h2>My personal bests</h2>
                <Button variant='success' 
                        className='modalButton' 
                        style={{margin:'4%'}}
                        onClick={handleAdd}>Dodaj nowy rekord
                </Button>
            </div>
            
            {personal_bests.isLoading ? (
                <Spinner animation='border' />
            ) : (
                <>
                    {personal_bests.personalBests.length === 0 ? (
                        <p className='text-center'>Brak rekordów.</p>
                    ) : (
                        <Row xs={1} md={2} className='g-4'>
                            {personal_bests.personalBests.map((best) => (
                                <Col key={best.id}>
                                    <Card className='shadow-sm'>
                                        <Card.Body>
                                            <Card.Title style={{color:'rgb(3, 51, 109)'}}>Best #{best.id}</Card.Title>
                                                <Card.Text>
                                                    <strong>Basen:</strong> {best.pool_m_type}<br />
                                                    <strong>Dystans:</strong> {best.style_m_name}<br />
                                                    <strong>Styl:</strong> {best.style_m_name2}<br />
                                                    <strong>Rezultat:</strong> {best.result}
                                                </Card.Text>
                                                <div className='d-flex justify-content-end gap-2'>
                                                    <Button variant='outline-primary' 
                                                            size='sm' 
                                                            onClick={() => handleEdit(best)}
                                                    >Edytuj
                                                    </Button>
                                                    <Button variant='outline-danger'
                                                            size='sm'
                                                            onClick={async () => {
                                                                const confirmed = window.confirm('Czy na pewno chcesz usunąć ten rekord?');
                                                                if (!confirmed) return;
                                                                try {
                                                                    await personal_bests.deleteBest(best.id);
                                                                    alert('Rekord został usunięty!');
                                                                } catch (e) {
                                                                    console.error('Błąd podczas usuwania rekordu:', e);
                                                                    alert('Błąd podczas usuwania rekordu.');
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
                    )}
                </>
            )}

            <CreateBests show={showModal}
                         onHide={handleClose}
                         editBest={editBest ?? undefined}
            />
        </Container>
        </div>
      </>
    );
});

export default AdminBestsPanel;

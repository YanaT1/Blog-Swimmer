import {
    FC,
    useContext,
    useState,
    useEffect} from 'react';
import {
    Button, 
    Modal,
    ModalProps,
    Form,
    Dropdown} from 'react-bootstrap';
import '../../css/modals.css';
import {
    Context,
    State} from '../../index';
import {IPoolMstore} from '../../models/storeModels/IPoolMstore';
import {IStyleMstore} from '../../models/storeModels/IStyleMstore';
import {IYearsResultsStore} from '../../models/storeModels/IYearsResultsStore';



interface CreateResultsYearsProps extends ModalProps {
    editResult?: IYearsResultsStore;
} 

const CreateResultsYears: FC<CreateResultsYearsProps> = ({editResult, ...props}) => {
    const {pool_m, style_m, years_results} = useContext(Context) as State;

    const [numer, setNumer] = useState<number | ''>('');
    const [date, setDate] = useState<string>('');
    const [place, setPlace] = useState<string>('');
    const [selectedPool_m_type, setSelectedPool_m_type] = useState<string>('Wybierz basen');
    const [selectedStyle_m_name, setSelectedStyl_m_name] = useState<string>('Wybierz styl');
    const [result, setResult] = useState<string>('');
    const [pts, setPts] = useState<number | ''>('');
    const [selectedMedal, setSelectedMedal] = useState<string>('Wybierz medal');

    useEffect(() => {
    if (editResult) {
        setNumer(editResult.numer ?? '');
        setDate(editResult.date ? editResult.date.slice(0, 10) : '');
        setPlace(editResult.place ?? '');
        setSelectedPool_m_type(editResult.pool_m_type ?? 'Wybierz basen');
        setSelectedStyl_m_name(editResult.style_m_name ?? 'Wybierz styl');
        setResult(editResult.result ?? '');
        setPts(editResult.pts ?? '');
        setSelectedMedal(editResult.medal ?? '');
    } else if (!props.show) {
        setNumer('');
        setDate('');
        setPlace('');
        setSelectedPool_m_type('Wybierz basen');
        setSelectedStyl_m_name('Wybierz styl');
        setResult('');
        setPts('');
        setSelectedMedal('Wybierz medal');
    }}, [props.show, editResult]);

    const validateResultForm = (): boolean => {
        if (numer === '' || numer === null) {
            alert('Proszę podać numer');
            return false;
        }
        if (!date.trim()) {
            alert('Proszę podać datę otrzymania wyniku');
            return false;
        }
        if (!place.trim()) {
            alert('Proszę uzupełnić pole miejscowości');
            return false;
        }
        if (!selectedPool_m_type || selectedPool_m_type === 'Wybierz basen') {
            alert('Proszę wybrać basen');
            return false;
        }
        if (!selectedStyle_m_name || selectedStyle_m_name === 'Wybierz styl') {
            alert('Proszę wybrać styl');
            return false;
        }
        if (typeof result !== 'string' || result.trim() === '' || !/^[0-9.,:]+$/.test(result.trim())) {
            alert('Proszę wpisać poprawny rezultat (cyfry, kropki, przecinki lub dwukropek)');
            return false;
        }
        if (pts === '' || pts === null) {
            alert('Proszę wpisać liczbę punktów');
            return false;
        }
        if (!selectedMedal || !['Gold', 'Silver', 'Bronze', 'Cup', 'Certificate', '-'].includes(selectedMedal)) {
            alert('Proszę wybrać typ medalu');
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        if (!validateResultForm()) return;

        const resultData = {
            numer: Number(numer), 
            date: date.trim(),
            place: place.trim(),
            pool_m_type: selectedPool_m_type,
            style_m_name: selectedStyle_m_name,
            result: result.trim(),
            pts: Number(pts), 
            medal: selectedMedal,
        };

        try {
            if (editResult) {
                await years_results.updateResult(editResult.id, resultData);
                alert('Wynik został zaktualizowany!');
            } else {
                await years_results.addResult(resultData);
                alert('Wynik został dodany!');
            }
            props.onHide?.();
        } catch (error) {
            console.error('Błąd podczas zapisywania wyniku:', error);
            alert('Coś poszło nie tak. Spróbuj ponownie.');
        }
    };

    const handleDelete = async () => {
        if (!editResult) return;
        if (!window.confirm('Czy na pewno chcesz usunąć ten wynik?')) return;

        try {
            await years_results.deleteResult(editResult.id);
            alert('Wynik został usunięty!');
            props.onHide?.();
        } catch (error) {
            console.error('Błąd podczas usuwania wyniku:', error);
            alert('Coś poszło nie tak. Spróbuj ponownie.');
        }
    };


    return (
        <Modal {...props}
               size='lg'
               aria-labelledby='Dodać Results Year'centered
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'
                    className='titleStyle'
                >{editResult ? 'Edytuj Wynik' : 'Dodaj Wynik'}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Control type='number'
                        placeholder='Wpisz numer'
                        className='formStyle'
                        value={numer}
                        onChange={(e) => setNumer(e.target.value === '' ? '' : Number(e.target.value))}
                    />

                    <Form.Control type='date'
                        className='formStyle'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <Form.Control type='text'
                        placeholder='Wpisz miejsce'
                        className='formStyle'
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                    />

                   <Dropdown>
                        <Dropdown.Toggle variant='outline-primary' 
                                    id='dropdown-basic' 
                                    className='dropdownStyle'
                        >{selectedPool_m_type}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {pool_m._pools.map((pool: IPoolMstore) => 
                                <Dropdown.Item className='dropdownItem' 
                                               key={pool.id}
                                               onClick={() => setSelectedPool_m_type(pool.typePool)}
                                >{pool.typePool}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant='outline-primary' 
                                   id='dropdown-basic' 
                                    className='dropdownStyle'
                        >{selectedStyle_m_name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {style_m._styles.map((style: IStyleMstore) => 
                                <Dropdown.Item className='dropdownItem' 
                                               key={style.id}
                                               onClick={() => setSelectedStyl_m_name(style.name)}
                                >{style.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control type='number'
                        placeholder='Wpisz wynik (przykład: 36.36)'
                        className='formStyle'
                        value={result}
                        onChange={(e) => setResult(e.target.value)}
                    />

                    <Form.Control type='number'
                        placeholder='Wpisz punkty Fina'
                        className='formStyle'
                        value={pts}
                        onChange={(e) => setPts(e.target.value === '' ? '' : Number(e.target.value))}
                    />

                    <Dropdown>
                        <Dropdown.Toggle variant='outline-primary' 
                                   id='dropdown-basic' 
                                   className='dropdownStyle'
                        >{selectedMedal}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {['Gold', 'Silver', 'Bronze', 'Cup', 'Certificate', '-'].map((type) => (
                                <Dropdown.Item key={type} 
                                   className='dropdownItem' 
                                   onClick={() => setSelectedMedal(type)}
                                >{type}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                {editResult && (
                    <Button variant='danger' 
                            onClick={handleDelete} 
                            className='modalButton'
                    >Usuń
                    </Button>
                )}
                <Button onClick={handleSave} 
                        className='modalButton'
                >{editResult ? 'Zapisz zmiany' : 'Dodaj'}
                </Button>
                <Button onClick={props.onHide} 
                        className='modalButton'
                >Zamknij
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateResultsYears;
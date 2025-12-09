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
import {ITypeOfMedalsStore} from '../../models/storeModels/ITypeOfMedalsStore';



interface CreateMedalsProps extends ModalProps {
    editMedal?: ITypeOfMedalsStore;
}

const CreateMedals: FC<CreateMedalsProps> = ({ editMedal, ...props }) => {
    const {pool_m, style_m, typeOfMedals} = useContext(Context) as State;

    const [numer, setNumer] = useState<number | ''>('');
    const [medalType, setMedalType] = useState<string>('Wybierz medal');
    const [medal_date, setMedal_date] = useState<string>('');
    const [place, setPlace] = useState<string>('');
    const [selectedPool, setSelectedPool] = useState<string>('Wybierz basen');
    const [selectedStyl, setSelectedStyl] = useState<string>('Wybierz styl');
    const [result, setResult] = useState<string>('');
    const [pts, setPts] = useState<number | ''>('');

    useEffect(() => {
    if (editMedal) {
        setNumer(editMedal.numer ?? '');
        setMedalType(editMedal.medalType ?? 'Wybierz medal');
        setMedal_date(editMedal.medal_date ?? '');
        setPlace(editMedal.place ?? '');
        setSelectedPool(editMedal.pool ?? 'Wybierz basen');
        setSelectedStyl(editMedal.style ?? 'Wybierz styl');
        setResult(editMedal.result ?? '');
        setPts(editMedal.pts ?? '');
    } else if (!props.show) {
        setNumer('');
        setMedalType('Wybierz medal');
        setMedal_date('');
        setPlace('');
        setSelectedPool('Wybierz basen');
        setSelectedStyl('Wybierz styl');
        setResult('');
        setPts('');
    }}, [props.show, editMedal]);

    const validateMedalForm = (): boolean => {
        if (numer === '' || numer === null) {
            alert('Proszę podać numer');
            return false;
        }
        if (!medalType || !['Gold', 'Silver', 'Bronze', 'Cup', 'Certificate'].includes(medalType)) {
            alert('Proszę wybrać typ medalu');
            return false;
        }
        if (!medal_date.trim()) {
            alert('Proszę podać datę otrzymania medalu');
            return false;
        }
        if (!place.trim()) {
            alert('Proszę uzupełnić pole miejscowości');
            return false;
        }
        if (!selectedPool || selectedPool === 'Wybierz basen') {
            alert('Proszę wybrać basen');
            return false;
        }
        if (!selectedStyl || selectedStyl === 'Wybierz styl') {
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
        return true;
    };

    const handleSave = async () => {
        if (!validateMedalForm()) return;

        const medalData = {
            numer: Number(numer), 
            medalType,
            medal_date: medal_date.trim(),
            place: place.trim(),
            pool: selectedPool,
            style: selectedStyl,
            result: result.trim(),
            pts: Number(pts), 
        };

        try {
            if (editMedal) {
                await typeOfMedals.updateMedal(editMedal.id, medalData);
                alert('Medal został zaktualizowany!');
            } else {
                await typeOfMedals.addMedal(medalData);
                alert('Medal został dodany!');
            }
            props.onHide?.();
        } catch (error) {
            console.error('Błąd podczas zapisywania medalu:', error);
            alert('Coś poszło nie tak. Spróbuj ponownie.');
        }
    };

    const handleDelete = async () => {
        if (!editMedal) return;
        if (!window.confirm('Czy na pewno chcesz usunąć tą medal?')) return;

        try {
            await typeOfMedals.deleteMedal(editMedal.id);
            alert('Medal został usunięty!');
            props.onHide?.();
        } catch (error) {
            console.error('Błąd podczas usuwania medalu:', error);
            alert('Coś poszło nie tak. Spróbuj ponownie.');
        }
    };


    return (
        <Modal {...props} size='lg' 
               aria-labelledby='Dodać Medal' centered
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title' className='titleStyle'>
                    {editMedal ? 'Edytuj Medal' : 'Dodaj Medal'}
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

                    <Dropdown>
                        <Dropdown.Toggle variant='outline-primary' id='dropdown-medalType' className='dropdownStyle'>
                            {medalType}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {['Gold', 'Silver', 'Bronze', 'Cup', 'Certificate'].map((type) => (
                                <Dropdown.Item key={type} 
                                   className='dropdownItem' 
                                   onClick={() => setMedalType(type)}
                                >{type}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control type='date'
                       className='formStyle'  
                       value={medal_date}
                       onChange={(e) => setMedal_date(e.target.value)}
                    />

                    <Form.Control type='text'
                       placeholder='Wpisz miejsce'
                       className='formStyle'
                       value={place}
                       onChange={(e) => setPlace(e.target.value)}
                    />

                    <Dropdown>
                        <Dropdown.Toggle variant='outline-primary' id='dropdown-pool' className='dropdownStyle'>
                            {selectedPool}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {pool_m._pools.map((pool: IPoolMstore) => (
                                <Dropdown.Item key={pool.id}
                                   className='dropdownItem'
                                   onClick={() => setSelectedPool(pool.typePool)}
                                >{pool.typePool}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant='outline-primary' id='dropdown-style' className='dropdownStyle'>
                            {selectedStyl}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {style_m._styles.map((style: IStyleMstore) => (
                                <Dropdown.Item key={style.id}
                                   className='dropdownItem'
                                   onClick={() => setSelectedStyl(style.name)}
                                >{style.name}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control type='text'
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
                </Form>
            </Modal.Body>

            <Modal.Footer>
                {editMedal && (
                    <Button variant='danger' 
                            onClick={handleDelete} 
                            className='modalButton'
                    >Usuń
                    </Button>
                )}
                <Button onClick={handleSave} 
                        className='modalButton'
                >{editMedal ? 'Zapisz zmiany' : 'Dodaj'}
                </Button>
                <Button onClick={props.onHide} 
                        className='modalButton'
                >Zamknij
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateMedals;

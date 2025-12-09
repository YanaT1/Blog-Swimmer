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



interface CreateBestsProps extends ModalProps {
    editBest?: {
        id: number;
        pool_m_type: string;
        style_m_name: string;
        style_m_name2: string;
        result: string;
    };
}

const CreateBests: FC<CreateBestsProps> = ({editBest, ...props}) => {
    const {pool_m, personal_bests} = useContext(Context) as State;

    const [selectedPool, setSelectedPool] = useState<string>('Wybierz basen');
    const [style_m_name, setStyleMname] = useState<string>('');
    const [style_m_name2, setStyleMname2] = useState<string>('');
    const [result, setResult] = useState<string>('');


    useEffect(() => {
    if (editBest) {
        setSelectedPool(editBest.pool_m_type ?? 'Wybierz basen');
        setStyleMname(editBest.style_m_name ?? '');
        setStyleMname2(editBest.style_m_name2 ?? '');
        setResult(editBest.result ?? '');
    } else if (!props.show) {
        setSelectedPool('Wybierz basen');
        setStyleMname('');
        setStyleMname2('');
        setResult('');
    }}, [props.show, editBest]);

    const validateForm = () => {
          if (!selectedPool || selectedPool === 'Wybierz basen') {
              alert('Proszę wybrać basen');
              return false;
          }
          if (!style_m_name.trim()) {
              alert('Proszę uzupełnić pole dystansu');
              return false;
          }
          if (!style_m_name2.trim()) {
              alert('Proszę uzupełnić pole stylu');
              return false;
          }
          if (
              typeof result !== 'string' || 
              result.trim() === '' ||
              !/^[0-9.,:]+$/.test(result.trim())
            ) {
                alert('Proszę uzupełnić pole z rezultatem poprawną wartością (tylko cyfry, kropki, przecinki lub dwukropek)');
                return false;
          }

        return true;
    };


    const handleSave = async () => {
        if (!validateForm()) return;

        const bestData = {
            pool_m_type: selectedPool,
            style_m_name: style_m_name.trim(),
            style_m_name2: style_m_name2.trim(),
            result: result.trim(), 
        };

        try {
            if (editBest) {
                await personal_bests.updateBest(editBest.id, bestData);
                alert('Best został zaktualizowany!');
            } else {
                await personal_bests.addBest(bestData);
                alert('Best został dodany!');
            }
            props.onHide?.();
        } catch (error) {
            console.error('Błąd podczas zapisywania Best:', error);
            alert('Coś poszło nie tak. Spróbuj ponownie.');
        }
    };


    const handleDelete = async () => {
        if (!editBest) return;
        if (!window.confirm('Czy na pewno chcesz usunąć ten Best?')) return;

        try {
            await personal_bests.deleteBest(editBest.id);
            alert('Best został usunięty!');
            props.onHide?.();
        } catch (error) {
            console.error('Błąd podczas usuwania Best:', error);
            alert('Coś poszło nie tak. Spróbuj ponownie.');
        }
    };


    return (
        <>
            <Modal {...props} 
                   size='lg' 
                   aria-labelledby='modal-bests' 
                   centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id='contained-modal-title-bests' className='titleStyle'>
                        {editBest ? 'Edytuj Best' : 'Dodaj Best'}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Dropdown>
                            <Dropdown.Toggle variant='outline-primary' id='dropdown-basic' className='dropdownStyle'>
                                {selectedPool}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {pool_m._pools.map((pool: IPoolMstore) => (
                                <Dropdown.Item className='dropdownItem'
                                               key={pool.id}
                                               onClick={() => setSelectedPool(pool.typePool)}
                                >
                                    {pool.typePool}
                                </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>

                        <Form.Control type='text'
                              placeholder='Wpisz ile metrów przepłynąłeś (np. 50m)'
                              className='formStyle mt-3'
                              value={style_m_name}
                              onChange={(e) => setStyleMname(e.target.value)}
                        /> 
                        
                        <Form.Control type='text'
                              placeholder='Wpisz w jakim stylu przepłynąłeś'
                              className='formStyle mt-3'
                              value={style_m_name2}
                              onChange={(e) => setStyleMname2(e.target.value)}
                        />
          
                        <Form.Control type='text' 
                              placeholder='Wpisz wynik (np. 36.36 lub 00:36.36)'
                              className='formStyle mt-3'
                              value={result}
                              onChange={(e) => setResult(e.target.value)}
                        />
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    {editBest && (
                        <Button variant='danger' onClick={handleDelete} className='modalButton'>
                            Usuń
                        </Button>
                    )}
                    <Button onClick={handleSave} className='modalButton'>
                        {editBest ? 'Zapisz zmiany' : 'Dodaj'}
                    </Button>
                    <Button onClick={props.onHide} className='modalButton'>
                        Zamknij
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default CreateBests;

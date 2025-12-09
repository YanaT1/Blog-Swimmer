import {FC} from 'react';
import {
    Container, 
    Table} from 'react-bootstrap';
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

const MedalsTable: FC<Props> = ({ filtered }) => {
    const sortedFiltered = [...filtered].sort((a, b) => {
        const dateA = new Date(a.medal_date);
        const dateB = new Date(b.medal_date);
        return dateB.getTime() - dateA.getTime(); 
    });

    sortedFiltered.forEach((medal, index) => {
        medal.numer = index + 1; 
    });

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
                    {sortedFiltered.map((medal) => (
                        <tr key={medal.id}>
                            <td>{medal.numer}</td>
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
        </Container>
    );
};

export default MedalsTable;

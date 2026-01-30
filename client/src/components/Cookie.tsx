import { 
    useState, 
    useEffect} from 'react';
import { 
    Button, 
    Container} from 'react-bootstrap';



const Cookie = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_accepted');
        if (!consent) {
            setShow(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_accepted', 'true');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '25px',
            left: '0',
            right: '0',
            zIndex: 9999,
            padding: '0 15px'
        }}>
            <Container style={{
                background: 'linear-gradient(135deg, rgba(0, 102, 205, 0.9) 50%, rgba(3, 52, 110, 0.95) 90%)',
                color: 'white',
                padding: '12px 20px',
                borderRadius: '15px',
                backdropFilter: 'blur(8px)', // Эффект матового стекла
                border: '1px solid rgb(65, 201, 226)', 
                boxShadow: '0 10px 30px rgba(3, 52, 110, 0.4)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '15px'
            }}>
                <div style={{ flex: '1 1 250px' }}>
                    <p style={{ margin: 0, fontSize: '13px', color: '#D5F0FB', lineHeight: '1.4' }}>
                        This website uses cookies to ensure you get the best experience. 
                        By continuing to browse, you agree to our use of cookies.
                    </p>
                </div>
                <Button 
                    onClick={handleAccept}
                    style={{
                        backgroundColor: 'rgb(65, 201, 226)', 
                        border: 'none',
                        borderRadius: '10px',
                        padding: '6px 20px',
                        fontWeight: '600',
                        color: 'rgb(3, 52, 110)',
                        transition: '0.3s'
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#D5F0FB')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgb(65, 201, 226)')}
                >
                    I agree
                </Button>
            </Container>
        </div>
    );
};

export default Cookie;
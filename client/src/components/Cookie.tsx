import { 
    useState, 
    useEffect} from 'react';
import {Button} from 'react-bootstrap';



const Cookie = () => {
    const [show, setShow] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_accepted');
        if (!consent) {
            setShow(true);
            const timer = setTimeout(() => setIsVisible(true), 3500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        setIsVisible(false);
        setTimeout(() => {
            localStorage.setItem('cookie_accepted', 'true');
            setShow(false);
        }, 500);
    };

    if (!show) return null;

    return (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px', // Всегда справа
          zIndex: 10000,
          maxWidth: '320px',
        
          opacity: isVisible ? 1 : 0, 
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)', 
          filter: isVisible ? 'blur(0px)' : 'blur(4px)', 
        
          transition: 'opacity 1.5s ease, transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), filter 1.2s ease',
          pointerEvents: isVisible ? 'all' : 'none',
        }}>
            <div style={{
                background: 'linear-gradient(135deg, rgba(0, 102, 205, 0.7) 0%, rgba(3, 52, 110, 0.85) 100%)',
                backdropFilter: 'blur(10px)', // Размытие фона (стекло)
                borderRadius: '20px',
                padding: '20px',
                border: '1.5px solid rgba(65, 201, 226, 0.4)',
                boxShadow: '0 15px 35px rgba(3, 52, 110, 0.3)',
                color: 'white',
            }}>
                <h6 style={{ color: 'rgb(65, 201, 226)', fontWeight: 'bold', marginBottom: '10px' }}>Cookies</h6>
                <p style={{ fontSize: '12px', lineHeight: '1.5', margin: '0 0 15px 0', color: '#D5F0FB' }}>
                    By clicking accept, you agree to our cookie policy and terms. 
                </p>
                <div className="d-flex justify-content-end">
                    <Button 
                        onClick={handleAccept}
                        style={{
                            backgroundColor: 'rgb(65, 201, 226)',
                            border: 'none',
                            borderRadius: '15px',
                            padding: '5px 20px',
                            fontSize: '12px',
                            fontWeight: '700',
                            color: 'rgb(3, 52, 110)',
                            boxShadow: '0 4px 10px rgba(65, 201, 226, 0.3)'
                        }}
                    >
                        I Agree!
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cookie;
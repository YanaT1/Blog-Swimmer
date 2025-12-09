import {
    useState,
    useEffect,
    useRef} from 'react';
import {observer} from 'mobx-react-lite';
import AuthService from '../../services/AuthService';
import '../../css/formsStyle.css';
import {
    Container,
    Card,
    Button} from 'react-bootstrap';



const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;


const ForgotPassword = observer((): JSX.Element => {
    const userRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState<boolean>(false);
    const [emailFocus, setEmailFocus] = useState<boolean>(false);

    const [success, setSuccess] = useState('');
    const [messageError, setMessageError] = useState('');


    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await AuthService.forgotPassword(email);
            setSuccess(response.data.message);
            setEmail(''); 
            setTimeout(() => setSuccess(''), 7000); 
        } catch (error) {
            setMessageError('Error: Unable to send reset password link');
            setTimeout(() => setMessageError(''), 5000); 
        }
    };

    return (
        <div className='backgroundSection' style={{margin: '5% 10%'}}>
            <Container fluid className='container'>
                <Card style={{width: 400, borderColor:'#008DDA', borderRadius:15}} className='p-4'>
                    <Card.Title className='text-center' style={{color:'rgb(3, 51, 109, 0.60)'}}>
                        Forgot Password
                    </Card.Title>
                    <Card.Body>
                      {messageError?
                          <>
                            {messageError && <p
                                style={{margin:'2%', textAlign:'center', color:'red'}}>{messageError}</p>}
                          </>:<>
                            {success && <p 
                                style={{margin:'2%', textAlign:'center', color:'green'}}>{success}</p>}
                          </>
                      }
                        <form onSubmit={handleSubmit}>
                            <input type='email'
                                   ref={userRef}
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   placeholder='Enter your email'
                                   className='inputStyle'
                                   aria-invalid={validEmail ? 'false' : 'true'}
                                   aria-describedby='uidnote'
                                   onFocus={() => setEmailFocus(true)}
                                   onBlur={() => setEmailFocus(false)}                                 
                            /> 
                            <p id='uidnote' className={emailFocus && email && !validEmail? 'instructions' : 'offscreen'}>
                                Please enter a valid email address.
                            </p>
                            <Button className='buttonStyle' type='submit'
                                    style={{width:'100%', marginTop:'10%'}}
                            >Send Reset Link
                            </Button>
                        </form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
});

export default ForgotPassword;

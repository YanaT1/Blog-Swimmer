import {
    useRef,
    useState,
    useEffect,
    useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../../store/store';
import {
    Container,
    Card,
    Button,
    Row,
    Nav} from 'react-bootstrap';
import {
    Link,
    useNavigate} from 'react-router-dom';
import '../../css/formsStyle.css';
import {ErrorMessage} from './ErrorMessage';
import {Role} from '../../models/ERole';
import {AppRoutes} from '../../models/AppRoutes';
import {ShowButtonPassword} from './ShowButtonPassword';



const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;


const LoginForm = observer( (): JSX.Element => {
    const {user} = useContext(Context);
    const userRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('');
    const [validEmail, setValidEmail] = useState<boolean>(false);
    const [emailFocus, setEmailFocus] = useState<boolean>(false);

    const [password, setPassword] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                if (user._user?.role === Role.Admin) {
                    navigate(AppRoutes.Admin);
                } else {
                    navigate(AppRoutes.Home); 
                }
            }, 2000);
            return () => clearTimeout(timer); 
        }
    }, [success, navigate, user._user]);


    const LoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            await user.login(email, password);

            if (user._user) {
                setEmail('');
                setPassword('');
                setSuccess(true);
            } else {
                throw new Error('Incorrect login or password');
            }
        } catch (err: unknown) {
            if (!navigator.onLine) {
                setErrorMessage('No Internet Connection');
            } else if (err instanceof Error) {
                setErrorMessage('Incorrect login or password');
            } else {
                setErrorMessage('Unknown error');
            }
        }  finally {
            setIsSubmitting(false);
        }
    }

        return (
            <>
                {success ? (
                    <div className='text-center' style={{margin:'20% 10%', color:'rgb(3, 51, 109, 0.60)'}}>
                        <h2>You Are Welcome!</h2>
                        
                        {user._user && !user._user.isActivated && (
                            <h5 style={{ color: 'red', margin: '2%'}}>
                                Your account is not activated. Please check your email.
                            </h5>
                        )}
                    </div>
                ) : (
                    <div className='backgroundSection'>
                        <Container fluid className='container'>
                            <Card style={{width: 600, borderColor:'#008DDA', borderRadius:15}} className='p-4'>
                                <Card.Title className='text-center' style={{color:'rgb(3, 51, 109, 0.60)'}}>
                                    Login
                                </Card.Title>
                                <Card.Body>
                                    {errorMessage && <ErrorMessage message={errorMessage} />}
                                    <form noValidate onSubmit={LoginSubmit}>
                                        <input type='email' 
                                               id='email'
                                               ref={userRef}
                                               autoComplete='on'
                                               placeholder='Enter email' 
                                               className='inputStyle'
                                               value={email}
                                               onChange={e => setEmail(e.target.value)}
                                               required   
                                               aria-invalid={validEmail ? 'false' : 'true'}
                                               aria-describedby='uidnote'
                                               onFocus={() => setEmailFocus(true)}
                                               onBlur={() => setEmailFocus(false)}                                 
                                        /> 
                                        <p id='uidnote' className={emailFocus && email && !validEmail? 'instructions' : 'offscreen'}>
                                            Please enter a valid email address.
                                        </p>
                                        
                                        <div className='passwordWrapper'>
                                            <input type='password'
                                                   id='password'
                                                   autoComplete='on'
                                                   ref={passwordInputRef}
                                                   placeholder='Enter password'
                                                   className='inputStyle passwordInput'
                                                   value={password}
                                                   onChange={e => setPassword(e.target.value)}
                                                   required
                                            />
                                            <ShowButtonPassword inputRef={passwordInputRef} />
                                        </div>

                                        <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                                            <div className='pStyles'> 
                                                {/* <p>Don't have an account?</p>
                                                <Nav.Link as={Link} to={AppRoutes.Registration} style={{color:'#008DDA', textDecoration: 'none'}}>Sign Up Now</Nav.Link>
                                                <br /> */}
                                                <p style={{}}>Forgot your password?</p>
                                                <Nav.Link as={Link} to={AppRoutes.ForgotPassword} style={{color:'#008DDA', textDecoration: 'none'}}>Reset It Here</Nav.Link>
                                            </div>
                                            <div className='text-end'>
                                                <Button className='buttonStyle' type='submit'
                                                >{isSubmitting ? '.....' : 'Login'}
                                                </Button>           
                                            </div>
                                        </Row> 
                                    </form>
                                </Card.Body>
                            </Card>
                        </Container>
                   </div>
                )}
            </>
        )
})

export default LoginForm;
import {
    useRef,
    useState,
    useEffect,
    useContext} from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../../index';
import {
    Container,
    Card,
    Button,
    Row,
    Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../../css/formsStyle.css';
import {ErrorMessage} from './ErrorMessage';
import {ShowButtonPassword} from './ShowButtonPassword';
import {Role} from '../../models/ERole';
import {AppRoutes} from '../../models/AppRoutes';




const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PWD_REGEX = /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d)[a-zA-Zа-яА-ЯёЁ\d]{8,24}$/u;


const RegistrationForm = observer( (): JSX.Element => {
    const {user} = useContext(Context);
    const userRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState<string>('');
    const [validEmail, setValidEmail] = useState<boolean>(false);
    const [emailFocus, setEmailFocus] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [password, setPassword] = useState<string>('');
    const [validPwd, setValidPwd] = useState<boolean>(false);
    const [pwdFocus, setPwdFocus] = useState<boolean>(false);

    const [matchPwd, setMatchPwd] = useState<string>('');
    const [validMatchPwd, setValidMatchPwd] = useState<boolean>(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState<boolean>(false);

    const [role, setRole] = useState<Role>(Role.User);
    const [validRole, setValidRole] = useState<boolean>(false);
    const [roleFocus, setRoleFocus] = useState<boolean>(false);

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatchPwd(password === matchPwd);
    }, [password, matchPwd]);

    useEffect(() => {
        setValidRole(role === Role.User)
    }, [role]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        const v3 = role === Role.User;
        if (!v1 || !v2 || !v3) {
            setErrorMessage('Please fill in valid data');
            return; 
        }
        try {
            setIsSubmitting(true);
            await user.registration(email, password, role);
            user.setAuth(true)
            setErrorMessage(null);
            setEmail('');
            setPassword('');
            setMatchPwd('');
            setRole({} as Role);
        } catch (err) {
            if (!err) {
                setErrorMessage('No Server Response');
            } else {
                setErrorMessage('Email was already Registered')
            }
        } finally {
            setIsSubmitting(false);
        }
    }

        return (
            <div className='backgroundSection'>
                <Container fluid className='container'>
                    <Card style={{width: 600, borderColor:'#008DDA', borderRadius:15}} className='p-4'>
                        <Card.Title className='text-center' style={{color:'rgb(3, 51, 109, 0.60)'}}>
                            Registration
                        </Card.Title>
                        <Card.Body>
                             {errorMessage && <ErrorMessage message={errorMessage} />}
                            <form noValidate onSubmit={handleSubmit}> 
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
                                           aria-invalid={validPwd ? "false" : "true"}
                                           aria-describedby="pwdnote"
                                           onFocus={() => setPwdFocus(true)}
                                           onBlur={() => setPwdFocus(false)}
                                    />
                                    <ShowButtonPassword inputRef={passwordInputRef} />
                                </div>
                                <p id='pwdnote' className={pwdFocus &&!validPwd? 'instructions' : 'offscreen'}>
                                    Password must be at least: <br />
                                    * 8 characters long, <br />
                                    * one uppercase letter, <br />
                                    * one lowercase letter <br />
                                    * and one number.
                                </p>

                                <div className='passwordWrapper'>
                                    <input type='password'
                                           id='confirmPassword'
                                           autoComplete='on'
                                           ref={confirmPasswordInputRef}
                                           placeholder='Confirm password'
                                           className='inputStyle passwordInput'
                                           value={matchPwd}
                                           onChange={e => setMatchPwd(e.target.value)}
                                           required
                                           aria-invalid={validMatchPwd? 'false' : 'true'}
                                           aria-describedby='confirmPwdnote'
                                           onFocus={() => setMatchPwdFocus(true)}
                                           onBlur={() => setMatchPwdFocus(false)}
                                    />
                                   <ShowButtonPassword inputRef={confirmPasswordInputRef} />
                                </div>
                                <p id='confirmPwdnote' className={matchPwdFocus && !validMatchPwd? 'instructions' : 'offscreen'}>
                                    Passwords do not match.
                                </p>
                
                                <select name='role'
                                        id='role'
                                        className='formSelect'
                                        aria-label='Select role'
                                        value={role}
                                        onChange={e => {
                                            const value = e.target.value as Role;
                                            if (value === Role.User || value === Role.Admin) {
                                                setRole(value);
                                            }
                                        }}
                                        required
                                        aria-invalid={validRole? 'false' : 'true'}
                                        aria-describedby='roleNote'
                                        onFocus={() => setRoleFocus(true)}
                                        onBlur={() => setRoleFocus(false)}
                                >
                                    <option value='user'>USER</option>
                                    <option value='admin'>ADMIN</option>
                                </select>
                                <p id='roleNote' className={roleFocus &&!validRole? 'instructions' : 'offscreen'}>
                                    Please select USER. Only Admin can change your role on administrative.
                                </p>
                                    
                                <Row className='d-flex justify-content-between mt-3 pl-3 pr-3'>
                                    <div className='pStyles'>
                                        Already have an account? 
                                        <Nav.Link as={Link} to={AppRoutes.Login} style={{color:'#008DDA'}}>Login</Nav.Link>
                                    </div>
                                    <div className='text-end'>
                                        <Button className='buttonStyle' type='submit'
                                        >{isSubmitting ? '.....' : 'Sign up'}
                                        </Button>          
                                    </div>
                                </Row> 
                            </form>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        )
})

export default RegistrationForm;
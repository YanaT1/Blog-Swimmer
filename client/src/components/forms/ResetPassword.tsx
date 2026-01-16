import {
    useState,
    useEffect,
    useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {observer} from 'mobx-react-lite'; 
import AuthService from '../../services/AuthService';
import {ShowButtonPassword} from './ShowButtonPassword';
import '../../css/formsStyle.css';
import {
    Container,
    Card,
    Button} from 'react-bootstrap';



const PWD_REGEX = /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d)[a-zA-Zа-яА-ЯёЁ\d]{8,24}$/u;


interface ResetPasswordProps {
    token: string;
}


const ResetPassword = observer(({token}: ResetPasswordProps) => { 
    const navigate = useNavigate();
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [success, setSuccess] = useState('');
    const [messageError, setMessageError] = useState('');

    const [password, setPassword] = useState<string>('');
    const [validPwd, setValidPwd] = useState<boolean>(false);
    const [pwdFocus, setPwdFocus] = useState<boolean>(false);

    const [matchPwd, setMatchPwd] = useState<string>('');
    const [validMatchPwd, setValidMatchPwd] = useState<boolean>(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState<boolean>(false);

    useEffect(() => {
        passwordRef.current?.focus();
    }, [])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatchPwd(password === matchPwd);
    }, [password, matchPwd]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setMessageError('Invalid token');
            return;
        }

        if (password !== matchPwd) {
        setMessageError('Passwords do not match');
        return;
        }

        try {
            const response = await AuthService.resetPassword(token, password, matchPwd);
            if (response.status === 200) {
                setSuccess('Password reset successfully!');
                setTimeout(() => navigate('/login'), 3000);
            } catch (error: any) {
            setMessageError(error.response?.data?.message || 'Unable to reset password');
            }
        };

    return (
        <div className='backgroundSection' style={{margin: '5% 10%'}}>
            <Container fluid className='container'>
                <Card style={{width: 400, borderColor:'#008DDA', borderRadius:15}} className='p-4'>
                    <Card.Title className='text-center' style={{color:'rgb(3, 51, 109, 0.60)'}}>
                        Reset Password
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
                            <div className='passwordWrapper'>
                                <input type='password'
                                       ref={passwordRef}
                                       value={password}
                                       autoComplete='off'
                                       className='inputStyle'
                                       onChange={(e) => setPassword(e.target.value)}
                                       placeholder='Enter new password'
                                       required
                                       aria-invalid={validPwd ? "false" : "true"}
                                       aria-describedby="pwdnote"
                                       onFocus={() => setPwdFocus(true)}
                                       onBlur={() => setPwdFocus(false)}
                                />
                                <ShowButtonPassword inputRef={passwordRef} />
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
                                       ref={confirmPasswordRef}
                                       value={matchPwd}
                                       autoComplete='off'
                                       className='inputStyle'
                                       onChange={(e) => setMatchPwd(e.target.value)}
                                       placeholder='Confirm new password'
                                       required
                                       aria-invalid={validMatchPwd? 'false' : 'true'}
                                       aria-describedby='confirmPwdnote'
                                       onFocus={() => setMatchPwdFocus(true)}
                                       onBlur={() => setMatchPwdFocus(false)}
                                />
                                <ShowButtonPassword inputRef={confirmPasswordRef} />
                            </div>
                            <p id='confirmPwdnote' className={matchPwdFocus && !validMatchPwd? 'instructions' : 'offscreen'}>
                                Passwords do not match.
                            </p>
                            <Button className='buttonStyle' type='submit'
                                    style={{width:'100%', marginTop:'10%'}}
                            >Reset Password
                            </Button>
                        </form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
});

export default ResetPassword;



import {
    useRef,
    useState,
    useEffect} from 'react';
import {
    SubmitHandler,
    useForm} from 'react-hook-form';
import '../../css/formsStyle.css';
import {
    Container,
    Card,
    Button} from 'react-bootstrap';
import {IContactForm} from '../../models/IContactForm';



const ContactForm = (): JSX.Element => {
    const form = useRef<HTMLFormElement>(null);
    const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        if (result) {
            const timer = setTimeout(() => {
                setResult(null);
            }, 3000); 
            return () => clearTimeout(timer); 
        }
    }, [result]);

    const {register, handleSubmit, formState, reset, formState: {isValid}} = useForm<IContactForm>({
        mode: 'all',
        defaultValues: {
            from_name: '',
            from_email: '',
            message: ''
        }
    });

    const nameError = formState.errors['from_name']?.message
    const emailError = formState.errors['from_email']?.message
    const messageError = formState.errors['message']?.message

    const onSubmit: SubmitHandler<IContactForm> = async (data) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.from_name,
                    email: data.from_email,
                    message: data.message
                })
            });

            const result = await response.json();

            if (response.ok) {
                setResult({ type: 'success', message: result.message || 'Message sent successfully!' });
                reset();
            } else {
                setResult({ type: 'error', message: result.error || 'Failed to send message.' });
            }
        } catch (error) {
            setResult({ type: 'error', message: 'Network or server error.' });
        }
    }
    

        return (
            <div className='backgroundSection'>
                <Container fluid className='container'>
                    <Card style={{width: 600, borderColor:'#008DDA', borderRadius:15}} className='p-5'>
                        <Card.Title className='text-center' style={{color:'rgb(3, 51, 109, 0.60)'}}>
                            Contact Me
                        </Card.Title>
                        <Card.Body>
                            <form noValidate ref={form} onSubmit={handleSubmit(onSubmit)}>
                                <input 
                                    type='text'
                                    placeholder='Enter your name*'
                                    className='inputStyle'
                                    {...register('from_name', {
                                        required: 'This field is required.',
                                    })} 
                                />
                                {nameError && <p className='errorStyle'>{nameError}</p>}

                               <input 
                                    type='email'
                                    placeholder='Enter your email*'
                                    className='inputStyle'
                                    {...register('from_email', {
                                        required: 'This field is required.', 
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: 'Please enter a valid email address.'
                                        }
                                    })} 
                                />
                                {emailError && <p className='errorStyle'>{emailError}</p>}
                    
                                <textarea 
                                    placeholder='Enter your message*'
                                    className='inputStyle'
                                    style={{width: '100%', height: '125px'}}
                                    {...register('message', {
                                        required: 'This field is required.',
                                    })}
                                />
                                {messageError && <p className='errorStyle'>{messageError}</p>}
                            
                                <p className='styleAgree'>** Sending this message you agree to the processing of your personal data by Ivan for the purpose of contacting you. 
                                </p>
                                 
                                {isValid ?
                                    <Button type='submit'
                                            className='buttonStyle'
                                            style={{width: '100%'}}
                                    >Send Message</Button>
                                : 
                                    <Button type='submit'
                                            disabled
                                            className='buttonStyle'
                                            style={{width: '100%', backgroundColor: 'red',
                                                    marginTop: '3%', border: '1px solid red'}}
                                    >Send Message</Button>}
                            </form>
                            {result && (
                                <p style={{marginTop: '1rem',
                                           color: result.type === 'success' ? 'green' : 'red',}}
                                >
                                    {result.message}
                                </p>
                            )}
                        </Card.Body>
                    </Card>
                </Container>
            </div> 
        )
}

export default ContactForm;
import {FC} from 'react';
import ContactForm from '../components/forms/ContactForm';
import './stylePage.css';



const ContactPage: FC = () => {
    return(
        <div className='title'>
            <div className='containerMargin'>
                <ContactForm />
            </div>
        </div>
    )
}

export default ContactPage;
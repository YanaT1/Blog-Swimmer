import '../css/footer.css';
import FooterTop from '../components/FooterTop';



const Footer = (): JSX.Element => {
    const currentYear = new Date().getFullYear();
    return (
        <>
            <FooterTop />
            <div className='containerStyles'>
                <footer className='text-center'>
                    <p style={{margin: '10% 0 0 0', color:'rgb(121,121,121)'}}>
                    &copy;
                    {currentYear} 
                    <a href ='mailto:tryputenyana@gmail.com'
                       className = 'linkStyle'
                    > Yana Tryputen 
                    </a>
                    </p>
                </footer>
           </div>
        </>
    )
}

export default Footer;
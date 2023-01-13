import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <div className="footer">
            <p>
                Made with ♡ by{' '}
                <div className="footer-links">
                    <a
                        href="https://linktr.ee/akshatOwO"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        @akshat
                    </a>{' '}
                    <a
                        href="https://linktr.ee/shouryapal"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        @shourya
                    </a>{' '}
                    <a
                        href="https://linktr.ee/yom4n"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        @sparsh
                    </a>
                </div>
                <div className="insta">
                    <a href="https://www.instagram.com/syllabusx_.live/" target="_blank" rel="noopener noreferrer">
                        Follow Us! <InstagramIcon className='icon' />
                    </a>
                </div>
            </p>
        </div>
    );
};

export default Footer;

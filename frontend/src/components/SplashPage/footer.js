import { useHistory } from "react-router-dom";
import logo from "../Navigation/staticAssets/logo.jpeg"
import github from '../About/github.png'
import linkedin from '../About/linkedin.png'
import './footer.css'

const Footer = () => {
    const history = useHistory()
    return (
        <div className="footer">
        <div className="footer__container">
            <div className="footer__left">
            <div className="footer__left__logo">
                <img src={logo} alt
                ="logo" className='footer_logo' />
            </div>
            <div className="footer__left__text">
                <p>© 2022 bestBnB, Inc. All rights reserved</p>
            </div>
            </div>
            <div className="footer__right">
            <div className="footer__right__links">
                <ul className="footer__right__ul">
                <li>
                    <a href="#" onClick={() => history.push('/about')}>
                        About Me
                        </a>
                </li>
                <li>
                    <a href="https://github.com/tbluher14/bestBnB" target="_blank">
                    <img className='home-page-github' src={github} alt="logo"></img>
                        GitHub
                     </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/tom-bluher-172321115/" target="_blank">
                        LinkedIn
                    <img className='home-page-linkedin' src={linkedin} alt='logo'></img>
                    </a>
                </li>
                <li>
                    <a href="#">Privacy & Terms</a>
                </li>
                <li>
                    <a href="#">Ad Choices</a>
                </li>
            </ul>
            </div>
            </div>
        </div>
        </div>
    )
}

export default Footer;

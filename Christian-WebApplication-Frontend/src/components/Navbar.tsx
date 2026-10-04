import './Navbar.css';
import { NavLink } from "react-router-dom";
function Navbar() {
    return (
        <ul>
            <li><NavLink className={({ isActive }) =>
                isActive ? "nav-link-li active" : "nav-link-li"
            } to='/home-page'>Főoldal</NavLink></li>

            <li><NavLink className={({ isActive }) =>
                isActive ? "nav-link-li active" : "nav-link-li"
            } to=''>Biblia</NavLink></li>

            <li><NavLink className={({ isActive }) =>
                isActive ? "nav-link-li active" : "nav-link-li"
            } to=''>Profil</NavLink></li>

            <li><NavLink className={({ isActive }) =>
                isActive ? "nav-link-li active" : "nav-link-li"
            } to=''>Küldetések</NavLink></li>

            <li><NavLink className={({ isActive }) =>
                isActive ? "nav-link-li active" : "nav-link-li"
            } to='/church-finder'>Templom kereső</NavLink></li>

            <li><NavLink className={({ isActive }) =>
                isActive ? "nav-link-li active" : "nav-link-li"
            } to=''>Események</NavLink></li>

            <li><NavLink className={({ isActive }) =>
                isActive ? "nav-link-li active" : "nav-link-li"
            } to=''>Chatbot</NavLink></li>
        </ul>
    );
}
export default Navbar;
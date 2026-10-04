import { NavLink } from "react-router-dom";
import { useInputToggler } from "../../utils/showInput";
import { useSignUp } from "../../database/database";
import { useState, type ChangeEvent } from "react";
import './RegistrationPage.css';
export function RegistrationPage() {
    const { inputType, buttonText, switchVisibility } = useInputToggler("Jelszó mutatása!");
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {message, signUp} = useSignUp();

    function handleUserName(event: ChangeEvent<HTMLInputElement>) {
        setUserName(event.target.value);
    }

    function handleEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }

    function handlePassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    function handleButton() {
        signUp(userName, email, password);
    }

    return (
        <div id="register-div">
            <title>Regisztráció</title>
            <div id="input-div">
                <h2>Regisztráció</h2>
                <label>Felhasználó név</label><br />
                <input onChange={handleUserName} value={userName} type="text" placeholder="Felhasználó név:..." /><br />
                <label>Adj meg egy E-mail címet!</label><br />
                <input onChange={handleEmail} value={email} type="email" placeholder="Email:..." /><br />
                <label>Adj meg egy jelszót</label><br />
                <input onChange={handlePassword} value={password} type={inputType} placeholder="Jelszó:..." />
                <button onClick={switchVisibility}>{buttonText}</button><br />
                <button onClick={handleButton}>Regisztráció</button>
                <NavLink className="navLink" to="/">
                    Vissza a bejelentkezéshez!
                </NavLink>
            </div>

            <div id="result-div">
                <h2>{message}</h2>
            </div>
        </div>
    );
}
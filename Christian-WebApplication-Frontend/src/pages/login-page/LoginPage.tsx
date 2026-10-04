import { useInputToggler } from "../../utils/showInput";
import '../../App.css';
import './loginPage.css';
import { NavLink } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import { useLogin } from "../../database/database";

export function Login_page() {
    const { inputType, buttonText, switchVisibility } = useInputToggler('Jelszó mutatása');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useLogin();

    function handleEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value);
    }
    function handlePassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }

    async function handleButton() {
        const result = await login(email, password);

        console.log(result);
    }

    return (
        <div id="login-root">
            <title>Bejelentkezés</title>

            <h2>Bejelentkezés</h2>
            <label>Email-cím</label><br />
            <input value={email} onChange={handleEmail} type="email" placeholder="Email:..." /><br />
            <label>Jelszó</label><br />
            <input value={password} onChange={handlePassword} type={inputType} placeholder="Jelszó:..." />
            <button onClick={switchVisibility}>{buttonText}</button><br />
            <button onClick={handleButton} >Bejelentkezés</button>
            <NavLink className="nav-link" to="/register">
                Regisztráció
            </NavLink>
        </div>
    );
}
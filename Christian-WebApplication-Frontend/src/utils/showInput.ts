import { useState } from "react";

export function useInputToggler(buttonElementText:string) {
    const [inputType, setInputType] = useState('password');
    const buttonText = inputType === 'password' ? buttonElementText : 'Elrejtés';

    function switchVisibility() {
        setInputType(
            inputType === 'password' ? 'text' : 'password'
        );    }
    return {inputType, buttonText, switchVisibility}
}
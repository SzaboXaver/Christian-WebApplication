import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const baseUrl = "http://localhost:3000/";

export function useSignUp() {
  const [message, setMessage] = useState("");

  async function signUp(userName: string, email: string, password: string) {
    try {
      const response = await axios.post(`${baseUrl}registration`, {
        userName,
        email,
        password,
      });

      setMessage(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.message ??
            "A regisztráció jelenleg nem sikerült. Kérlek, próbáld meg késöbb.",
        );
      } else {
        setMessage(
          "A regisztráció jelenleg nem sikerült. Kérlek, próbáld meg késöbb.",
        );
      }
    }
  }
  return { message, signUp };
}

export function useLogin() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function login(email: string, password: string) {
    try {
      const response = await axios.post(`${baseUrl}login`, {
        email,
        password,
      });

      if (response.data.message === "Sikeres belépés") {
        navigate("/home-page");
      }
      const userData = response.data.user_data;
      const message = response.data.message;
      return { message, userData };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          error.response?.data?.message ??
            "Váratlan hiba lépett fel, kérjük próbálja újra később.",
        );
      } else {
        setMessage("Váratlan hiba lépett fel, kérjük próbálja újra később.");
      }
    }
  }

  return { login, message };
}
export interface Data {
  lat: number;
  lon: number;
  name?: string;
  denomation?: string;
  religion?: string;
}
export function useSearchChurch() {
  async function searchChurch(denomation: string, city: string) {
    try {
      const response = await axios.get(`${baseUrl}api/churches`, {
        params: {
          denomation,
          city,
        },
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const status = err.response.status;
          if (status === 400) {
            console.log("Hibás keresés, ellenőrizd a település nevét.");
          } else if (status === 504) {
            console.log("A keresés túl sokáig tartott, próbáld újra.");
          } else {
            console.log("Szerverhiba történt, próbáld újra később.");
          }
        } else {
          console.log("Nem érhető el a szerver.");
        }
      } else {
        console.log("Ismeretlen hiba történt.");
      }
      console.error(err);
    }
  }

  return { searchChurch };
}

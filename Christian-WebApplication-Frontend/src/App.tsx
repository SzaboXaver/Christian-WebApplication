import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login_page } from './pages/login-page/LoginPage'
import { RegistrationPage } from './pages/registration-page/RegistrationPage'
import { HomePage } from './pages/home-page/HomePage'
import { ChurchFinder } from './pages/church-finder/ChurchFinder'
import { useEffect } from 'react'

function App() {
  
    useEffect(() => {
    // Ha a böngésző nem támogatja, ne dőljön el az app
    if (typeof PerformanceObserver === "undefined") return;

    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as PerformanceNavigationTiming[]) {
        // A válasz összes Server-Timing adata
        console.log("Server Timing", entry.serverTiming);
      }
    });

    // `navigation` bejegyzések figyelése (a már megtörténtek is jönnek a buffered miatt)
    po.observe({ type: "navigation", buffered: true });

    // Takarítás: unmountkor leállítjuk az observert
    return () => po.disconnect();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login_page />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/home-page' element={<HomePage />} />
        <Route path='/church-finder' element={<ChurchFinder />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App

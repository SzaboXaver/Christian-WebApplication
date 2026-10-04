import './ChurchFinder.css';
import Navbar from '../../components/Navbar';
import { useState } from 'react';
import { useSearchChurch } from '../../database/database';
import { denominations } from '../../database/denominations';
import { type Data } from '../../database/database';
export function ChurchFinder() {
    const { searchChurch } = useSearchChurch();
    const [selectedDenomation, setSelectedDenomation] = useState('');
    const [input, setInput] = useState('');
    const [churches, setChurches] = useState<Data[]>([]);
    async function search() {
        const result = await searchChurch(selectedDenomation, input);
        setChurches(result || []);
    }
    return (
        <>
            <title>Templom kereső</title>

            <div className='searchArea'>
                <h2>Felekezet kiválasztása</h2>
                <div className='button-panel'>
                    {denominations.map((denomination) =>
                        <button key={denomination.value} onClick={() => {
                            setSelectedDenomation(denomination.value);
                        }} className={
                            selectedDenomation === denomination.value ? 'selected' : ''
                        } value={denomination.value} >{denomination.label}</button>
                    )}
                </div>
                <h2>Település neve</h2><br />
                <input placeholder='Pl.:Budapest' onChange={(e) => {
                    setInput(e.target.value);
                }} value={input} type='text' /><br />

                <button onClick={search} className='searchBtn'>Keresés</button>
            </div>

            <div className='result-area'>
                <h2>Eredmények</h2>
                <div className='result-list'>
                    {churches.map((church) => (
                        <div key={crypto.randomUUID()} className='result-item'>
                            <hr />
                            <h3>{church.name}</h3><br />
                            <button>Mutatasd térképen</button>
                        </div>
                    ))}
                </div>
            </div>

            <Navbar />
        </>
    );
}
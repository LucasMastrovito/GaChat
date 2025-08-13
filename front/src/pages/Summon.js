import { useState } from "react";
import "./Summon.css";
import axios from 'axios';

function Summon() {
    const [Data, setData] = useState({});

    const summon = async (e) => {
        await axios.get('http://localhost:3000/summon').then((response => {
            setData(response.data);
            console.log(Data)
        }));
    }

    return (
    <div className="summon_container">
         <div className='summon_card'>
            <img alt="cat" url='https://c.tenor.com/sV0JRnsrjsUAAAAd/tenor.gif'></img>
         </div>
        <button className="btn" onClick={summon}>Invoquer</button>
    </div>
    )
}

export default Summon;
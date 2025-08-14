import { useEffect, useState } from "react";

function Card(props) {
    const url = props.id.toLowerCase();
    const [rarity, setRarity] = useState('');

    useEffect(() => {
        const req = async () => {
            fetch('https://gachat.onrender.com/getcat/' + props.id)
            .then(res => res.json())
            .then(data => {
                setRarity(data.rarity)
            });
        }
        req();
    })

    return (
        <div>
            <div className='card'>
                <img className="gif_collec" alt="cat" src={'https://raw.githubusercontent.com/LucasMastrovito/GaChat/main/public/' + url + '.gif'}></img>
            </div>
            <p>{props.id}</p>
            <div className="infos">
                <img alt="rarity" src={'/rarity/' + {rarity} + '.png'} />
                <p>{props.nb}</p>
            </div>
        </div>
    )
}

export default Card;
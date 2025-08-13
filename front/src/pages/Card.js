import { useEffect, useState } from "react";

function Card(props) {
    const url = props.id.toLowerCase();
    const [rarity, setRarity] = useState('');

    useEffect(() => {
        const req = async () => {
            fetch('https://gachat.onrender.com/getcat/' + props.id)
            .then(res => res.json())
            .then(data => {
                console.log(data)
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
            <p>{rarity}</p>
            <p>{props.nb}</p>
        </div>
    )
}

export default Card;
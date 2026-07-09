function Team(props) {
    const name = props.name;
    const cats = props.cats;

    const click = () => {
        if (props.click) {
            props.click(props.cats);
        }
    }

    const remove = async () => {
        console.log(cats);
        await fetch('https://gachat.onrender.com/delteam', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: localStorage.getItem('userId'),
                name,
                cats
            })
        });
    }

    return (
        <div className="team shadow" onClick={click}>
            <h2>{props.name}</h2>
            <div className="teamCats">
                <div>
                    <img className="gif_collec shadow-gif" alt="cat" src={'https://raw.githubusercontent.com/LucasMastrovito/GaChat/main/public/' + props.cats[0].toLowerCase() + '.gif'}></img>
                    <p>{props.cats[0]}</p>
                </div>
                <div>
                    <img className="gif_collec shadow-gif" alt="cat" src={'https://raw.githubusercontent.com/LucasMastrovito/GaChat/main/public/' + props.cats[1].toLowerCase() + '.gif'}></img>
                    <p>{props.cats[1]}</p>
                </div>
                <div>
                    <img className="gif_collec shadow-gif" alt="cat" src={'https://raw.githubusercontent.com/LucasMastrovito/GaChat/main/public/' + props.cats[2].toLowerCase() + '.gif'}></img>
                    <p>{props.cats[2]}</p>
                </div>
            </div>
            <button className="btn" onClick={remove}>Supprimer</button>
        </div>
    )
}

export default Team;
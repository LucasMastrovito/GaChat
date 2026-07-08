function Team(props) {
    const click = () => {
        if (props.click) {
            props.click(props.index);
        }
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

        </div>
    )
}

export default Team;
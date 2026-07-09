import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Arena.scss";

// ---- Stats de base par type (bruts, à ajuster au feeling) ----
const TYPE_STATS = {
    mignon:   { hp: 90,  attack: 45, defense: 15, speed: 18 },
    zoomies:  { hp: 80,  attack: 50, defense: 10, speed: 25 },
    flemmard: { hp: 120, attack: 35, defense: 25, speed: 8  },
    silly:    { hp: 100, attack: 42, defense: 18, speed: 15 },
    etrange:  { hp: 95,  attack: 46, defense: 14, speed: 16 },
};

// ---- Triangle de types : clé bat valeur ----
const TYPE_ADVANTAGE = {
    mignon: "zoomies",
    zoomies: "flemmard",
    flemmard: "mignon",
};

// Paires qui s'infligent un bonus de dégâts l'une contre l'autre, dans les deux sens
const MUTUAL_ADVANTAGE_PAIRS = [
    ["silly", "etrange"],
];

function isMutualAdvantage(typeA, typeB) {
    return MUTUAL_ADVANTAGE_PAIRS.some(
        ([a, b]) => (typeA === a && typeB === b) || (typeA === b && typeB === a)
    );
}

// Multiplicateur de dégâts selon le type attaquant / défenseur
function getTypeMultiplier(attackerType, defenderType) {
    if (isMutualAdvantage(attackerType, defenderType)) return 1.2; // silly vs étrange : avantage mutuel
    if (TYPE_ADVANTAGE[attackerType] === defenderType) return 1.2; // avantage
    if (TYPE_ADVANTAGE[defenderType] === attackerType) return 0.8; // résistance
    return 1; // neutre
}

const CRIT_CHANCE = 0.15;
const CRIT_MULTIPLIER = 1.5;

function computeDamage(attacker, defender) {
    const base = Math.max(1, attacker.attack - defender.defense);
    const typeMultiplier = getTypeMultiplier(attacker.type, defender.type);

    const variance = 0.9 + Math.random() * 0.2; // entre -10% et +10%
    const isCritical = Math.random() < CRIT_CHANCE;
    const critMultiplier = isCritical ? CRIT_MULTIPLIER : 1;

    const damage = Math.round(base * typeMultiplier * variance * critMultiplier);

    return { damage, multiplier: typeMultiplier, isCritical };
}

// Ajoute les stats de combat (hp/maxHp/attack/def/speed) à un chat brut {id,name,type,image}
function buildFighter(cat) {
    const normalizedType = normalize(cat.type);
    const stats = TYPE_STATS[normalizedType] || TYPE_STATS.silly;
    return {
        ...cat,
        type: normalizedType,
        ...stats,
        maxHp: stats.hp,
        alive: true,
    };
}

const TURN_DELAY = 1200; // ms entre chaque action affichée

// Reconstruit un array de chats complets à partir d'un array d'ids
// et de la liste globale de tous les chats (allCats)
function resolveTeam(teamIds, allCats) {
    return teamIds
        .map(id => allCats.find(cat => normalize(cat.id) === normalize(id)))
        .filter(Boolean); // ignore les ids introuvables plutôt que de planter
}

function normalize(value) {
    return String(value).trim().toLowerCase();
}

function Arena({ teamAIds, teamBIds, allCats, onBattleEnd }) {
    const [fightersA, setFightersA] = useState(() => resolveTeam(teamAIds, allCats).map(buildFighter));
    const [fightersB, setFightersB] = useState(() => resolveTeam(teamBIds, allCats).map(buildFighter));
    const [activeAIndex, setActiveAIndex] = useState(0);
    const [activeBIndex, setActiveBIndex] = useState(0);
    const [log, setLog] = useState([]);
    const [flash, setFlash] = useState(null); // { side: 'A'|'B', damage: number } pour l'animation
    const [winner, setWinner] = useState(null);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();

    const activeA = fightersA[activeAIndex];
    const activeB = fightersB[activeBIndex];

    useEffect(() => {
        if (!winner) return;
        const redirect = setTimeout(() => {
            navigate("/menu");
        }, 3000);
        return () => clearTimeout(redirect);
    }, [winner, navigate]);

    useEffect(() => {
        if (winner) return;
        if (!activeA || !activeB) return;

        timeoutRef.current = setTimeout(() => {
            playRound();
        }, TURN_DELAY);

        return () => clearTimeout(timeoutRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeAIndex, activeBIndex, fightersA, fightersB, winner]);

    function applyDamage(side, index, damage) {
        const setter = side === "A" ? setFightersA : setFightersB;
        setter(prev => prev.map((f, i) => {
            if (i !== index) return f;
            const newHp = Math.max(0, f.hp - damage);
            return { ...f, hp: newHp, alive: newHp > 0 };
        }));
    }

    function playRound() {
        const attackerFirst = activeA.speed >= activeB.speed ? "A" : "B";
        const order = attackerFirst === "A" ? ["A", "B"] : ["B", "A"];

        let localA = { ...activeA };
        let localB = { ...activeB };

        const events = [];

        order.forEach((side) => {
            const attacker = side === "A" ? localA : localB;
            const defender = side === "A" ? localB : localA;

            if (attacker.hp <= 0 || defender.hp <= 0) return; // déjà mort, ne joue pas

            const { damage, multiplier, isCritical } = computeDamage(attacker, defender);
            defender.hp = Math.max(0, defender.hp - damage);

            let effectiveness = null;
            if (multiplier > 1) effectiveness = "Super efficace !";
            else if (multiplier < 1) effectiveness = "Pas très efficace...";

            events.push({
                side,
                attackerName: attacker.id,
                defenderName: defender.id,
                damage,
                effectiveness,
                isCritical,
                defenderSide: side === "A" ? "B" : "A",
            });
        });

        // Joue les événements l'un après l'autre avec un petit délai pour l'animation
        events.forEach((evt, i) => {
            setTimeout(() => {
                setFlash({ side: evt.defenderSide, damage: evt.damage, effectiveness: evt.effectiveness, isCritical: evt.isCritical });
                applyDamage(evt.defenderSide, evt.defenderSide === "A" ? activeAIndex : activeBIndex, evt.damage);
                setLog(prev => [
                    `${evt.attackerName} attaque ${evt.defenderName} pour ${evt.damage} dégâts${evt.isCritical ? " — CRITIQUE !" : ""}${evt.effectiveness ? " — " + evt.effectiveness : ""}`,
                    ...prev,
                ].slice(0, 6));

                setTimeout(() => setFlash(null), 1600);
            }, i * 500);
        });

        // Après les deux actions, on vérifie l'état des équipes et on avance si besoin
        setTimeout(() => {
            checkAndAdvance();
        }, events.length * 500 + 100);
    }

    function checkAndAdvance() {
        setFightersA(prevA => {
            setFightersB(prevB => {
                const nextA = prevA.findIndex(f => f.alive);
                const nextB = prevB.findIndex(f => f.alive);

                if (nextA === -1) {
                    setWinner("B");
                    onBattleEnd && onBattleEnd("B");
                } else if (nextB === -1) {
                    setWinner("A");
                    onBattleEnd && onBattleEnd("A");
                } else {
                    setActiveAIndex(nextA);
                    setActiveBIndex(nextB);
                }
                return prevB;
            });
            return prevA;
        });
    }

    if (!activeA || !activeB) {
        return (
            <div className="battle-arena">
                <p>Impossible de charger le combat : vérifie que les ids passés correspondent bien à des chats dans allCats.</p>
            </div>
        );
    }

    return (
        <div className="battle-arena">
            <div className="battle-field">
                <FighterDisplay fighter={activeA} side="left" hit={flash?.side === "A"} damage={flash?.side === "A" ? flash.damage : null} effectiveness={flash?.side === "A" ? flash.effectiveness : null} isCritical={flash?.side === "A" ? flash.isCritical : false} />
                <div className="vs">VS</div>
                <FighterDisplay fighter={activeB} side="right" hit={flash?.side === "B"} damage={flash?.side === "B" ? flash.damage : null} effectiveness={flash?.side === "B" ? flash.effectiveness : null} isCritical={flash?.side === "B" ? flash.isCritical : false} />
            </div>

            <div className="battle-log">
                {log.map((line, i) => (
                    <p key={i} style={{ opacity: 1 - i * 0.15 }}>{line}</p>
                ))}
            </div>

            {winner && (
                <div className="battle-result">
                    <h1 className="battle-result-text">{winner === "B" ? "Victoire" : "Défaite"}</h1>
                </div>
            )}
        </div>
    );
}

function FighterDisplay({ fighter, side, hit, damage, effectiveness, isCritical }) {
    const hpPercent = Math.max(0, (fighter.hp / fighter.maxHp) * 100);

    return (
        <div className={`fighter fighter-${side} ${hit ? "hit" : ""}`}>
            <div className="fighter-name">{fighter.id}</div>
            <div className="fighter-type">{fighter.type}</div>
            <div className="hp-bar-container">
                <div
                    className="hp-bar"
                    style={{
                        width: `${hpPercent}%`,
                        backgroundColor: hpPercent > 50 ? "#4caf50" : hpPercent > 20 ? "#ffb300" : "#e53935",
                    }}
                />
            </div>
            <div className="hp-text">{fighter.hp} / {fighter.maxHp}</div>
            <img src={`https://raw.githubusercontent.com/LucasMastrovito/GaChat/main/public/${fighter.id.toLowerCase()}.gif`} alt={fighter.id} className="fighter-image gif_collec shadow-gif" />
            {damage != null && <div className={`damage-popup ${isCritical ? "critical" : ""}`}>-{damage}</div>}
            {isCritical && <div className="critical-popup">CRITIQUE !</div>}
            {effectiveness && <div className="effectiveness-popup">{effectiveness}</div>}
        </div>
    );
}

export default Arena;

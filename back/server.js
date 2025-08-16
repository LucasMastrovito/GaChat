const { randomInt } = require('crypto');
const express = require('express')
const app = express()
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

const port = 3000
const db = require('./db.js')
db();
const User = require('./UserSchema');
const fs = require('fs')

const catsData = JSON.parse(fs.readFileSync('cats.json','utf8'));

async function createUser(id) {
    const user = new User({
        id: id,
        name: id === 1 ? "Lucas" : "Alix"
    });

    await user.save();
    console.log("Utilisateur créé !");
}

app.get('/summon/:type/:user', async (req, res) => {
    const type = req.params.type;
    const userId = parseInt(req.params.user);
    let user = await User.findOne({ id: userId });

    if (!user) {
        createUser(userId);
        user = await User.findOne({ id: userId });
    }
    const luck = randomInt(100);
    var rarity = 'basique';

    if (type === 'basic') {
        if (user.attemps > 0) {
            user.attemps--;
            if (luck >= 95) {
                rarity = 'divin';
            } else if (luck >= 90) {
                rarity = 'legendary';
            } else if (luck >= 70) {
                rarity = 'mythic';
            } else if (luck >= 40) {
                rarity = 'rare';
            }
        } else {
            res.json({basic: user.attemps, rare: user.attempsRare, mythic: user.attempsMythic, legendary: user.attempsLegendary});
        }
    } else if (type === 'rare') {
        if (user.attempsRare > 0) {
            user.attempsRare--;
            rarity = 'rare';
        } else {
            res.json({basic: user.attemps, rare: user.attempsRare, mythic: user.attempsMythic, legendary: user.attempsLegendary});
        }
    } else if (type === 'mythic') {
        if (user.attempsMythic > 0) {
            user.attempsMythic--;
            rarity = 'mythic';
        } else {
            res.json({basic: user.attemps, rare: user.attempsRare, mythic: user.attempsMythic, legendary: user.attempsLegendary});
        }
    } else if (type === 'legendary') {
        if (user.attempsLegendary > 0) {
            user.attempsLegendary--;
            rarity = 'legendary';
        } else {
            res.json({basic: user.attemps, rare: user.attempsRare, mythic: user.attempsMythic, legendary: user.attempsLegendary});
        }
    }
    pool = catsData.filter(cat => cat.rarity === rarity);
    const randomIndex = Math.floor(Math.random() * pool.length);
    const randomCat = pool[randomIndex];

    const count = user.invocations.get(randomCat.id) || 0;
    user.invocations.set(randomCat.id, count + 1);

    await user.save();
    res.json(randomCat);
})

app.get('/total', (req, res) => {
    res.send(catsData.length);
})

app.get('/getcat/:id', (req, res) => {
    const id = req.params.id;
    res.json(catsData.find(cat => cat.id === id));
})

app.get('/collection/:user', async (req, res) => {
    const userId = parseInt(req.params.user);
    const user = await User.findOne({ id: userId });
    const invocationsObj = Object.fromEntries(user.invocations);

    const collection = Object.entries(invocationsObj).map(([chatId, count]) => {
        const cat = catsData.find(c => c.id === chatId);
        return {
            id: chatId,
            count,
            rarity: cat ? cat.rarity : 'unknown'
        };
    });
    res.json(collection);
})

app.get('/attemps/:user', async (req, res) => {
    const userId = parseInt(req.params.user);
    const user = await User.findOne({ id: userId });
    const now = new Date();
    const resetDelay = 8 * 60 * 60 * 1000;

     if (!user.lastreset || now - new Date(user.lastreset) >= resetDelay) {
        user.attemps += 5;
        user.lastreset = now;
        await user.save();
        console.log('Attemps reset for ' + user.name + ' at ' + now);
    }

    res.json({basic: user.attemps, rare: user.attempsRare, mythic: user.attempsMythic, legendary: user.attempsLegendary});
})

app.get('/kibbles/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await User.findOne({ id: userId });

    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    const now = new Date();
    const lastClaim = new Date(user.lastConnexion);
    const isAnotherDay = now.toDateString() !== lastClaim.toDateString();

    if (isAnotherDay) {
        user.kibbles += 20;
        user.lastConnexion = now;
        await user.save();
    }

    res.json({ kibbles: user.kibbles });
});

app.get('/buysummon/:type/:userId', async (req, res) => {
    const type = req.params.type;
    const userId = parseInt(req.params.userId);
    const user = await User.findOne({ id: userId });

    if (type === 'basic' && user.kibbles >= 100) {
        user.kibbles -= 100;
        user.attemps += 1;
        await user.save();
        res.send('buy');
    } else if (type === 'rare' && user.kibbles >= 150) {
        user.kibbles -= 150;
        user.attempsRare += 1;
        await user.save();
        res.send('buy rare');
    } else if (type === 'mythic' && user.kibbles >= 300) {
        user.kibbles -= 300;
        user.attempsMythic += 1;
        await user.save();
        res.send('buy mythic');
    } else if (type === 'legendary' && user.kibbles >= 500) {
        user.kibbles -= 500;
        user.attempsLegendary += 1;
        await user.save();
        res.send('buy legendary');
    }
    res.send('error');
})

app.get('/summonAchievements/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await User.findOne({ id: userId });
    let totalRewards = 0;

    const totalInvocations = [...user.invocations.values()].reduce((a, b) => a + b, 0);
    let currentLevel = user.achievements.invocations || 0;

    if (totalInvocations >= (currentLevel + 1) * 10) {
        currentLevel++;
        totalRewards += currentLevel * 10;
    }

    user.achievements.invocations = currentLevel;
    user.kibbles += totalRewards;
    await user.save();

    res.json({kibbles: totalRewards, achievements: user.achievements});
})

app.get('/collectionAchievements/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await User.findOne({ id: userId });
    let totalRewards = 0;

    const uniqueCats = user.invocations.size;
    let colLevel = user.achievements.collection || 0;

    if (uniqueCats >= (colLevel + 1) * 10) {
        colLevel++;
        totalRewards += colLevel * 100;
    }
    user.achievements.collection = colLevel;
    user.kibbles += totalRewards;
    await user.save();

    res.json({kibbles: totalRewards, achievements: user.achievements});
})

app.get('/rarityAchievements/:type/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await User.findOne({ id: userId });
    const type = req.params.type;
    const reward = { rare: 10, mythic: 30, legendary: 50, divin: 100};
    let totalRewards = 0;

    if (!user.achievements.rarity) user.achievements.rarity = {};
        let rarityCount = 0;

    for (let [catId, count] of user.invocations.entries()) {
        const cat = catsData.find(c => c.id == catId);
        if (cat && cat.rarity === type) {
            rarityCount += count;
        }
    }
    let rarityLevel = user.achievements.rarity.get(type) || 0;
    if (rarityCount >= (rarityLevel + 1) * 3) {
        rarityLevel++;
        totalRewards += rarityLevel * reward[type];
    }
    user.achievements.rarity.set(type, rarityLevel);
    user.kibbles += totalRewards;
    await user.save();

    res.json({kibbles: totalRewards, achievements: user.achievements});
})

app.get('/getAchievements/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = await User.findOne({ id: userId });

    res.json(user.achievements);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
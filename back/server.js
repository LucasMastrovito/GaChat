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

app.get('/summon/:user', async (req, res) => {
    const userId = parseInt(req.params.user);
    let user = await User.findOne({ id: userId });

    if (!user) {
        createUser(userId);
        user = await User.findOne({ id: userId });
    }

    const todayStr = new Date().toDateString(); // ex: "Wed Aug 14 2025"
    const lastResetStr = user.lastreset ? new Date(user.lastreset).toDateString() : null;

    if (lastResetStr !== todayStr) {
        user.attemps = 5; // reset quotidien
        user.lastreset = new Date(); // on garde la date complète pour info
    }

    if (user.attemps === 0) {
        res.json({'attemps': 0});
    } else {
        const luck = randomInt(100);
        var rarity = 'basique';
        console.log(user)
        user.attemps--;
        if (luck >= 95) {
        rarity = 'divin';
        }
        else if (luck >= 90) {
            rarity = 'legendary';
        } else if (luck >= 70) {
            rarity = 'mythic';
        } else if (luck >= 40) {
            rarity = 'rare';
        }
        pool = catsData.filter(cat => cat.rarity === rarity);
        const randomIndex = Math.floor(Math.random() * pool.length);
        const randomCat = pool[randomIndex];

        const count = user.invocations.get(randomCat.id) || 0;
        user.invocations.set(randomCat.id, count + 1);

        await user.save();
        res.json(randomCat);
    }
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
    user = await User.findOne({ id: userId });

     const invocationsObj = Object.fromEntries(user.invocations);

    const collection = Object.entries(invocationsObj).map(([chatId, count]) => {
        const cat = catsData.find(c => c.id === chatId);
        return {
            id: chatId,
            count,
            rarity: cat ? cat.rarity : 'unknown'
        };
    });
    console.log(collection)
    res.json(collection);
})

app.get('/attemps/:user', async (req, res) => {
    const userId = parseInt(req.params.user);
    user = await User.findOne({ id: userId });

    res.json(user.attemps);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
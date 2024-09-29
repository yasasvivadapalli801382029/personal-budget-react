const express = require('express');
const cors = require('cors');

const PORT = 5000;
const app = express();

app.use(cors());
const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: 'Rent',
            budget: 275
        },
        {
            title: 'Grocery',
            budget: 110
        },
    ]
};

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.listen(PORT, () => {
    console.log(`API served at http://localhost:${PORT}`);
});

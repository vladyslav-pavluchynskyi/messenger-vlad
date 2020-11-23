const express = require("express");
const bodyParser = require("body-parser");
const faker = require('faker');
var moment = require('moment'); // require
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors({origin: '*'}));
app.get("/", (req, res) => {
    res.json({ message: "Это стартовая страница нашего приложения" });
});

app.get("/dialogList", (req, res) => {
    let numberOfList = faker.random.number({min: 1, max: 10});
    const array = [];
    while (array.length!==numberOfList){
        array.push(faker.company.companyName())
    }

    res.json({ dialogList: array });
});

app.get("/message-list", (req, res) => {
    const statuses = ['online', 'not-active', 'offline'];
    let numberOfList = faker.random.number({min: 1, max: 10});
    const array = [];
    while (array.length!==numberOfList){
        let status = faker.random.arrayElement(statuses);
        array.push({
            lastMessage: {
                message: faker.lorem.sentence(),
                time: moment(faker.time.recent()).format('h:mm a')
            },
            name: faker.name.findName(),
            photo: faker.random.image(),
            status: status
        })
    }

    res.json({ messageList: array });
});

app.get("/user-info", (req, res) => {
    let userInfo = {
        name: faker.name.findName(),
        city: faker.address.city(),
        photo: faker.random.image(),
        nickName: faker.commerce.productName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        dob: moment(faker.date.past()).format('MMMM D, YYYY'),
        gender: faker.name.gender(),
        languages: "English, Spanish"
    };

    res.json({ userInfo: userInfo });
});

app.get("/dialog", (req, res) => {
    const senders = ['me', 'opponent'];
    const numberOfList = faker.random.number({min: 5, max: 10});
    const messages = [];
    while (messages.length!==numberOfList){
        const sender = faker.random.arrayElement(senders);
        messages.push({
            sender,
            message: faker.lorem.sentence(),
            time: moment(faker.time.recent()).format('h:mm a')
        })
    }

    const dialog = {
        opponentPhoto: faker.random.image(),
        photo: faker.random.image(),
        messages
    };

    res.json({ dialog: dialog });
});



app.listen(3001, () => {
    console.log("Server start on 3001 port");
});

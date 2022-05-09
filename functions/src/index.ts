import functions = require("firebase-functions");
import express = require("express");
import cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(
  process.env.API_KEY
);

const app = express();

app.use(cors({origin: "*"}));
app.use(express.json());

app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;

    //console.log("Payment request received for this amount", total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
    });
    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
    response.end();
});

exports.api = functions.https.onRequest(app);

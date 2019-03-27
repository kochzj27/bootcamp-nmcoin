// Express Framework
const express = require("express");
const axios = require("axios");
const app = express();

// Body Parser Library for Post Data
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static Route to Serve the React App
app.use(express.static("../nmcoin/build/"));



// RESTFUL ROUTES:

// GET ALL
app.get("/transactions", (request, response) => {
  axios.get('http://5c953cd2498269001487f228.mockapi.io/nmcoin')
    .then((res) => {
      axios.get('http://5c953cd2498269001487f228.mockapi.io/nmCoinValues')
        .then((resp) => {
          var recent = resp.data[resp.data.length - 1];
          response.json({
            payload: res.data,
            coinValue: recent.coinValue,
            ownedCoins: recent.ownedCoins,
            mktCoins: recent.mktCoins,
            status: true
          })
        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch((err) => {
      console.log(err);
    });
})

// // GET 1
app.get("/transactions/:id", (request, response) => {
  axios.get(`http://5c953cd2498269001487f228.mockapi.io/nmcoin/${request.params.id}`)
    .then((resp) => {
      console.log(resp)
      response.json({
        payload: resp.data,
        status: true
      })
    })
    .catch((error) => {
      console.log(error)
    })
})


// CREATE 1
app.post("/transactions", (request, response) => {
  let title = request.body.title;
  let amount = request.body.amount;
  let value = request.body.value;
  let coinValue = request.body.coinValue;
  let ownedCoins = request.body.ownedCoins;
  let mktCoins = request.body.mktCoins;
  axios.post('http://5c953cd2498269001487f228.mockapi.io/nmcoin', { title: title, amount: amount, value: value })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err)
    })
  axios.post('http://5c953cd2498269001487f228.mockapi.io/nmCoinValues', { coinValue: coinValue, ownedCoins: ownedCoins, mktCoins: mktCoins })
  response.json({
    status: true,
  })
})

// // DELETE 1
// app.delete("/tasks/:id", (request, response) => {
//   for (var i = 0; i < tasks.length; i++) {
//     if (tasks[i].id == request.params.id) {
//       tasks.splice(i, 1);
//       break;
//     }
//   }
//   response.json({
//     status: true,
//     tasks: tasks
//   })
// })

// // UPDATE 1
// app.put("/tasks/:id", (request, response) => {
//   console.log(request.body);
//   console.log(request.params.id);
//   for (var i = 0; i < tasks.length; i++) {
//     if (tasks[i].id == request.params.id) {
//       tasks[i] = Object.assign({}, tasks[i], request.body);
//     }
//   }
//   response.json({
//     status: true,
//     tasks: tasks
//   })
// })


// SERVER LISTENING
app.listen(1337, () => {
  console.log("Server Listening ... port 1337")
});
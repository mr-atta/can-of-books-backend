"use strict";

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;
const server = express();
server.use(cors());
const { req, res } = require("express");
server.use(express.json());
// ////////////////////////////////////////////
const myUserModel = require("./schemas");
// /////////////////////////////////////////////

// mongodb://mohammad-301:STEp3LoFZ1sd77dK@cluster0-shard-00-00.ee5hg.mongodb.net:27017,cluster0-shard-00-01.ee5hg.mongodb.net:27017,cluster0-shard-00-02.ee5hg.mongodb.net:27017/books?ssl=true&replicaSet=atlas-egfe3y-shard-0&authSource=admin&retryWrites=true&w=majority
//
mongoose.connect("mongodb://localhost:27017/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// seed function (add data maneul)
function seedOwerCollection() {
  const mohammad = new myUserModel({
    email: "mohammadatta97@gmail.com",
    books: [
      {
        name: "The Big Short",
        description:
          "A description of the events leading up to the 2007-2008 world financial crisis by financial journalist Michael Lewis, this bestselling non-fiction book spent 28 weeks on the New York Times bestseller list.",
        states: "Michael Lewis ",
        img: "https://upload.wikimedia.org/wikipedia/en/2/2f/Big-short-inside-the-doomsday-machine.jpg",
      },
      {
        name: "Boom and Bust: A Global History of Financial Bubbles",
        description:
          "Why do stock and housing markets sometimes experience amazing booms followed by massive busts and why is this happening more and more frequently?",
        states: " David John Turner and William Quinn ",
        img: "http://assets.cambridge.org/97811084/21256/cover/9781108421256.jpg",
      },
      {
        name: "War and Peace",
        description:
          "War and Peace is a literary work mixed with chapters on history and philosophy by the Russian author Leo Tolstoy, first published serially, then published in its entirety in 1869.",
        states: "Leo Tolstoy",
        img: "https://images.penguinrandomhouse.com/cover/9781400079988",
      },
    ],
  });
  mohammad.save();
}
// call the function
// seedOwerCollection();

// ///////////////////////////////////////////////////////////

// proof of life
server.get("/", (req, res) => {
  res.send("its working");
});

// http://localhost:3002/books?email=mohammadatta97@gmail.com
server.get("/books", getFavBook); // read
//
server.post("/addbook", addNewBook); // add
//
server.delete("/deletebook/:id", deleteBook); // delete
//
server.put("/updatebook/:id", updateBook); // update

// //////////////////  functions  /////////////////////
// get book (raed)
function getFavBook(req, res) {
  let { email } = req.query;
  // let userNameo = req.query.userName;
  // or // let {userName} = req.query;

  myUserModel.find({ email: email }, (error, userData) => {
    if (error) {
      res.send("we have error");
    } else {
      res.send(userData[0].books);
    }
    // console.log(userData);
  });
}
//add New Book
function addNewBook(req, res) {
  const { bookName, description, imgUrl, state, email } = req.body;
  myUserModel.find({ email: email }, (error, newData) => {
    if (error) {
      response.send("something went wrong POST");
    } else {
      newData[0].books.push({
        name: bookName,
        description: description,
        img: imgUrl,
        states: state,
      });
      // console.log(newData[0].books);
      newData[0].save();
      res.send(newData[0].books);
    }
  });
}
//delete the selected Book
function deleteBook(req, res) {
  let { email } = req.query;
  let index = Number(req.params.id);
  myUserModel.find({ email: email }, (error, newData) => {
    if (error) {
      res.send("something error , DELETE");
    } else {
      const response = newData[0].books.filter((element, idx) => {
        if (idx !== index) {
          return element;
        }
      });
      newData[0].books = response;
      // console.log( newData[0].books);
      newData[0].save();
      res.send(newData[0].books);
    }
  });
}
// update the selected Book
function updateBook(req, res) {
  const { bookName, description, imgUrl, state, email } = req.body;
  let index = Number(req.params.id);
  myUserModel.findOne({ email: email }, (error, newData) => {
    if (error) {
      response.send("something went wrong PUT");
    } else {
      // console.log(newData);
      newData.books.splice(index, 1, {
        name: bookName,
        description: description,
        img: imgUrl,
        states: state,
      });
    }
    console.log(newData);
    newData.save();
    res.send(newData.books);
  });
}

//
// listen
server.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

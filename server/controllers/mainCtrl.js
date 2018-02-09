const axios = require("axios");
const baseUrl = "https://bibler-server.prestonlee.com";

let favorites = [
  {
    id: 0,
    title: "Proverbs 3 : 5",
    text:
      "Trust in Jehovah with all thy heart, And lean not upon thine own understanding"
  }
];
let id = 1;

const getBibles = (req, res, next) => {
  axios
    .get(`${baseUrl}/bibles.json`)
    .then(response => {
      console.log(response.data);
      bibles = response.data;
      res.status(200).json(bibles);
    })
    .catch(console.log);
};

const getBooks = (req, res, next) => {
  axios
    .get(`${baseUrl}/books.json`)
    .then(response => {
      books = response.data;
      res.status(200).json(books);
    })
    .catch(console.log);
};

const getChapters = (req, res, next) => {
  let versionID = req.params.version;
  let bookID = req.params.book;
  axios
    .get(`${baseUrl}/${versionID}/${bookID}.json`)
    .then(response => {
      chapters = response.data;
      console.log("getChapters responded");
      res.status(200).json(chapters);
    })
    .catch(console.log);
};

const getVerses = (req, res, next) => {
  let versionID = req.params.version;
  let bookID = req.params.book;
  let chapterID = req.params.chapter;
  axios
    .get(`${baseUrl}/${versionID}/${bookID}/${chapterID}.json`)
    .then(response => {
      verses = response.data;
      res.status(200).json(verses);
    })
    .catch(console.log);
};

const favoriteVerse = (req, res, next) => {
  const { title, text } = req.body;
  favorites.push({ id, title, text });
  id++;
  res.status(200).send(favorites);
  console.log("functioning");
};

const favoriteVerses = (req, res, next) => {
  res.status(200).json(favorites);
  console.log(favorites);
};

const unfavorite = (req, res, next) => {
  const deleteID = req.params.id;
  let verseID = favorites.findIndex(verse => verse.id == deleteID);
  console.log(deleteID);
  console.log(verseID);
  favorites.splice(verseID, 1);
  res.status(200).json(favorites);
  console.log(favorites);
};

module.exports = {
  getBibles,
  getBooks,
  getChapters,
  getVerses,
  favoriteVerse,
  favoriteVerses,
  unfavorite
};

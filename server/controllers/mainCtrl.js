const axios = require("axios");
const baseUrl = "https://bibler-server.prestonlee.com";

let bibles = [];
let books = [];
let chapters = [];
let verses = [];
let favoriteVerses = [];

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
  let titleID = req.params.version;
  let verseText = req.params.book;
};

module.exports = {
  getBibles,
  getBooks,
  getChapters,
  getVerses
};

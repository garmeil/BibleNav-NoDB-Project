import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Selector from "./components/Selector";
import Passage from "./components/Passage";
import Favorites from "./components/Favorites";
import FavoriteButton from "./components/FavoriteButton";

class App extends Component {
  constructor() {
    super();
    this.state = {
      version: {},
      versions: [],
      book: {},
      books: [],
      chapter: "",
      chapters: [],
      verse: {},
      verses: [],
      randomVerse: {},
      updateState: false
    };
    this.getChaps = this.getChaps.bind(this);
    this.getVerses = this.getVerses.bind(this);
    this.updateVersion = this.updateVersion.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.updateChapter = this.updateChapter.bind(this);
    this.updateVerse = this.updateVerse.bind(this);
    this.updateState = this.updateState.bind(this);
  }
  componentDidMount() {
    axios
      .get("/api/versions")
      .then(response => {
        this.setState({
          version: response.data[0],
          versions: response.data
        });
      })
      .then(response => {
        axios
          .get(`/api/books`)
          .then(response => {
            this.setState({
              book: response.data[0],
              books: response.data
            });
          })
          .then(response => {
            this.getChaps(this.state.version.slug, this.state.book.slug);
          });
      });
  }
  componentDidUpdate() {}
  getChaps(version, book) {
    let urlParam = version + "/" + book;
    console.log("This URL PARAMETER: " + urlParam);
    axios
      .get(`/api/chapters/${urlParam}`)
      .then(response => {
        console.log("!@!@!@!xyz", urlParam);
        this.setState({
          chapter: response.data[0],
          chapters: response.data
        });
      })
      .then(response => {
        this.getVerses(
          this.state.version.slug,
          this.state.book.slug,
          this.state.chapter
        );
      });
  }
  getVerses(version, book, chapter) {
    let urlParam = version + "/" + book + "/" + chapter;
    console.log(urlParam);
    axios.get(`/api/verses/${urlParam}`).then(response => {
      this.setState({
        verse: response.data[0],
        verses: response.data
      });
    });
  }
  updateVersion(event) {
    let answer = this.state.versions.filter(val => {
      return val.name === event.target.value;
    });
    this.setState(
      { version: answer[0] },
      this.getChaps(answer[0].slug, this.state.book.slug)
    );
  }
  updateBook(event) {
    let answer = this.state.books.filter(val => {
      return val.name === event.target.value;
    });
    console.log(answer);
    this.setState(
      { book: answer[0] },
      this.getChaps(this.state.version.slug, answer[0].slug)
    );
    console.log(this.state.book.slug);
  }
  updateChapter(event) {
    this.setState(
      { chapter: event.target.value },
      this.getVerses(
        this.state.version.slug,
        this.state.book.slug,
        event.target.value
      )
    );
  }
  updateVerse(event) {
    let newanswer = this.state.verses.filter(val => {
      return val.slug == event.target.value;
    });
    this.setState({ verse: newanswer[0] });
  }

  updateState() {
    this.setState({ updateState: !this.state.updateState });
  }

  render() {
    let chapterList = Array.from(new Set(this.state.chapters));
    let verseList = this.state.verses.map((val, index) => Number(val.slug));
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bible Navigator</h1>
          <p className="App-intro">
            To get started select a book, chapter, verse combination.
          </p>
        </header>
        <h1>{this.state.version.name}</h1>
        <div className="Selectors">
          <Selector
            criteria={this.state.versions}
            onChange={e => this.updateVersion(e)}
          />
          <Selector
            criteria={this.state.books}
            onChange={e => this.updateBook(e)}
          />
          <Selector
            criteria={Array.from(new Set(this.state.chapters))}
            onChange={e => this.updateChapter(e)}
          />
          <Selector criteria={verseList} onChange={e => this.updateVerse(e)} />
        </div>
        <div className="flex center">
          <Passage
            title={`${this.state.book.name} ${this.state.chapter} :
        ${this.state.verse.ordinal}`}
            text={this.state.verse.text}
            className="VerseHolder"
          >
            <FavoriteButton
              title={`${this.state.book.name} ${this.state.chapter} : ${
                this.state.verse.ordinal
              }`}
              text={this.state.verse.text}
              updateState={this.updateState}
            />
          </Passage>
        </div>

        <Favorites
          updateVerse={this.updateVerse}
          updateState={this.state.updateState}
          updateStateFnc={this.updateState}
        />
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Selector from "./components/Selector";

class App extends Component {
  constructor() {
    super();
    this.state = {
      version: {},
      versions: [],
      versionID: 0,
      book: {},
      books: [],
      bookID: 0,
      chapter: "",
      chapters: [],
      chapterID: 0,
      verse: {},
      verses: [],
      verseID: 0,
      randomVerse: {}
    };
    this.getChaps = this.getChaps.bind(this);
    this.getVerses = this.getVerses.bind(this);
    this.updateVersion = this.updateVersion.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.updateChapter = this.updateChapter.bind(this);
    this.updateVerse = this.updateVerse.bind(this);
  }
  componentDidMount() {
    axios
      .get("/api/versions")
      .then(response => {
        this.setState({
          version: response.data[0],
          versions: response.data,
          versionID: response.data[0].id
        });
      })
      .then(response => {
        axios
          .get(`/api/books`)
          .then(response => {
            this.setState({
              book: response.data[0],
              books: response.data,
              bookID: response.data[0].id
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
        <h2>
          {this.state.book.name} {this.state.chapter} : {this.state.verse.slug}
        </h2>
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
        <div className="Box-Container">
          <div className="VerseHolder">{this.state.verse.text}</div>
        </div>

        <button
          onClick={() => {
            console.log(this.state.chapter, this.state.verse);
          }}
          //<Favorites verse={this.state.verse.text} />
        />
      </div>
    );
  }
}

export default App;

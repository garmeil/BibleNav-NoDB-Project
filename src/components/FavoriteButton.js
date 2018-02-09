import React, { Component } from "react";
import axios from "axios";

export default class FavoriteButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updated: false
    };
    this.favorite = this.favorite.bind(this);
  }
  favorite() {
    axios
      .post("/api/favorite", {
        title: this.props.title,
        text: this.props.text
      })
      .then(response => {
        this.props.updateState();
      });
  }
  render() {
    return (
      <div className="favoriteButton" onClick={this.favorite}>
        Favorite
      </div>
    );
  }
}

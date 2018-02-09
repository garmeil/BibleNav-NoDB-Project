import React from "react";
import axios from "axios";

export default class DeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }
  deleteFavorite() {
    axios.delete(`/api/unfavorite/${this.props.id}`);
    this.props.updateState();
  }
  render() {
    return (
      <div onClick={this.deleteFavorite} className="deleteButton">
        Delete
      </div>
    );
  }
}

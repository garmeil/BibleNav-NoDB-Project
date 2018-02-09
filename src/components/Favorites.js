import React from "react";
import axios from "axios";
import Passage from "./Passage";
import DeleteButton from "./DeleteButton";

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      updateState: true
    };
  }
  componentDidMount() {
    axios.get("/api/favorites").then(response =>
      this.setState({
        favorites: response.data
      })
    );
  }
  componentWillReceiveProps() {
    axios.get("/api/favorites").then(response =>
      this.setState({
        favorites: response.data
      })
    );
  }

  render() {
    return (
      <div className="flex wrap">
        {this.state.favorites.length > 0 &&
          this.state.favorites.map((val, index) => {
            return (
              <Passage
                key={index}
                title={val.title}
                text={val.text}
                className="FavHolder"
              >
                <DeleteButton
                  id={index}
                  updateState={this.props.updateStateFnc}
                />
              </Passage>
            );
          })}
      </div>
    );
  }
}

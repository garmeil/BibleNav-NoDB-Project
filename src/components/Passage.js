import React from "react";

export default class Passage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className={this.props.className}>
          <h2>
            {this.props.title ||
              `${this.props.book.name} ${this.props.chapter} :
        ${this.props.verse.ordinal}`}
          </h2>
          {this.props.text}
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

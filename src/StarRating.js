import React, { Component } from "react";
import PropTypes from "prop-types";
import "font-awesome/css/font-awesome.min.css";

class StarRating extends Component {
  static propTypes = {
    averageRating: PropTypes.number
  };

  static defaultProps = {
    averageRating: 0
  };

  render() {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= this.props.averageRating)
        stars.push(<span className="star on" key={i} />);
      else if ((i - this.props.averageRating) < 1)
        stars.push(<span className="star half" key={i} />);
      else stars.push(<span className="star" key={i} />);
    }

    return <div className="stars">{stars}</div>;
  }
}

export default StarRating;

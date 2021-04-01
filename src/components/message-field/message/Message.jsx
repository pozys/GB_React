import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";

const StyledCard = withStyles(() => {
  return {
    root: {
      "&": {
        backgroundColor: "lightblue",
        padding: "5px 15px",
        borderRadius: "20px",
        fontSize: "18px",
        margin: "5px",
      },
    },
  };
})(Card);

export class Message extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  };

  render() {
    return (
      <StyledCard>
        <b>{this.props.author}</b>
        {": " + this.props.text}
      </StyledCard>
    );
  }
}

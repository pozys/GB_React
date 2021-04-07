import React from "react"
import { withStyles } from "@material-ui/core"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"

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
  }
})(Card)

export class Message extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    createdAt: PropTypes.object.isRequired,
  }

  render() {
    const { author, text, createdAt } = this.props
    const dateOptions = { hour: "numeric", minute: "numeric" }

    return (
      <StyledCard>
        <Typography
          paragraph
          component="span"
          variant="body1"
          color="textPrimary"
        >
          <b>{author}</b>
          {": " + text}
        </Typography>
        <Typography
          component="div"
          variant="body1"
          color="textPrimary"
          align="right"
        >
          {createdAt.toLocaleString("ru", dateOptions)}
        </Typography>
      </StyledCard>
    )
  }
}

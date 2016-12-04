import React from 'react';
import { Button } from 'react-bootstrap'

class FirstButton extends React.Component{
  render () {
    return (
      <span >

        <Button
          type = "submit"
          name = "submit"
          bsStyle = "primary"
          value = "1st"
          onClick = {
            this.props.onClick
          }>
          Take First Snapshot </Button>

      </span>
    );
  }
};

export default FirstButton;

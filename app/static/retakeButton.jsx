import React from 'react';
import { Button } from 'react-bootstrap'

class RetakeButton extends React.Component{
  render() {
    return (
      <span>

        <Button
          type = "submit"
          name = "submit"
          value = "2nd"
          onClick = {
            this.props.onClick
          }
          bsStyle = "primary"
          //disabled = {!this.props.data}
          >
          Take Second Snapshot </Button>

      </span>
    );
  }
};

export default RetakeButton;

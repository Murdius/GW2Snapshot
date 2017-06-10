import React, {PropTypes} from 'react'
import {Button} from 'react-bootstrap';

const RetakeButton = ({onClick, apiKey}) => (
    <span>
        <Button type="button" name="submit" value="2nd" onClick= {()=>onClick(apiKey)} bsStyle="primary" //disabled = {!this.props.data}
        >
            Take Second Snapshot
        </Button>
    </span>
)

export default RetakeButton;

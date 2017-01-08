import React, {PropTypes} from 'react'
import {Button} from 'react-bootstrap';

const FirstButton = ({onClick, apiKey}) => (
    <span>
        <Button type="submit" name="submit" onClick= {()=>onClick(apiKey)} bsStyle="primary">
            Take First Snapshot
        </Button>
    </span>
)

export default FirstButton;

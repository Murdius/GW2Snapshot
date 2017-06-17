import React, {PropTypes} from 'react'
import RetakeSnapshot from '../containers/RetakeSnapshot'
import FirstButtonContainer from '../containers/FirstButtonContainer'

const ButtonGroup = () => (
    <div>
        <FirstButtonContainer/>
        <RetakeSnapshot/>
    </div>
)

ButtonGroup.propTypes = {}

export default ButtonGroup

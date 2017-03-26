import React, {PropTypes} from 'react';

const Status = ({status}) => (
    <p>
        {status}
    </p>
)
Status.propTypes = {
    status: PropTypes.string.isRequired
}

export default Status

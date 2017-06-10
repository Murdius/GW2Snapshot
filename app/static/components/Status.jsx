import React, {PropTypes} from 'react';

const Status = ({status}) => {
    if (status == "TAKING FIRST" || status == "TAKING SECOND") {
        return <div className="alert alert-info" role="alert">
            <span className="glyphicon glyphicon-refresh"></span>
            {status}
        </div>
    } else {
        return <div className="alert alert-success" role="alert">
            <span className="glyphicon glyphicon-ok"></span>
            {status}
        </div>
    }
};
Status.propTypes = {
    status: PropTypes.string.isRequired
}

export default Status

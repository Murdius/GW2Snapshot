import React from 'react';

class Disclaimer extends React.Component {
    render() {
        return (
            <div className="alert alert-warning" role="alert">
                Disclaimer: Each snapshot is inaccurate up to 5 mins.Do nothing for 5 mins before you take the first snapshot.Do nothing for 5 mins after your session and then take snapshot.Try clearing cookies if something breaks.
            </div>
        );
    }
}

export default Disclaimer;

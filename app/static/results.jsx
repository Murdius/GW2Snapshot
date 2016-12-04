import React from 'react';
import ResultsTable from './resultsTable.jsx'

class Results extends React.Component{
  render () {
    return (
      <div>

        {
          this.props.data.length ?
          <div>

            <p>

              {
                this.props.caption
              }
            </p>

            <ResultsTable
              cols = {
                this.props.cols
              }
              data = {
                this.props.data
              }
              />

          </div>
          : null
        }
      </div>
    );
  }
};

export default Results;

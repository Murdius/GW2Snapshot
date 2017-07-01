import React from 'react';
import Disclaimer from './disclaimer.jsx'
import Filter from './Filter.jsx';
import InputFieldContainer from '../containers/InputFieldContainer.js'
import RetakeSnapshot from '../containers/RetakeSnapshot.js'
import ButtonGroup from './buttonGroup.jsx'
import VisibleResults from '../containers/VisibleResults.js'
import StatusContainer from '../containers/StatusContainer.jsx'

const App = () => (
    <div>
        <div className="container">
            <Disclaimer/>
            <InputFieldContainer/>
            <ButtonGroup/>
            <Filter/>
            <StatusContainer/>
            <VisibleResults/>
        </div>
    </div>
)
export default App

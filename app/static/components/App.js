import React from 'react';
import Disclaimer from './disclaimer.jsx'
import Filter from './Filter.js';
import InputFieldContainer from '../containers/InputFieldContainer.js'
import RetakeSnapshot from '../containers/RetakeSnapshot.js'
import ButtonGroup from './ButtonGroup.js'
import VisibleResults from '../containers/VisibleResults.js'

const App = () => (
    <div>
        <div className="container">
            <Disclaimer/>
            <InputFieldContainer/>
            <ButtonGroup/>
            <Filter/>
            <VisibleResults/>
        </div>
    </div>
)
export default App

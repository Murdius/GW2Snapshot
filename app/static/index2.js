import {render} from 'react-dom';
import React from 'react';
import Disclaimer from './disclaimer.jsx'
import Form from './form.jsx';
import ResultsTable from './resultsTable.jsx'
import CommentForm from './commentForm.jsx'
import Results from './results.jsx'
import RetakeButton from './retakeButton.jsx'
import FirstButton from './firstButton.jsx'
//
//     render(
//       <Disclaimer / > ,
//         document.getElementById('disclaimer')
//       );
//
//       render(
//         <Form/> ,
//         document.getElementById('form')
//       );

class App extends React.Component {
  render () {
    return <p> Hello React!</p>;
  }
}
render(<Disclaimer/>, document.getElementById('disclaimer'));
render(<Form/>, document.getElementById('form'));

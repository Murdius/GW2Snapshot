import React from 'react';

import FirstButton from './firstButton.jsx';
import RetakeButton from './retakeButton.jsx';

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*" + name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

class CommentForm extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      button: '1',
      key: getCookie('key') ? getCookie('key') : '',
      submitted: ''
    };
    this.handleKeyChange = this.handleKeyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit1 = this.submit1.bind(this);
    this.submit2 = this.submit2.bind(this);
  }
  handleKeyChange (e) {
    this.setState({
      key: e.target.value
    });
  }
  handleSubmit (e) {
    e.preventDefault();
    var key = this.state.key.trim();
    if (!key) {
      return;
    }
    if (this.state.button === '1') {
      this.props.onCommentSubmit({
        key: key
      });
    } else {
      this.props.onCommentSubmit2({
        key: key
      });
    }
    document.cookie = "key=" + this.state.key
    this.setState({
      submitted: 'something'
    });
  }

  submit1 () {
    {
      this.setState({
        button: '1'
      })
    }
  }
  submit2() {
    {
      this.setState({
        button: '2'
      })
    }
  }

  render () {
    return (
      <form
        className = "commentForm"
        onSubmit = {
          this.handleSubmit
        } >


        <div className = "form-group" >


          <input
            type = "text"
            className = "form-control"
            name = "apiKey"
            id = "apiKey"
            value = {
              this.state.key
            }
            onChange = {
              this.handleKeyChange
            }
            />


        </div>


        <FirstButton onClick = {
            this.submit1
          }
          />


        <RetakeButton
          onClick = {
            this.submit2
          }
          data = {
            this.state.submitted
          }
          />


      </form>
    );
  }
};

export default CommentForm;

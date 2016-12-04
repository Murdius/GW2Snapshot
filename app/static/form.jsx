import React from 'react';
import CommentForm from './commentForm.jsx'
import Results from './results.jsx';

var item_cols = [
  {
    key: 'name',
    label: 'Name'
  }, {
    key: 'count',
    label: 'Count'
  }, {
    key: 'value',
    label: 'Value'
  }
];

class Form extends React.Component{
  constructor(props) {
    super(props);
    this.handleKeySubmit1 = this.handleKeySubmit1.bind(this);
    this.handleKeySubmit2 = this.handleKeySubmit2.bind(this);
    this.state = {
      data: [],
      wallet_data: [],
      item_data: [],
      zero_data: []
    };
  }
  handleKeySubmit1 (key) {
    $.ajax({
      url: "/snapshot",
      dataType: 'text',
      cache: false,
      type: 'POST',
      data: key,
      success: function (data) {
        this.setState({
          data: "First snapshot taken"
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleKeySubmit2(key) {
    $.ajax({
      url: "/wallet",
      cache: false,
      type: 'POST',
      dataType: 'html',
      data: key,
      success: function (data) {
        var parsed = JSON.parse(data);
        this.setState({
          wallet_data: parsed.list
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    $.ajax({
      url: "/item",
      cache: false,
      type: 'POST',
      dataType: 'html',
      data: key,
      success: function (data) {
        var parsed = JSON.parse(data);
        var self = this;
        var total_value = 0;
        parsed.data.condensed_list2.map(function(item){
          fetch('https://api.guildwars2.com/v2/commerce/prices/'+item['id']).then(function(response) {
            if(response.ok) {
              response.json().then(function(jsonData) {
                item['value'] = jsonData.sells.unit_price
                item['value'] = item['value'] * item['count']
                total_value += item['value']
                self.setState({
                  item_data: parsed.data.condensed_list2,
                  total_value : total_value
                });
              });
            } else {
              console.log('Network response was not ok.');
              item['value'] = 0;
              self.setState({
                item_data: parsed.data.condensed_list2
              });
            }
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
          });

        });
        this.setState({
          item_data: parsed.data.condensed_list2,
          zero_data: parsed.data.zero_value_items,
          data: "Second snapshot taken"
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }



  render () {
    return (
      <div className = "commentBox" >


        <label className = "control-label" > API Key < /label>



          <CommentForm
            onCommentSubmit = {
              this.handleKeySubmit1
            }
            onCommentSubmit2 = {
              this.handleKeySubmit2
            }
            />


          <p>


            {
              this.state.data
            }
          </p>



          <Results
            cols = {item_cols}
            data = {this.state.wallet_data}
            caption = "Wallet" />


          <Results
            cols = {item_cols}
            data = {this.state.item_data}
            caption = "All items" />


          {
            typeof this.state.total_value !== 'undefined' ?
            <p> Total value
              if sold: {
                this.state.total_value
              } </p>
              :
              null
            }
          </div>
        );
      }
    };

    export default Form;

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

var Disclaimer = React.createClass({
  render: function () {
    return (
      <div className = "disclaimer">
        <p> Disclaimer: Each snapshot is inaccurate up to 5 mins.Do nothing
          for 5 mins before you take the first snapshot.Do nothing
          for 5 mins after your session and then take snapshot.Try clearing cookies
          if something breaks. </p>
      </div>
    );
  }
});

var item_cols = [
  {
    key: 'name',
    label: 'Name'
  }, {
    key: 'count',
    label: 'Count'
  }, {
    key: 'copper',
    label: 'Copper'
  }
];

var wallet_cols = [
  {
    key: 'name',
    label: 'Name'
  }, {
    key: 'value',
    label: 'Count'
  }, {
    key: 'copper',
    label: 'Copper'
  }
];

var wallet_data_sample = [
  {
    "id": 1,
    "name": "Coin",
    "value": -305
  }
];

var item_data_sample = [
  {
    "id": 1,
    "name": "Coin",
    "count": 6,
    "value": -306
  }
];

const Table = ReactBootstrap.Table;
const Button = ReactBootstrap.Button;

var Results = React.createClass({
  render: function () {
    return (
      < div >
      {
        this.props.data.length ?
        < div >
        < p >
        {
          this.props.caption
        }
        < /p>
        < ResultsTable
        cols = {
          this.props.cols
        }
        data = {
          this.props.data
        }
        />
      < /div>
      : null
    }
    < /div>
  );
}
});

var ResultsTable = React.createClass({

  render: function () {
    var headerComponents = this.generateHeaders(),
    rowComponents = this.generateRows();

    return (
      <Table striped bordered condensed hover>
      <thead>
      <tr>
      {
        headerComponents
      }
      </tr>
      </thead>
      <tbody >
      {
        rowComponents
      }
      </tbody>
      </Table>
    )
  },

  generateHeaders: function () {
    var cols = this.props.cols; // [{key, label}]

    // generate our header (th) cell components
    return cols.map(function (colData) {
      return <th className="text-center" key = {
          colData.key
        } >
        {
          colData.label
        }
      </th>;
    }
  );
},

generateRows: function () {
  var cols = this.props.cols, // [{key, label}]
  data = this.props.data;

  return data.map(function (item) {
    // handle the column data within each row
    var cells = cols.map(function (colData) {
      if (colData.key === "name"){
      // colData.key might be "firstName"
      return <td className="col-md-6 col-xs-6" key = {
          item[colData.key]
        }>
        {
          item[colData.key]
        }
      </td>}
      else {
        return <td className="col-md-3 col-xs-3" key = {
            item[colData.key]
          }>
          {
            item[colData.key]
          }
        </td>
      }

    });
    return <tr key = {
        item.id
      } >
      {
        cells
      }
    </tr>;
  });
}
});

var FirstButton = React.createClass({
  render: function () {
    return (
      < span >
      < Button
      type = "submit"
      name = "submit"
      bsStyle = "primary"
      value = "1st"
      onClick = {
        this.props.onClick
      } >
      Take First Snapshot < /Button>
      < /span>
    );
  }
});

var RetakeButton = React.createClass({
  render: function () {
    return (
      < span >
      < Button
      type = "submit"
      name = "submit"
      value = "2nd"
      onClick = {
        this.props.onClick
      }
      bsStyle = "primary"
      //disabled = {!this.props.data}
      >
      Take Second Snapshot < /Button>
      < /span>
    );
  }
});

var CommentForm = React.createClass({
  getInitialState: function () {
    return {
      button: '1',
      key: getCookie('key') ? getCookie('key') : '',
      submitted: ''
    };
  },
  handleKeyChange: function (e) {
    this.setState({
      key: e.target.value
    });
  },
  handleSubmit: function (e) {
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
  },
  submit1: function () {
    {
      this.setState({
        button: '1'
      })
    }
  },
  submit2: function () {
    {
      this.setState({
        button: '2'
      })
    }
  },

  render: function () {
    return (
      < form
      className = "commentForm"
      onSubmit = {
        this.handleSubmit
      } >
      < div className = "form-group" >
      < input
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
    < /div>
    < FirstButton onClick = {
        this.submit1
      }
      />
    < RetakeButton
    onClick = {
      this.submit2
    }
    data = {
      this.state.submitted
    }
    />
  < /form>
);
}
});

var Form = React.createClass({
  handleKeySubmit1: function (key) {
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
  },
  handleKeySubmit2: function (key) {
    $.ajax({
      url: "/walletresults",
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
      url: "/itemresults",
      cache: false,
      type: 'POST',
      dataType: 'html',
      data: key,
      success: function (data) {
        var parsed = JSON.parse(data);
        this.setState({
          item_data: parsed.data.condensed_list2,
          zero_data: parsed.data.zero_value_items,
          total_value: parsed.data.total_value,
          data: "Second snapshot taken"
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return {
      data: [],
      wallet_data: [],
      item_data: [],
      zero_data: [],
      total_value: 0
    };
  },
  render: function () {
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
            cols = {wallet_cols}
            data = {this.state.wallet_data}
            caption = "Wallet" / >
            <Results
              cols = {item_cols}
              data = {this.state.item_data}
              caption = "All items" / >
              <Results
                cols = {item_cols}
                data = {this.state.zero_data}
                caption = "Zero value items" />
              {
                this.state.total_value ?
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
        });

        ReactDOM.render(
          <Disclaimer / > ,
            document.getElementById('disclaimer')
          );

          ReactDOM.render(
            <Form/> ,
            document.getElementById('form')
          );

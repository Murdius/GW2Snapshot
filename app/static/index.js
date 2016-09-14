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
        return ( < div className = "disclaimer" >
            < p > Disclaimer: Each snapshot is inaccurate up to 5 mins.Do nothing
            for 5 mins before you take the first snapshot.Do nothing
            for 5 mins after your session and then take snapshot.Try clearing cookies
            if something breaks. < /p> < /div > );
    }
});

var cols = [
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'count',
        label: 'Count'
    }
];

var data = [
    {
        id: 1,
        name: 'John',
        count: 'Doe'
    },
    {
        id: 2,
        name: 'Clark',
        count: 'Kent'
    }
];

const Table = ReactBootstrap.Table;

var Results = React.createClass({
    getInitialState: function () {
        return {
            showResults: false
        };
    },
    render: function () {
        return ( < div > {
            this.state.showResults ? < ResultTable / > : null
        } < /div>);
    }
});

var ResultTable = React.createClass({
    render: function () {
        var headerComponents = this.generateHeaders(),
            rowComponents = this.generateRows();
        return ( < Table striped bordered condensed hover >
            < thead > {
                headerComponents
            } < /thead>  < tbody > {
            rowComponents
        } < /tbody> < /Table >
    );
},
generateHeaders: function () {
    var cols = this.props.cols; // [{key, label}]

    // generate our header (th) cell components
    return cols.map(function (colData) {
        return <th key = {
            colData.key
        } > {
            colData.label
        } < /th>;
    });
},

generateRows: function () {
    var cols = this.props.cols, // [{key, label}]
        data = this.props.data;

    return data.map(function (item) {
        // handle the column data within each row
        var cells = cols.map(function (colData) {

            // colData.key might be "firstName"
            return <td > {
                item[colData.key]
            } < /td>;
        });
        return <tr key = {
            item.id
        } > {
            cells
        } < /tr>;
    });
}
});

var FirstButton = React.createClass({
    render: function () {
        var Button = ReactBootstrap.Button;
        return ( < span >
            < Button type = "submit"
            name = "submit"
            bsStyle = "primary"
            value = "1st"
            onClick = {
                this.props.onClick
            } > Take First Snapshot < /Button>< /span > );
    }
});

var RetakeButton = React.createClass({
    render: function () {
        var Button = ReactBootstrap.Button;
        return ( < span >
            < Button type = "submit"
            name = "submit"
            value = "2nd"
            onClick = {
                this.props.onClick
            }
            bsStyle = "primary"
            disabled = {
                !this.props.data
            } > Take Second Snapshot < /Button>< /span > );
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
        return ( < form className = "commentForm"
            onSubmit = {
                this.handleSubmit
            } >
            < div className = "form-group" >
            < input type = "text"
            className = "form-control"
            name = "apiKey"
            id = "apiKey"
            value = {
                this.state.key
            }
            onChange = {
                this.handleKeyChange
            }
            /> </div >
            < FirstButton onClick = {
                this.submit1
            }
            / > < RetakeButton onClick = {
            this.submit2
        }
        data = {
            this.state.submitted
        }
        /> < /form >
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
                    data: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleKeySubmit2: function (key) {
        $.ajax({
            url: "/results",
            cache: false,
            type: 'POST',
            dataType: 'html',
            data: key,
            success: function (data) {
                document.write(data);
            },

            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function () {
        return {
            data: []
        };
    },
    render: function () {
        return ( < div className = "commentBox" >
            < label className = "control-label" > API Key < /label> < CommentForm onCommentSubmit = {
            this.handleKeySubmit1
        }
        onCommentSubmit2 = {
            this.handleKeySubmit2
        }
        / >  < h1 > {
        this.state.data
    } < /h1>< /div >
);
}
});
ReactDOM.render( < Disclaimer / > , document.getElementById('disc'));
ReactDOM.render( < Form / > , document.getElementById('form'));
ReactDOM.render( < Results cols = {
            cols
        }
        data = {
            data
        }
        / > , document.getElementById('results'));
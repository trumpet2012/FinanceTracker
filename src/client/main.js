var React = require('react');
var ReactDOM = require('react-dom');


// tutorial1.js
var SimpleMessage = React.createClass({
  render: function() {
    return (
      <div className="simpleMessage">
          <h2 class="message">
            {this.props.message}
          </h2>
          {this.props.children}
      </div>
    );
  }
});

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
      <SimpleMessage message="This is a react component." />,
      document.getElementById('react-ele')
    );
});

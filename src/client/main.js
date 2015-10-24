var React = require('react');
var ReactDOM = require('react-dom');
var cx = require('classnames');


var SearchResult = React.createClass({
    render: function(){
        var exchange_name = this.props.exchange;
        var exchange_colors = {
            "NASDAQ": "mdl-color--blue-700",
            "Market Data Express": "mdl-color--green-400",
            "NYSE": "mdl-color--red-400",
            "BATS\ Trading\ Inc": "mdl-color--teal-400"
        };

        // Convert the exchange name into a valid class name
        var exch_class = exchange_name in exchange_colors ? exchange_colors[exchange_name] : 'mdl-color--blue-grey-300';

        // Dictionary of classes that will be added to the title div of the card
        var exch_class_dict = {
            'result-item': true,
            'result-item__symbol':true,
            'mdl-card__title': true,
            'mdl-card--expanded': true
        };
        exch_class_dict[exch_class] = true;

        var exchange_classes = cx(exch_class_dict);
        return (
            <div className="result-item-card mdl-card mdl-shadow--2dp">
                <div className={exchange_classes}>
                    <h4 className="mdl-card__title-text">{this.props.symbol}</h4>
                    <div className="result-item__exchange">{this.props.exchange}</div>
                </div>
                <div className="mdl-card__supporting-text">
                    <div className="result-item result-item__name">
                        {this.props.name}
                    </div>
                </div>
                <div className=" mdl-card__actions mdl-card--border">
                    <a href="#" className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">View more details</a>
                </div>
            </div>
        );
    }
});


var SearchContainer = React.createClass({
    getInitialState: function(){
        return {
            results: []
        }
    },
    componentDidMount: debounce(function(){
        // TODO: use vanilla js instead of jQuery
        $.get(this.props.source, function(result){
            if(this.isMounted()){
                this.setState({
                    results: result
                });
            }
        }.bind(this)).fail(function(error){
            console.log(error);
        });
    }, 500),
    render: function() {
        var result_items  = this.state.results;
        var array_elements = [];
        for (var key=0; key<result_items.length; key++){
            var element = result_items[key];
            array_elements.push(<SearchResult source={this.props.source} symbol={element.Symbol} name={element.Name} exchange={element.Exchange} key={key}/>);
        }
        return (
        <div className="search-results-container">
            {array_elements}
            {this.props.children}
        </div>
    );
  }
});

document.addEventListener('DOMContentLoaded', function(){
    var search_box = document.getElementsByName('search')[0];
    var attach_node = document.getElementById('search-results');
    search_box.addEventListener('keypress', function(){
        ReactDOM.unmountComponentAtNode(attach_node);
        if(this.value) {
            var source = "http://127.0.0.1:8000/api/lookup/" + this.value;
            ReactDOM.render(
                <SearchContainer source={source}/>,
                attach_node
            );
        }
    });
});

/** Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * @param func {function} the function to be debounced.
 * @param wait {int} the amount of time to wait.
 * @param immediate {boolean} whether to call the function now.
 */
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

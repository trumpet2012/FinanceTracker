var React = require('react');
var ReactDOM = require('react-dom');
var cx = require('classnames');


var MdlCard = React.createClass({
    render: function(){
        var header_class = this.props.headerClass;
        // Dictionary of classes that will be added to the title div of the card
        var header_class_dict = {
            'result-item': true,
            'result-item__symbol':true,
            'mdl-card__title': true,
            'mdl-card--expanded': true
        };
        header_class_dict[header_class] = true;
        var header_classes = cx(header_class_dict);

        return (
        <div className="result-item-card mdl-card mdl-shadow--2dp">
            <div className={header_classes}>
                <h4 className="mdl-card__title-text">{this.props.mainHeader}</h4>
                <div className="result-item__exchange">{this.props.subHeader}</div>
            </div>
            <div className="mdl-card__supporting-text">
                <div className="result-item result-item__name">
                    {this.props.text}
                </div>
            </div>
            <div className=" mdl-card__actions mdl-card--border">
                <a href={this.props.linkUrl} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">{this.props.linkText}</a>
            </div>
        </div>
        );
    }
});


var SearchResult = React.createClass({
    render: function(){
        var exchange_name = this.props.exchange;
        var exchange_colors = {
            "NASDAQ": "mdl-color--blue-700",
            "NYSE": "mdl-color--cyan-500",
            "Market Data Express": "mdl-color--light-green-300",
            "BATS\ Trading\ Inc": "mdl-color--teal-400"
        };

        // Convert the exchange name into a valid class name
        var exch_class = exchange_name in exchange_colors ? exchange_colors[exchange_name] : 'mdl-color--blue-grey-300';
        var detail_url = "http://127.0.0.1:8000/company/detail/" + this.props.symbol + "/";
        return (
            <MdlCard headerClass={exch_class}
                     mainHeader={this.props.symbol}
                     subHeader={this.props.exchange}
                     text={this.props.name}
                     linkUrl={detail_url}
                     linkText="View more details"/>
        );
    }
});


var SearchContainer = React.createClass({
    getInitialState: function(){
        return {
            results: [],
            searchValue: null
        }
    },
    componentDidMount: function(){
        this.setState({
            searchValue: this.props.searchValue
        });
        if (this.props.searchValue != '') {
            // TODO: use vanilla js instead of jQuery
            // TODO: Fix search strings with spaces
            // TODO: Show gif while loading
            // TODO: Show message when there are no results
            $.get(this.props.source, function (result) {
                if (this.isMounted()) {
                    this.setState({
                        results: result
                    });
                }
            }.bind(this)).fail(function (error) {
                console.log(error);
            });
        }
    },
    render: function() {
        var result_items  = this.state.results;
        var array_elements = [];

        if(!this.state['searchValue']){
            return (
              <div className='finance-container mdl-cell mdl-shadow--2dp mdl-color--white mdl-cell--12-col'>Enter the company name to search for.</div>
            );
        }
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

    ReactDOM.render(
            <SearchContainer source="#" searchValue={search_box.value}/>,
            attach_node
    );

    search_box.addEventListener('keydown', debounce(function(){
        var source = "http://127.0.0.1:8000/api/lookup/" + search_box.value;
        ReactDOM.unmountComponentAtNode(attach_node);
        ReactDOM.render(
            <SearchContainer source={source} searchValue={this.value}/>,
            attach_node
        );
    }, 400));
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

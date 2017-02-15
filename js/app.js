console.log(React);
console.log(ReactDOM);

var App = React.createClass({
    render: function () {
        return (
            <div className="app">
                Всем привет, я компоненет App
                <News/>
                <Comments/>
            </div>
        );
    }
});

var News = React.createClass({
    render: function () {
        return (
            <div className="news">
                К сожалению нет новостей
            </div>
        );
    }
});

var Comments = React.createClass({
    render: function () {
        return (
            <div className="comments">
                Нет новостей комментировать нечего
            </div>
        );
    }
});

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

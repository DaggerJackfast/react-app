console.log(React);
console.log(ReactDOM);

var my_news = [
    {
        author: 'Author 1',
        text: 'Text 1'
    },
    {
        author: 'Author 2',
        text: 'Text 2'
    },
    {
        author: 'Author 3',
        text: 'Text 3'
    },
    {
        author: 'Author 4',
        text: 'Text 4'
    },
    {
        author: 'Author 5',
        text: 'Text 5'
    },
];

var App = React.createClass({
    render: function () {
        return (
            <div className="app">
                Всем привет, я обновленнный компоненет App
                <News data={my_news}/>{/* новое свойство */}
                <Comments/>
            </div>
        );
    }
});


var News = React.createClass({
    render: function () {
        var data = this.props.data;
        var newsTemplate = data.map(function (item, index) {
            return (
                <div key={index}>
                    <p className="news__author">{item.author}</p>
                    <p className="news__text">{item.text}</p>
                </div>
            )
        });
        console.log(newsTemplate);
        return (
            <div className="news">
                {newsTemplate}
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

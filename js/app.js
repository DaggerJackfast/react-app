console.log(React);
console.log(ReactDOM);

var newsList = [
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
                <h3>Новости</h3>
                <News data={newsList}/>
            </div>
        );
    }
});

var Acticle = React.createClass({
    render: function () {
        var author = this.props.data.author;
        var text = this.props.data.text
        return (
            <div className="article">
                <p className="news__author">{author}</p>
                <p className="news__text">{text}</p>
            </div>
        );
    }
});


var News = React.createClass({
    render: function () {
        var data = this.props.data;
        var newsTemplate;
        if (data.length > 0) {
            newsTemplate = data.map(function (item, index) {
                return (  <div key={index}>
                    <Acticle data={item}/>
                </div>)
            });
        } else {
            newsTemplate = <p>К сожалению на данный момент нет новостей</p>
        }
        return (
            <div className="news">
                {newsTemplate}
                <strong className={'news__count' + (data.length > 0 ? '' : 'none')}>Всего новостей: {data.length}</strong>
            </div>
        );
    }
});


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

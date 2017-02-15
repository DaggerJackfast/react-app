var newsList = [
    {
        author: 'Author 1',
        text: 'Text 1',
        bigText: 'Big Text Content 1'
    },
    {
        author: 'Author 2',
        text: 'Text 2',
        bigText: 'Big Text Content 2'
    },
    {
        author: 'Author 3',
        text: 'Text 3',
        bigText: 'Big Text Content 3'
    },
    {
        author: 'Author 4',
        text: 'Text 4',
        bigText: 'Big Text Content 4'
    },
    {
        author: 'Author 5',
        text: 'Text 5',
        bigText: 'Big Text Content 5'
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
    propTypes: {
        data: React.PropTypes.shape({
            author: React.PropTypes.string.isRequired,
            text: React.PropTypes.string.isRequired,
            bigText: React.PropTypes.string.isRequired,
        })
    },
    getInitialState: function () {
        return {
            visible: false
        };
    },
    readmoreClick: function (e) {
        e.preventDefault();
        this.setState({visible: true});
    },
    render: function () {
        var author = this.props.data.author;
        var text = this.props.data.text;
        var bigText = this.props.data.bigText;
        var visible = this.state.visible;

        return (
            <div className="article">
                <p className="news__author">{author}</p>
                <p className="news__text">{text}</p>
                <a href="#"
                   onClick={this.readmoreClick}
                   className={'news__readmore ' + (visible ? 'none' : '')}>
                    Подробнее...</a>
                <p className={'news__big-text ' + (visible ? '' : 'none')}>{bigText}</p>
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
                <strong className={'news__count' + (data.length > 0 ? '' : 'none')}>Всего
                    новостей: {data.length}</strong>
            </div>
        );
    }
});


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

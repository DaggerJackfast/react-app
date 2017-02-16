import React from 'react';
import ReactDOM from 'react-dom';
import EventEmitter from 'events';
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

var ee = new EventEmitter();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: newsList
        }
    }

    componentDidMount=()=> {
        var self = this;
        ee.addListener('News.add', function (item) {
            let nextNews = item.concat(self.state.news);
            self.setState({news: nextNews});
        })
    }

    componentWillUnmount() {
        ee.removeListener('News.add');
    }

    render() {
        return (
            <div className="app">
                <Add/>
                <h3>Новости</h3>
                <News data={this.state.news}/>
            </div>
        );
    }
}

class Article extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }


    readmoreClick = (e) => {
        e.preventDefault();
        this.setState({visible: true});
    }

    render() {
        let author = this.props.data.author;
        let text = this.props.data.text;
        let bigText = this.props.data.bigText;
        let visible = this.state.visible;

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
}

Article.propTypes = {
    data: React.PropTypes.shape({
        author: React.PropTypes.string.isRequired,
        text: React.PropTypes.string.isRequired,
        bigText: React.PropTypes.string.isRequired,
    })
};
class Add extends React.Component {
    onBtnClickHandler = (e) => {
        e.preventDefault();
        let author = ReactDOM.findDOMNode(this.refs.author).value;
        let textElement = ReactDOM.findDOMNode(this.refs.text);
        let text = textElement.value;
        let item = [{
            author: author,
            text: text,
            bigText: '...',
        }];
        ee.emit('News.add', item);
        textElement.value = '';
        this.setState({textElement: true});
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            likesIncreasing: nextProps.likeCount > this.props.likeCount
        });
    }


    constructor(props) {
        super(props);
        this.state = {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true
        }
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    }

    onCheckRuleClick = (e) => {
        this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    }

    onFieldChange=(fieldName, e)=> {
        this.setState({['' + fieldName]: !(e.target.value.trim().length > 0)})
    }

    render() {
        let agreeNotChecked = this.state.agreeNotChecked;
        let authorIsEmpty = this.state.authorIsEmpty;
        let textIsEmpty = this.state.textIsEmpty;
        return (
            <form className="add cf">
                <input type="text"
                       onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                       className="add__author"
                       defaultValue=""
                       placeholder="Ваше имя"
                       ref="author"/>
                <textarea className="add__text"
                          onChange={this.onFieldChange.bind(this, 'textIsEmpty')}
                          defaultValue=""
                          ref="text"
                          placeholder="Текст новости">                    
                </textarea>
                <label className="add__checkrule">
                    <input type="checkbox"
                           onChange={this.onCheckRuleClick}
                           ref="checkrule"/> Я согласен с правилами
                </label>
                <button
                    className="add_btn"
                    onClick={this.onBtnClickHandler}
                    ref="sumbit_button"
                    disabled={agreeNotChecked || authorIsEmpty || textIsEmpty}>
                    Отправить
                </button>
            </form>
        );
    }
}
class News extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }


    render() {
        let data = this.props.data;
        let newsTemplate;
        if (data.length > 0) {
            newsTemplate = data.map(function (item, index) {
                return (  <div key={index}>
                    <Article data={item}/>
                </div>)
            });
        } else {
            newsTemplate = <p>К сожалению на данный момент нет новостей</p>
        }
        return (
            <div className="news">
                {newsTemplate}
                <strong className={'news__count' + (data.length > 0 ? '' : 'none')}
                        onClick={this.onTotalNewsClick}>
                    Всего новостей: {data.length}</strong>
            </div>
        );
    }
}


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

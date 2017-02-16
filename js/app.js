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
                <Add/>
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


var Add = React.createClass({
    onBtnClickHandler: function (e) {
        e.preventDefault();
        var author = ReactDOM.findDOMNode(this.refs.author).value;
        var text = ReactDOM.findDOMNode(this.refs.text).value;
        alert(author + '\n' + text);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            likesIncreasing: nextProps.likeCount > this.props.likeCount
        });
    },
    getInitialState: function () {
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textISEmpty: true
        };
    },
    componentDidMount: function () {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    onCheckRuleClick: function (e) {
        this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    },
    onFieldChange:function (fieldName,e) {
        if(e.target.value.trim().length>0){
            this.setState({[''+fieldName]:false})
        }else{
            this.setState({[''+fieldName]:true})
        }
    },

    render: function () {
        var agreeNotChecked=this.state.agreeNotChecked;
        var authorIsEmpty=this.state.authorIsEmpty;
        var textIsEmpty=this.state.textIsEmpty;
        return (
            <form className="add cf">
                <input type="text"
                       onChange={this.onFieldChange.bind(this,'authorIsEmpty')}
                       className="add__author"
                       defaultValue=""
                       placeholder="Ваше имя"
                       ref="author"/>
                <textarea className="add__text"
                          onChange={this.onFieldChange.bind(this,'textIsEmpty')}
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
                    disabled={agreeNotChecked||authorIsEmpty||textIsEmpty}>
                    Отправить
                </button>
            </form>
        );
    }
});
var News = React.createClass({
    getInitialState: function () {
        return {
            counter: 0
        }
    },
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
                <strong className={'news__count' + (data.length > 0 ? '' : 'none')}
                        onClick={this.onTotalNewsClick}>
                    Всего новостей: {data.length}</strong>
            </div>
        );
    }
});


ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

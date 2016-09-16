let App = React.createClass({
  getInitialState(){
    return {
      number1: '',
      number2: '',
      operation: '',
      numbers:'',
      message:'',
      score: 0,
      question:''
    }
  },

  getQuestion(){
    $('#start').hide();
    let number1, number2, operation;
    number1 = Math.floor(Math.random()* 10);
    number2 = Math.floor(Math.random()* 10);

    let randomOperation = Math.floor(Math.random() * 4 + 1);
    switch(randomOperation){
      case 1: operation = '+';
        break;
      case 2: operation = '-';
        break;
      case 3: operation = '*';
        break;
      default: operation = '/';
    }

    this.setState({
      question: "Question: " + number1 + operation + number2 + " = ",
      number1,
      number2,
      operation
    })
  },

  submitResult(event) {
    let result = this.state.numbers;
    let number = event.target.value;
    this.setState({
      numbers: result.concat(number)
    });
  },

  // clearResult () => this.setState({ number: '' })
  clearResult() {
    this.setState({
      numbers: ''
    });
  },

  checkResult() {
    let {number1, number2, operation, numbers, message, score } = this.state;
    let correctAnswer = null;

    switch (operation) {
      case "+":
        correctAnswer = Number(number1) + Number(number2);
        break;
      case "-":
        correctAnswer = Number(number1) - Number(number2);
        break;
      case "*":
        correctAnswer = Number(number1) * Number(number2);
        break;
      default:
        if(number2 === '0'){
          number2 = Math.floor(Math.random()* 10) + 1;
          this.setState({number2});
        }
        correctAnswer = Math.floor(Number(number1) / Number(number2));
    }

    if( Number(numbers) === correctAnswer ){
      document.getElementById('submit').disabled=true;
      this.setState({
        score: score + 1,
        message: "Good job! You are right."
      });
    }else{
      document.getElementById('submit').disabled=false;
      this.setState({
        message: "Sorry, you are wrong. The correct answer is " + correctAnswer + "."
      })
    }

    setTimeout( () => {
      this.getQuestion();
      this.clearResult();
      this.setState({message: ''});
      document.getElementById('submit').disabled=false;
    }, 2000);

  },

  skipQuestion() {
    let { number1, number2, operation } = this.state;
    let correctAnswer;

    switch (operation) {
      case "+":
        correctAnswer = Number(number1) + Number(number2);
        break;
      case "-":
        correctAnswer = Number(number1) - Number(number2);
        break;
      case "*":
        correctAnswer = Number(number1) * Number(number2);
        break;
      default:
        if(number2 === '0'){
          number2 = Math.floor(Math.random()* 10) + 1;
          this.setState({number2});
        }
        correctAnswer = Math.floor(Number(number1) / Number(number2));
    }

    this.setState({
      message: "The answer is: "+ number1 + operation + number2 + "=" + correctAnswer
    });

    setTimeout( () => {
      this.getQuestion();
      this.clearResult();
      this.setState({message: ''});
    }, 2000);

  },

  // renderButtons() {
  //   let elementArray = [0,1,2,3,4,5,6,7,8,9];
  //   return elementArray.map((number) =>
  //     return(
  //       <button className="btn btn-md btn-success" value=`${number}` onClick={this.submitResult}>`${number}`</button>&nbsp;
  //     )
  //   )
  // },

  render() {
    let { question, numbers, message, score } = this.state;
    return (
      <div className="container main">
        <button className="btn btn-default" onClick={this.getQuestion} id="start">Start</button>
        <h3> {question}{numbers}</h3>
        <div>
        {/* {this.renderButtons} */}
          <button className="btn btn-md btn-success" value="0" onClick={this.submitResult}>0</button>&nbsp;
          <button className="btn btn-md btn-success" value="1" onClick={this.submitResult}>1</button>&nbsp;
          <button className="btn btn-md btn-success" value="2" onClick={this.submitResult}>2</button>&nbsp;
          <button className="btn btn-md btn-success" value="3" onClick={this.submitResult}>3</button>&nbsp;
          <button className="btn btn-md btn-success" value="4" onClick={this.submitResult}>4</button>&nbsp;
          <button className="btn btn-md btn-success" value="5" onClick={this.submitResult}>5</button>&nbsp;
          <button className="btn btn-md btn-success" value="6" onClick={this.submitResult}>6</button>&nbsp;
          <button className="btn btn-md btn-success" value="7" onClick={this.submitResult}>7</button>&nbsp;
          <button className="btn btn-md btn-success" value="8" onClick={this.submitResult}>8</button>&nbsp;
          <button className="btn btn-md btn-success" value="9" onClick={this.submitResult}>9</button>&nbsp;
          <button className="btn btn-md btn-success" value="-" onClick={this.submitResult}>-</button>&nbsp;
        </div>
        <div className="sumbit">
          <button className="control btn btn-warning" onClick={this.clearResult}>CLEAR</button>&nbsp;
          <button className="control btn btn-primary" onClick={this.checkResult} id="submit">SUBMIT</button>&nbsp;
          <button className="control btn btn-danger" onClick={this.skipQuestion}>SKIP</button>
        </div>
        <h2>
          <div id="message">{message}</div>
          <hr/>
          <div>Score: {score}</div>
        </h2>
      </div>
    )
  }
});


ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

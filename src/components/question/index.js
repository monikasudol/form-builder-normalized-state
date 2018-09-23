import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      childrenQuestions: [],
      checkedValue: '',
      numberValue: 4,
      undefindedTypeValue: '',
      shouldBeDisplayed: this.props.shouldBeDisplayed
    };
  };

  handleChangeYesOrNoValue = (event) => {
    const checkedValue = event.target.value;
    const displayQuestion = this.state.childrenQuestions.map(child => {
      if (child.condition.answer === checkedValue) {
        child.shouldBeDisplayed = true;
        return child;
      }
      else {
        return {
          ...child
        }
      }
    });
    this.setState({
      checkedValue,
      childrenQuestion: displayQuestion
    });
  }

  handleTextValue = (event) => {
    const text = event.target.value;
    const displayQuestion = this.state.childrenQuestions.map(child => {
      if (child.condition.answer === text) {
        child.shouldBeDisplayed = true;
        return child;
      }
      else {
        return {
          ...child
        }
      }
    });
    this.setState({
      text,
      childrenQuestion: displayQuestion
    });
  };

  handleNumberValue = (event) => {
    const numberValue = parseInt(event.target.value);
    this.setState({ numberValue });
    const displayQuestion = this.state.childrenQuestions.map(child => {
      if ((child.condition.typeOfRangeValue === 'equals' && parseInt(child.condition.answer) === numberValue)
        || (child.condition.typeOfRangeValue === 'greaterThan' && parseInt(child.condition.answer) < numberValue)
        || (child.condition.typeOfRangeValue === 'lessThan' && parseInt(child.condition.answer) > numberValue)) {
        child.shouldBeDisplayed = true;
        return child;
      }
      else {
        return {
          ...child
        }
      }
    });
    this.setState({
      childrenQuestion: displayQuestion
    });
  };

  handleUndefinedTypeValue = (event) => {
    const undefindedTypeValue = event.target.value;
    this.setState({
      undefindedTypeValue
    });
  };

  componentDidMount = () => {
    if (this.props.inputs) {
      const childrenQuestions = this.props.inputs.filter(child => child.parentId === this.props.id)
        .map(child => ({
          ...child,
          shouldBeDisplayed: false
        }));
      this.setState({
        childrenQuestions
      });
    }
  };

  render() {
    const { question, type, condition, inputs } = this.props;
    const { text,
      childrenQuestions,
      shouldBeDisplayed,
      checkedValue,
      undefindedTypeValue,
      numberValue } = this.state;
    return (
      <div className='question'>
        {this.props.shouldBeDisplayed && (
          <React.Fragment>
            <p>Answer question: {question}</p>
            {condition.type === 'text' && (
              <input
                value={text}
                onChange={this.handleTextValue}
                placeholder='give answer..' />
            )}
            {condition.type === 'number' && (
              <input
                type='number'
                value={numberValue}
                onChange={this.handleNumberValue} />
            )}
            {condition.type === 'yes/no' && (
              <form className='condition-radio-inputs-wrapper'>
                <div className='condition-radio-input'>
                  <input type='radio'
                    checked={checkedValue === 'yes'}
                    onChange={this.handleChangeYesOrNoValue}
                    value='yes' />
                  <label>Yes</label>
                </div>
                <div className='condition-radio-input'>
                  <input type='radio'
                    checked={checkedValue === 'no'}
                    onChange={this.handleChangeYesOrNoValue}
                    value='no' />
                  <label>No</label>
                </div>
              </form>
            )}
            {condition.type === undefined && (
              <input
                value={undefindedTypeValue}
                onChange={this.handleUndefinedTypeValue} />
            )}
          </React.Fragment>)}
        {childrenQuestions.map((question, index) => (
          <Question
            key={index}
            children={question.childrenIds}
            type={question.type}
            question={question.question}
            condition={question.condition}
            id={question.id}
            inputs={inputs}
            shouldBeDisplayed={question.shouldBeDisplayed}
          />
        ))}
      </div>
    );
  }
}

export default Question;

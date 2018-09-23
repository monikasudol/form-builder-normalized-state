import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import './styles.css';
import { addCondition } from '../../state/current-form';

const numberTypeValue = [
  { value: 'equals', label: 'Equals' },
  { value: 'greaterThan', label: 'Grater than', className: 'myOptionClassName' },
  { value: 'lessThan', label: 'Less than', className: 'myOptionClassName' }
];

const defaultOption = numberTypeValue[0];

class Condition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.inputType,
      yesOrNo: 'yes',
      numberValue: '',
      numberValueType: 'equals',
      textCondition: {
        type: 'text',
        answer: this.props.answer
      },
      yesOrNoCondition: {
        type: 'yes/no',
        answer: this.props.parentCondition.condition.answer
      },
      numberCondition: {
        type: 'number',
        typeOfRangeValue: this.props.typeOfRangeValue,
        answer: this.props.answer
      }
    }
  };

  handleAnswerChanges = (event) => {
    const { id } = this.props;
    const answer = event.target.value;
    const condition = {
      type: this.state.textCondition.type,
      answer
    }
    this.setState({
      textCondition: condition
    })
    this.props.addCondition({ id, condition })
  }

  onSelect = (event) => {
    const type = event.value;
    this.setState({
      type
    });
  };

  createNumberCondition = (numberValue = 6) => {
    const { parentType, id } = this.props;
    const { numberValueType } = this.state;
    this.props.addCondition({ numberValueType, id, numberValue, parentType });
  }

  handleChangeYesOrNoValue = (event) => {
    const { id } = this.props;
    const yesOrNo = event.target.value;
    const condition = {
      type: this.state.yesOrNoCondition.type,
      answer: yesOrNo
    }
    this.setState({
      yesOrNoCondition: condition
    });
    this.props.addCondition({ id, condition });
  };

  handleChangeNumberValue = (event) => {
    const { id } = this.props;
    const answer = event.target.value;
    const condition = {
      type: 'number',
      typeOfRangeValue: this.state.numberCondition.typeOfRangeValue,
      answer
    };
    this.setState({
      numberCondition: condition
    });
    this.props.addCondition({ id, condition })
  };

  onSelectNumberValueType = (event) => {
    const { id } = this.props;
    const typeOfRangeValue = event.value;
    const condition = {
      type: 'number',
      typeOfRangeValue,
      answer: this.state.numberCondition.answer
    }
    this.setState({
      numberCondition: condition
    });
    this.props.addCondition({ id, condition })
  }

  render() {
    const { parentCondition, childrenIds } = this.props;
    const { numberValue, textCondition, yesOrNoCondition, numberCondition } = this.state;
    return (
      <div className='condition'>
        <span>Condition</span>
        {(parentCondition.condition.type === 'text') && (
          <React.Fragment>
            <Dropdown
              className='condition-dropdown'
              disabled
              onChange={this.onSelect}
              value={defaultOption} />
            <input
              disabled={childrenIds.length > 0}
              onChange={this.handleAnswerChanges}
              className='condition-input'
              value={textCondition.answer} />
          </React.Fragment>
        )}
        {parentCondition.condition.type === 'number' && (
          <React.Fragment>
            <Dropdown
              className='condition-dropdown'
              value={numberCondition.typeOfRangeValue}
              options={numberTypeValue}
              onChange={this.onSelectNumberValueType} />
            <input
              className='condition-input'
              disabled={childrenIds.length > 0}
              value={numberCondition.answer}
              onChange={this.handleChangeNumberValue}
              type='number' />
          </React.Fragment>
        )}
        {parentCondition.condition.type === 'yes/no' && (
          <React.Fragment>
            <Dropdown
              className='condition-dropdown'
              disabled
              value={defaultOption}
              onChange={this.onSelect} />
            <form className='condition-radio-inputs-wrapper'>
              <div className='condition-radio-input'>
                <input type="radio"
                  disabled={childrenIds.length > 0}
                  checked={yesOrNoCondition.answer === 'yes'}
                  onChange={this.handleChangeYesOrNoValue}
                  value="yes" />
                <label>Yes</label>
              </div>
              <div className='condition-radio-input'>
                <input type="radio"
                  disabled={childrenIds.length > 0}
                  checked={yesOrNoCondition.answer === 'no'}
                  onChange={this.handleChangeYesOrNoValue}
                  value="no" />
                <label>No</label>
              </div>
            </form>
          </React.Fragment>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = {
  addCondition
};

export default connect(null, mapDispatchToProps)(Condition);

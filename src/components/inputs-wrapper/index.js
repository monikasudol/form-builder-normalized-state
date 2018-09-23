import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputQuestion from '../input-question';
import InputType from '../input-type';
import Condition from '../condition';
import { addSubInput, deleteInput } from '../../state/current-form';
import './styles.css';

class InputsWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childrenInputs: this.props.inputs.filter(input => input.parentId === this.props.id),
      isQuestionOccured: false
    };
  };

  onAddingSubInput = () => {
    this.props.addSubInput({
      parentId: this.props.id,
      id: this.props.lastInputId + 1,
      condition: {
        type: 'text'
      },
      parentCondition: {
        condition: this.props.condition
      },
      childrenIds: []
    })
  };

  onDeletingInput = () => {
    const { id, parentId } = this.props;
    this.props.deleteInput({ id, parentId })
  };

  componentWillReceiveProps() {
    this.setState({
      childrenInputs: this.props.inputs.filter(input => input.parentId === this.props.id)
    })
  };

  render() {
    const {
      inputQuestion,
      type,
      color,
      lastInputId,
      id,
      inputType,
      condition,
      answer,
      typeOfRangeValue,
      childrenIds,
      parentCondition
    } = this.props;
    const { disabled, childrenInputs } = this.state;
    return (
      <React.Fragment>
        <div className='inputs-wrapper' style={{
          marginLeft: this.props.marginLeft,
          backgroundColor: `rgb(${color}, ${color}, ${color})`
        }}>
          {parentCondition && (<Condition
            parentCondition={parentCondition}
            type={type}
            condition={condition}
            childrenIds={childrenIds}
            answer={answer}
            typeOfRangeValue={typeOfRangeValue}
            id={id} />)}
          <InputQuestion
            childrenIds={childrenIds}
            isQuestionOccured={this.onQuestionOccured}
            inputQuestion={inputQuestion} id={id} />
          <InputType
            childrenInputs={childrenInputs}
            childrenIds={childrenIds}
            id={id}
            changeType={this.props.changeType}
            />
          <div className='input-wrapper__action-buttons'>
            <button disabled={disabled} onClick={this.onAddingSubInput}>Add Sub-Input</button>
            <button onClick={this.onDeletingInput}>Delete</button>
          </div>
        </div>
        {(childrenInputs && childrenInputs.length > 0) &&
          childrenInputs.map((child, index) =>
            <InputsWrapper lastInputId={lastInputId}
              key={index}
              inputQuestion={child.question}
              condition={child.condition}
              id={child.id}
              parentCondition={child.parentCondition}
              childrenIds={child.childrenIds}
              addSubInput={this.props.addSubInput}
              color={this.props.color - 10}
              marginLeft={this.props.marginLeft + 40}
              type={child.type}
              inputs={this.props.inputs}
              deleteInput={this.props.deleteInput}
              parentType={this.props.type}
              answer={child.condition.answer}
              parentId={child.parentId}
              parentCondition={child.parentCondition}
              typeOfRangeValue={child.condition.typeOfRangeValue} />)
        }
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  addSubInput,
  deleteInput
};

const mapStateToProps = (state, props) => ({
  inputs: state.currentForm.inputs
});

export default connect(mapStateToProps, mapDispatchToProps)(InputsWrapper);

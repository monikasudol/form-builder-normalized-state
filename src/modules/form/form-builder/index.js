import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addInput } from '../../../state/current-form';
import InputsWrapper from '../../../components/inputs-wrapper';
import { selectFirstLevelInputs } from '../../../state/current-form/selectors';

class FormBuilder extends Component {

  onAddInput = () => {
    this.props.addInput({ question: 'Question', id: this.props.lastInputId + 1})
  }

  shouldComponentUpdate = () => {
    return true;
  }

  render() {
    const { inputs, firstLevelInputs, lastInputId } = this.props;
    return (
      <div className='form-builder'>
        {firstLevelInputs && (
          firstLevelInputs.map((input, index) => (
            <InputsWrapper
              lastInputId={lastInputId}
              key={index}
              inputQuestion={input.question}
              condition={input.condition}
              childrenIds={input.childrenIds}
              id={input.id}
              inputs={inputs}
              color={255}
              marginLeft={20}
              type={input.condition.type} />
          ))
        )}
        <button onClick={this.onAddInput}>Add input</button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addInput
};

const mapStateToProps = (state) => ({
  inputs: state.currentForm.inputs,
  firstLevelInputs: selectFirstLevelInputs(state.currentForm.inputs),
  lastInputId: state.currentForm.lastInputId,
  ids: state.ids
});

export default connect(mapStateToProps, mapDispatchToProps)(FormBuilder);

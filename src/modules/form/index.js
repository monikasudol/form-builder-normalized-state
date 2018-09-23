import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createNewForm } from '../../state/current-form';
import { selectFirstLevelInputs } from '../../state/current-form/selectors';
import FormBuilder from './form-builder';
import FormToFill from './form-to-fill';
import './styles.css';

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showFormToFill: false
    }
  }

  onGeneratingForm = () => {
    this.setState({
      showFormToFill: true
    })
  };

  onCreatingForm = () => {
    {
      this.props.isFormCreated ? this.setState({
        showFormToFill: false
      }) : this.props.createNewForm()
    }
  };

  render() {
    const { isFormCreated, inputs, firstLevelInputs } = this.props;
    const { showFormToFill } = this.state;
    return (
      <div className='form'>
        {showFormToFill && (
          <button onClick={this.onCreatingForm}>Go to form </button>
        )}
        {(isFormCreated && !showFormToFill) && (
          <FormBuilder />
        )}
        {(isFormCreated && !showFormToFill) && (
          <button onClick={this.onGeneratingForm}>Generate form to fill</button>
        )}
        {showFormToFill && (
          <FormToFill 
            firstLevelInputs={firstLevelInputs}
            inputs={inputs}
             />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  createNewForm
};

const mapStateToProps = (state) => ({
  isFormCreated: state.currentForm.isFormCreated,
  inputs: state.currentForm.inputs,
  firstLevelInputs: selectFirstLevelInputs(state.currentForm.inputs)
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

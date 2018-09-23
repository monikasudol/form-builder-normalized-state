import React, { Component } from 'react';
import Question from '../../../components/question';
import './styles.css';

class FormToFill extends Component {

  render() {
    const { inputs, firstLevelInputs } = this.props;
    return (
      <div className='form-to-fill'>
      {!inputs.length > 0 && (
        <h2>Sorry, no questions for now</h2>
      )} 
         {firstLevelInputs.map((input, index) =>
          (<Question
            key={index}
            question={input.question}
            type={input.type}
            id={input.id}
            children={input.childrenIds}
            shouldBeDisplayed={true}
            condition={input.condition}
            inputs={inputs}
          />)
        )}
      </div>
    );
  }
}

export default FormToFill;

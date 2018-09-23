import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { changeQuestion } from '../../state/current-form';
import './styles.css';

class InputQuestion extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.inputQuestion
    };
  };

  handleQuestion = (event) => {
    const value = event.target.value;
    this.setState({
      value
    });
    this.props.changeQuestion({ id: this.props.id, question: value })
  };

  render() {
    const { value } = this.state;
    const{ childrenIds } = this.props;
    return(
      <div className='input-question'> 
        <span>Question
          {(childrenIds && childrenIds.length > 0) && (
            <p>You can't change questions as far as sub-inputs are created
            </p>
          )}
        </span>
        <input
          type='text'
          value={value}
          onChange={this.handleQuestion}
          disabled={childrenIds && childrenIds.length > 0}/>
      </div>
    )
  }
};

const mapDispatchToProps = {
  changeQuestion
};

export default connect(null, mapDispatchToProps)(InputQuestion);

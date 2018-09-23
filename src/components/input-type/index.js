import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { changeType } from '../../state/current-form';
import './styles.css';

const typesOfCondition = [
  { value: 'yes/no', label: 'Yes/No' },
  { value: 'text', label: 'Text', className: 'myOptionClassName' },
  { value: 'number', label: 'Number' },
];

class InputType extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type
    };
  };

  onSelect = (event) => {
    const type = event.value;
    if(type === 'text'){
      this.setState({
        condition: {
          type,
          answer: 'sth'
        }
      })
    }
    this.setState({ type });
    this.props.changeType({ id: this.props.id, type })
  };

  render() {
    const { type } = this.state;
    const { childrenIds } = this.props;
    return (
      <div className='input-type'>
        <span>Type {(childrenIds && childrenIds.length > 0) &&
          (<p className='input-type-warning'>
            You can't change type as far as sub-inputs are created
          </p>)}</span>
        <Dropdown
          value={type}
          disabled={childrenIds && childrenIds.length > 0}
          options={typesOfCondition}
          onChange={this.onSelect} />
      </div>
    )
  }
};

const mapDispatchToProps = {
  changeType
};

export default connect(null, mapDispatchToProps)(InputType);

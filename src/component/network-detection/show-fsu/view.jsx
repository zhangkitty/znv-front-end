import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { init } from './action';

class ShowFSU extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(init(this.props));
  }

  render() {
    return (
      <div>
        sfafaf
      </div>
    );
  }
}

ShowFSU.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const stateToProp = state => state['network-detection/show-fsu'];
export default connect(stateToProp)(ShowFSU);

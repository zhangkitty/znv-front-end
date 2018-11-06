import React, { Component } from 'react';
import { connect } from 'react-redux';
import { init } from './actions';


class Detail extends Component {
  constructor(props) {
    super(props);
    const { params: { id }, dispatch } = props;
    console.log(id);
    dispatch(init(props));
  }

  render() {
    return (
      <div>
        <div>
          发送到发放
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => state['attendance/detail'];
export default connect(mapStateToProps)(Detail);

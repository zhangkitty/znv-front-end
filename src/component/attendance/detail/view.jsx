import React, { Component } from 'react';
import { connect } from 'react-redux';
import { init } from './actions';
import AttendanceTable from './jsx/attendance-table';


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
          <AttendanceTable {...this.props} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => state['attendance/detail'];
export default connect(mapStateToProps)(Detail);

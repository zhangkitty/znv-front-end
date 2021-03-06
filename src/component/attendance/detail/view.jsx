import React, { Component } from 'react';
import { connect } from 'react-redux';
import { init } from './actions';
import AttendanceTable from './jsx/attendance-table';
import DetailMap from './jsx/detail-map';


class Detail extends Component {
  constructor(props) {
    super(props);
    const { params: { id, dateTime }, dispatch } = props;
    dispatch(init(id, dateTime));
  }

  render() {
    return (
      <div>
        <div>
          <AttendanceTable {...this.props} />
          <DetailMap {...this.props} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => state['attendance/detail'];
export default connect(mapStateToProps)(Detail);

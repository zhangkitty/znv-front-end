import React from 'react';
import HeadTable from './head-table';
import DetailData from './detail-data';
import Trend from './trend';
import { staffAttendanceInit } from '../../action';


export default class StaffAttendance extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch(staffAttendanceInit(props));
  }


  render() {
    return (
      <div>
        <HeadTable {...this.props} />
        <hr />
        <Trend {...this.props} />
        <hr />
        <DetailData {...this.props} />
      </div>
    );
  }
}


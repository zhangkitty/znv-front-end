import React from 'react';
import HeadTable from './head-table';
import DetailData from './detail-data';
import Trend from './trend';
import { staffAttendanceInit } from '../../action';
import { Spin } from 'antd';


export default class StaffAttendance extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    // dispatch(staffAttendanceInit(props));
  }


  render() {
    const { staffAttendance: { ready } } = this.props;
    console.log(ready, 'mdzz');

    return (
      ready ?
        <div>
          <HeadTable {...this.props} />
          <hr />
          <Trend {...this.props} />
          <hr />
          <DetailData {...this.props} />
        </div>
        :
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
    );
  }
}


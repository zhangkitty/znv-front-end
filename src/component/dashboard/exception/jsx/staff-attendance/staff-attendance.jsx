import React from 'react';
import HeadTable from './head-table';
import DetailData from './detail-data';
import Trend from './trend';
import { staffAttendanceInit } from '../../action';
import { Spin } from 'antd';
import CityTrend from './attendance-city-trend/city-trend';
import AMAPCOUNTRY from './amap/country';


export default class StaffAttendance extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    console.log('StaffAttendance');
    // dispatch(staffAttendanceInit(props));
  }


  render() {
    const { staffAttendance: { ready } } = this.props;
    const { node, TabValue } = this.props;
    const len = node.id.split('.').length;
    if (TabValue !== 1) {
      return null;
    }


    return (
      ready ?
        <div>
          {
            len === 1 && <AMAPCOUNTRY {...this.props} />
          }
          <HeadTable {...this.props} />
          {len === 1 && <CityTrend {...this.props} />}
          {len === 1 && <hr />}
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


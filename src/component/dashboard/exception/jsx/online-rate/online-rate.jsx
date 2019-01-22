import React, { Component } from 'react';
import { Spin } from 'antd';
import HeadTable from './head-table';
import Trend from './trend';
import DetailData from './detail-data';
import DeviceTable from './device-table';
import CityTrend from './city-trend';


export default class Online extends Component {
  constructor(props) {
    super(props);
    console.log('sb');
    const { dispatch } = props;
  }

  render() {
    const { node, onlineRate: { ready } } = this.props;
    const len = node.id.split('.').length;
    console.log(len, 'len');
    return (
      ready ?
        <div>
          <HeadTable {...this.props} />
          <hr />
          {len === 1 && <CityTrend {...this.props} />}
          {len === 1 && <hr />}
          <Trend {...this.props} />
          <hr />
          {
              (len > 3 && node.person === true) ? null :
              <div>
                <DetailData {...this.props} />
                <hr />
              </div>
            }
          {
              (len === 3 || (len > 3 && node.person === true)) &&
              <DeviceTable {...this.props} />
            }
        </div>
        :
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
    );
  }
}

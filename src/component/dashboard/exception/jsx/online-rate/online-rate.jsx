import React, { Component } from 'react';
import HeadTable from './head-table';
import Trend from './trend';
import DetailData from './detail-data';
import DeviceTable from './device-table';
import { getExceptionRate } from '../../action';


export default class Online extends Component {
  constructor(props) {
    super(props);
    console.log('sb');
    const { dispatch } = props;

  }

  render() {
    const { node } = this.props;
    const len = node.id.split('.').length;
    return (
      <div>
        <HeadTable {...this.props} />
        <hr />
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
    );
  }
}

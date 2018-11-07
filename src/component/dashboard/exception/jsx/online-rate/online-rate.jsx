import React, { Component } from 'react';
import HeadTable from './head-table';
import Trend from './trend';
import DetailData from './detail-data';


export default class Online extends Component {
  constructor(props) {
    super(props);
    console.log('sbsbsbsbsbsbsbxxxxx');
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

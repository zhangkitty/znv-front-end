import React from 'react';
import PropTypes from 'prop-types';
import HeadTable from './head-table';
import Trend from './trend';
import DetailData from './detail-data';

const Online = (props) => {
  console.log(props);


  return (
    <div>
      <HeadTable {...props} />
      <hr />
      <Trend {...props} />
      <hr />
      <DetailData {...props} />
    </div>
  );
};

export default Online;

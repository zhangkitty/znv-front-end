import React from 'react';
import PropTypes from 'prop-types';
import HeadTable from './head-table';
import DetailData from './detail-data';
import Trend from './trend';

const StaffAttendance = (props) => {
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


export default StaffAttendance;


import React from 'react';
import PropTypes from 'prop-types';
import HeadTable from './head-table';

const Online = (props) => {
  console.log(props);


  return (
    <div>
      <HeadTable {...props} />
    </div>
  );
};

export default Online;

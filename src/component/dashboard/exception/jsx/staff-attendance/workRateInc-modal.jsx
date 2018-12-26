import React from 'react';
import { Modal } from 'shineout';
import { closeWorkRateInc } from '../../action';


const modal = (props) => {
  console.log(props);
  const { dispatch, staffAttendance: { workRateIncModal: { visible } } } = props;
  return (
    <Modal
      visible={visible}
      onClose={() => dispatch(closeWorkRateInc())}
    />
  );
};


export default modal;


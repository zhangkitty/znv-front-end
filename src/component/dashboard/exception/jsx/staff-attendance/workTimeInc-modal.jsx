import React from 'react';
import { Modal } from 'shineout';
import { closeWorkTimeInc } from '../../action';


const modal = (props) => {
  const { dispatch } = props;
  const { dispatch, staffAttendance: { workTimeIncModal: { visible } } } = props;
  return (
    <Modal
      visible={visible}
      onClose={() => dispatch(closeWorkTimeInc())}
    />
  );
};

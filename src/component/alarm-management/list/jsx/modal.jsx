import React from 'react';
import { Modal, Steps } from 'antd';
import { cancelModal } from '../action';


const tmp = (props) => {
  const Step = Steps.Step;
  console.log(props);
  const { dispatch, myModal: { visiable, data } } = props;
  return (
    <Modal

      visible={visiable}
      footer={null}
      onCancel={() => dispatch(cancelModal())}
    >
      <Steps direction="vertical" style={{ marginTop: 20 }}>
        {
          data.map(v => (
            <Step title={v.orderState} description={`处理时间:${v.processTime} 处理内容:${v.content} 处理结果:${v.result} 处理人:${v.handleName}`} />
          ))
        }
      </Steps>,
    </Modal>
  );
};

export default tmp;

import React from 'react';
import { Modal } from 'shineout';
import { Collapse, Steps } from 'antd';
import { closeModal } from '../action';


const ModalTask = (props) => {
  const { dispatch, modal: { visible, dataSource } } = props;

  const Panel = Collapse.Panel;
  const Step = Steps.Step;

  return (
    <div>
      <Modal
        visible={visible}
        width={800}
        title="任务详情"
        onClose={() => dispatch(closeModal())}
      >
        <Collapse>
          {/* <Panel header="This is panel header 1" key="1"> */}
          {/* <div> */}
          {/* <div className={styles.left}> */}
          {/* { */}
          {/* } */}
          {/* </div> */}
          {/* <div className={styles.right} /> */}
          {/* </div> */}
          {/* </Panel> */}
          <Panel header="任务进度" key="2">
            <Steps direction="vertical" size="small">
              {
                dataSource.map(v => (
                  <Step title={v.taskStateDesc} description={`处理时间:${v.processTime} 处理内容:${v.content} 处理人:${v.userId ? v.userId : ''}`} />
                ))
              }
            </Steps>
          </Panel>
        </Collapse>
      </Modal>
    </div>
  );
};

export default ModalTask;

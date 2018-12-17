import React from 'react';
import { Modal } from 'shineout';
import { Collapse } from 'antd';
import styles from './style.css';
import { closeModal } from '../action';

const Panel = Collapse.Panel;
const ModalTask = (props) => {
  const { dispatch, modal: { visible } } = props;
  console.log(1);
  return (
    <div>
      <Modal
        visible={visible}
        width={500}
        title="任务详情"
        onClose={() => dispatch(closeModal())}
      >
        <Collapse>
          <Panel header="This is panel header 1" key="1">
            <div>
              <div className={styles.left}>
                {

                }
              </div>
              <div className={styles.right}>
                {

                }
              </div>
            </div>
          </Panel>
          <Panel header="This is panel header 2" key="2">
            <p>2</p>
          </Panel>
        </Collapse>
      </Modal>
    </div>
  );
};

export default ModalTask;

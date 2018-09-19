import React from 'react';
import { Modal, Select, message } from 'antd';
import { changeValue, addDept } from '../action';
import styles from '../style.css';

const addProvinceModal = (props) => {
  const {
    addDeptVisiable, dispatch, allProvince, choosedProvince, customerId,
  } = props;
  const Option = Select.Option;
  return (
    <Modal
      visible={addDeptVisiable}
      title="添加省份"
      onCancel={() => {
        dispatch(changeValue('addDeptVisiable', false));
        dispatch(changeValue('choosedProvince', ''));
      }}
      onOk={() => {
        if (choosedProvince) {
          // todo
          const provinceName = allProvince.filter(v => v.id === choosedProvince)[0].name;
          dispatch(addDept(provinceName, customerId));
        } else {
          return message.error('信息不全');
        }
        return null;
      }}

    >
      <div>
        <article className={styles.province}>
          <div>省份</div>
          <Select
            value={choosedProvince}
            onChange={(value) => {
              if (value) {
                dispatch(changeValue('choosedProvince', value));
              }
            }}
          >
            {
              allProvince.length && allProvince.map(v => (
                <Option
                  key={v.id}
                  value={v.id}
                >{v.name}
                </Option>
                ))
            }
          </Select>
        </article>
      </div>
    </Modal>
  );
};

export default addProvinceModal;

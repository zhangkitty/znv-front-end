import React from 'react';
import { Modal, Select, message } from 'antd';
import { changeValue, addDept } from '../action';
import styles from '../style.css';


const addCityModal = (props) => {
  const {
    addCityModalVisiable, dispatch, allCity, choosedCity, provinceId,
  } = props;
  const Option = Select.Option;
  return (
    <Modal
      visible={addCityModalVisiable}
      title="增加城市"
      onCancel={() => {
        dispatch(changeValue('addCityModalVisiable', false));
        dispatch(changeValue('choosedCity', ''));
      }}

      onOk={() => {
        if (choosedCity) {
          const cityName = allCity.filter(v => v.id === choosedCity)[0].name;
          dispatch(addDept(cityName, provinceId));
        } else {
          return message.error('信息不全');
        }
        return null;
      }}
    >
      <div>
        <article className={styles.city}>
          <div>城市</div>
          <Select
            value={choosedCity}
            onChange={value => dispatch(changeValue('choosedCity', value))}
          >
            {
              allCity.map(v => (
                <Option key={v.id} value={v.id}>{v.name}</Option>
              ))
            }
          </Select>
        </article>
      </div>
    </Modal>
  );
};

export default addCityModal;

/**
 * Created by zhanyaqi on 2017/9/12.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';
import { changeValue, search } from '../action';
import style from '../style.css';

const Header = (props) => {
  const {
    dispatch,
    secondaryProcess,
    produceOrderId,
    dataLoading,
  } = props;
  return (
    <div className={style.flexBox} style={{ paddingTop: 0 }}>
      <div className={style.inputItem}>
        <span className={style.itemTitle}>
          二次工艺：
        </span>
        <Input
          className={style.inputBox}
          size="large"
          value={secondaryProcess}
          onChange={e => dispatch(changeValue('secondaryProcess', e.target.value))}
        />
      </div>
      <div className={style.inputItem}>
        <Button
          loading={dataLoading}
          type="primary"
          size="large"
          onClick={() => dispatch(search())}
        >
          搜索
        </Button>
      </div>
    </div>
  );
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  secondaryProcess: PropTypes.string.isRequired,
  produceOrderId: PropTypes.string.isRequired,
  dataLoading: PropTypes.bool.isRequired,
};

export default Header;

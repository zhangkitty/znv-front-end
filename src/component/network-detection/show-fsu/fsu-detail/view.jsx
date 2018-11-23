import React from 'react';
import { Spin } from 'antd';
import Page from 'shein-lib/pagination';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { init, changeValue, changePage, changePageSize } from './action';
import Header from './jsx/header';
import List from './jsx/list';

class ShowFSU extends React.Component {
  constructor(props) {
    super(props);
    this.props.dispatch(init(this.props));
  }

  render() {
    const {
      pageReady, total, dispatch, page, pageSize,
    } = this.props;
    return (
      pageReady ?
        <div>
          <iframe src="http://omc.znv.com/main/fsumanage/fsuinfo.do?objectid=00001709002000000058#" frameBorder="0" title="00001709002000000058" />
        </div>
        :
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
    );
  }
}

ShowFSU.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const stateToProp = state => state['network-detection/show-fsu/fsu-detail'];
export default connect(stateToProp)(ShowFSU);

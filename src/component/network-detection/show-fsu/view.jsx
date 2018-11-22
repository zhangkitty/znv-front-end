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
          <Header {...this.props} />
          <List {...this.props} />
          <Page
            total={total}
            onChange={(pageValue) => {
              dispatch(changeValue('page', pageValue));
              dispatch(changePage(Object.assign({}, this.props, {
                page: pageValue,
                pageSize,
              })));
            }}
            onShowSizeChange={(current, size) => {
              dispatch(changeValue('pageSize', size));
              dispatch(changePageSize(Object.assign({}, this.props, {
                page: current,
                pageSize: size,
              })));
            }}
            current={page}
            pageSize={pageSize}
          />
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

const stateToProp = state => state['network-detection/show-fsu'];
export default connect(stateToProp)(ShowFSU);

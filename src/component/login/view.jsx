import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, Input, Icon } from 'antd';

import { commitLogin, changeValue } from './actions';


class View extends React.Component {
  componentDidMount() {
    document.title = '登录窗口';
  }
  render() {
    const {
      from = '/',
      dispatch,
      admintoken,
      message,
    } = this.props;
    return (
      <div style={{ height: `${window.innerHeight}px` }}>
        <canvas />
        <article>
          <div>
            <span />
            领添SHEIN-WMS管理系统
          </div>
          <form action="#" method="POST">
            <div>
              <Input
                placeholder="Enter your admintoken"
                prefix={<Icon size="large" type="user" />}
                size="large"
                type="text"
                name="admintoken"
                value={admintoken}
                onChange={e => dispatch(changeValue('admintoken', e.target.value))}
                ref={input => (this.userNameInput = input)}
                onPressEnter={() => {
                  dispatch(commitLogin({ admintoken }, from || '%2F'));
                }}
              />
            </div>
            <div style={{ marginTop: '10px' }} >
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  dispatch(commitLogin({ admintoken }, from || '%2F'));
                }}
              >
                登录
              </Button>
              <p>{message}</p>
            </div>
          </form>
        </article>
      </div>
    );
  }
}

View.propTypes = {
  params: PropTypes.shape({
    from: PropTypes.string,
  }).isRequired,
  admintoken: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.login;
export default connect(mapStateToProps)(View);

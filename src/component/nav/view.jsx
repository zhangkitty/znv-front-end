import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { BackTop } from 'antd';
import { logout } from './actions';
import Sider from './components/sider';
import styles from './style.css';
import Welcome from './components/welcome';

class Frame extends React.Component {
  render() {
    const {
      menus, dispatch, children, userName,
      location: {
        pathname: current,
      },
    } = this.props;
    return (
      <div className={styles.antLayoutAside}>
        <aside
          className={styles.antLayoutSider}
        >
          <div className={styles.antLayoutLogo}>
            <Link to="/">项目名称</Link>
          </div>
          <Sider
            current={current} menus={menus}
          />
        </aside>
        <div
          className={styles.antLayoutMain}
        >
          <div className={styles.antLayouttop}>
            <div className={styles.antLayoutright}>
              <span className={styles.logout}>{userName}</span>
              <a
                href=""
                className={styles.logout}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(logout());
                }}
              >
                注销
              </a>
            </div>
          </div>
          <div className={styles.antLayoutContent}>
            <BackTop visibilityHeight={100} className={styles.mobileBack} />
            {children || <Welcome />}
          </div>
        </div>
      </div>
    );
  }
}


Frame.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  menus: PropTypes.arrayOf(PropTypes.object).isRequired,
  userName: PropTypes.string.isRequired,
  children: PropTypes.shape({}),
};
Frame.defaultProps = {
  children: <Welcome />,
};
const mapStateToProps = state => state.nav;
export default connect(mapStateToProps)(Frame);

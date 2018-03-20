import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BackTop, Button } from 'antd';
import { logout } from './actions';
import Sider from './components/sider';
import styles from './style.css';
import Welcome from './components/welcome';

const UserLand = ({ dispatch, userName }) => (
  <div className={styles.antLayoutright}>
    <span className={styles.logout}>{userName}</span>
    <Button
      type="ghost"
      size="small"
      className={styles.logout}
      onClick={() => dispatch(logout())}
    >
     注销
    </Button>
  </div>);

UserLand.propTypes = {
  userName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

class MainPage extends React.PureComponent {
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
            <Link href="/" to="/">
              项目名称
            </Link>
          </div>
          <Sider
            current={current}
            menus={menus}
          />
        </aside>
        <div
          className={styles.antLayoutMain}
        >
          <div className={styles.antLayouttop}>
            <UserLand userName={userName} dispatch={dispatch} />
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


MainPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  menus: PropTypes.arrayOf(PropTypes.object).isRequired,
  userName: PropTypes.string.isRequired,
  children: PropTypes.shape({}),
};
MainPage.defaultProps = {
  children: <Welcome />,
};
const mapStateToProps = state => state.nav;
export default connect(mapStateToProps)(MainPage);

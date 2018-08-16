import React from 'react';
import Cookie from 'utils/js.cookie';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BackTop, Button, Layout, Menu, Icon } from 'antd';
// import { logout } from './actions';
import MySider from './components/sider';
import styles from './style.css';
import Welcome from './components/welcome';

const UserLand = ({ dispatch, userName }) => (
  <div className={styles.antLayoutright}>
    <span className={styles.logout}>{userName}</span>
    <Button
      type="ghost"
      size="small"
      className={styles.logout}
      onClick={() => {
        // dispatch(logout)
        Cookie.remove('SESSION_NP');
        Cookie.remove('SESSION_TOKEN');
        console.log(window.location);
        window.open(`${window.location.href}login`, '_self');
      }}
    >
     注销
    </Button>
  </div>);

UserLand.propTypes = {
  userName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const { Header, Sider, Content } = Layout;

class MainPage extends React.PureComponent {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const {
      menus, dispatch, children, userName, linkList, pathList,
      location: {
        pathname: current,
      },
    } = this.props;
    console.log(linkList, 'linklist');
    console.log(pathList, 'pathlist');


    const routerMatchList = linkList.filter(({ link }) => (link === '/' || `${current}/`.startsWith(`${link}/`)))
      .sort((item1, item2) => item1.link.length > item2.link.length);

    console.log(routerMatchList, 'routerMatchList');

    document.title = [...routerMatchList].reverse()[0]
      ?
      [...routerMatchList].reverse()[0].title : '';
    console.log(document.title, document);
    // const crumbList = pathList.map((v, i) => (
    //   <span key={i} style={{ fontSize: '13px' }}>
    //     <Link
    //       key={v.link}
    //       style={i === pathList.length - 1 ? { color: 'rgba(0,0,0,.8)' } : { color: 'rgba(0,0,0,1)' }}
    //       // className={styles.tabActive}
    //       to={i === pathList.length - 1 ? null : v.link}
    //     >{v.crumbName}
    //     </Link>
    //     {
    //       i !== pathList.length - 1 && ' / '
    //     }
    //   </span>
    // ));

    const crumbList = pathList.map((v, i) => (
      <span key={i} style={{ fontSize: '13px' }}>
        <Link
          key={v.link}
          to={v.link}
          style={i === pathList.length - 1 ? { color: 'rgba(0,0,0,.8)' } : { color: 'rgba(0,0,0,1)' }}
        >
          {v.title}
        </Link>
        {
            i !== pathList.length - 1 && ' / '
        }
      </span>
    ));

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className={styles.logo} />
          <MySider
            current={current}
            menus={menus}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }}>
            <div className={styles.antLayouttop}>
              <Icon
                className={styles.trigger}
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <UserLand userName={userName} dispatch={dispatch} />
            </div>
          </Header>
          <Content style={{
              margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
              }}
          >
            <div>
              {
                crumbList
              }
            </div>
            <div className={styles.antLayoutContent}>
              <BackTop visibilityHeight={100} className={styles.mobileBack} />
              {children || <Welcome />}
            </div>
          </Content>
        </Layout>
      </Layout>


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

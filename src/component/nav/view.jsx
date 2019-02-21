import React from 'react';
import Cookie from 'utils/js.cookie';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BackTop, Button, Layout, Menu, Icon } from 'antd';
import MySider from './components/sider';
import styles from './style.css';
import Welcome from './components/welcome';
import { getResource } from './actions';

const UserLand = ({ dispatch, userName }) => {
  userName = localStorage.getItem('userName');
  return (
    <div className={styles.antLayoutright}>
      <span className={styles.logout}>{userName}</span>
      <span style={{ marginRight: 10 }}>|</span>
      <Button
        type="ghost"
        size="small"
        className={styles.logout}
        onClick={() => {
          // dispatch(logout)
          Cookie.remove('SESSION_NP');
          Cookie.remove('SESSION_TOKEN');
          localStorage.setItem('token', '');
          localStorage.setItem('tokenDate', '');
          const href = window.location.href.split('#')[0];
          window.open(`${href}#/login`, '_self');
        }}
      >
        注销
      </Button>
    </div>
  );
};


UserLand.propTypes = {
  userName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const { Header, Sider, Content } = Layout;

class MainPage extends React.PureComponent {
  constructor(props) {
    super(props);
    debugger;
    const { dispatch } = this.props;
    dispatch(getResource(this.props));
  }

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


    const routerMatchList = linkList.filter(({ link }) => (link === '/' || `${current}/`.startsWith(`${link}/`)))
      .sort((item1, item2) => item1.link.length > item2.link.length);


    document.title = [...routerMatchList].reverse()[0]
      ?
      [...routerMatchList].reverse()[0].title : '';


    const crumbList = pathList.map((v, i) => (
      <span key={i} style={{ fontSize: '13px' }}>
        {
          v.children ?
            <span
              key={v.link}
              style={i === pathList.length - 1 ? { color: 'rgba(0,0,0,.8)' } : { color: 'rgba(0,0,0,1)' }}

            >
              {v.title}

            </span>
            :
            <Link
              key={v.link}
              to={v.link}
              style={i === pathList.length - 1 ? { color: 'rgba(0,0,0,.8)' } : { color: 'rgba(0,0,0,1)' }}
            >
              {v.title}
            </Link>
        }
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
          <div className={styles.logo}>
            <img src="http://www.dftcmedia.com/page/ic_index_logo.png" alt="" style={{ width: '100%' }} />
          </div>
          <MySider
            current={current}
            menus={menus}
          />
        </Sider>
        <Layout className={styles.layout}>
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
             padding: 24, background: '#fff', position: 'relative', height: '100%',
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

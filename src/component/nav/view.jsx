import React from 'react';
import Cookie from 'utils/js.cookie';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BackTop, Button, Layout, Menu, Icon, Select } from 'antd';
import MySider from './components/sider';
import styles from './style.css';
import Welcome from './components/welcome';
import { getResource, changeValue } from './actions';


const Option = Select.Option;

const UserLand = ({ dispatch, userName, type }) => {
  const org = [
    {
      type: '51010720564', name: '天呈',
    },
    {
      type: '11000020917', name: '航美',
    },
  ];
  userName = localStorage.getItem('userName');
  const isAdmin = localStorage.getItem('isAdmin');
  return (
    <div className={styles.antLayoutright}>
      {
        isAdmin === false ? null : <Select
          style={{ width: 80, marginRight: 20 }}
          value={type}
          onChange={(value) => {
            localStorage.setItem('type', value);
            dispatch(changeValue('type', value));
          }}
        >
          {
            org.map(v => (<Option
              value={v.type}
            >
              {
                v.name
              }
            </Option>))
          }
                                   </Select>
      }
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
          localStorage.setItem('type', '');
          localStorage.setItem('isAdmin', null);
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
    const { dispatch } = this.props;
    dispatch(getResource(this.props));
    if (localStorage.getItem('type')) {
      dispatch(changeValue('type', localStorage.getItem('type')));
    } else {
      dispatch(changeValue('type', '12341412'));
    }
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
            {
              (function () {
                const topOrgId = localStorage.getItem('topOrgId');
                if (topOrgId == 'null') {
                  return <img src="http://www.znv.com.cn/skins/ico/logo.png" alt="" style={{ width: '100%', height: '100%' }} />;
                }
                if (topOrgId == 11000002) {
                  return <img src="http://www.dftcmedia.com/page/ic_index_logo.png" alt="" style={{ width: '100%' }} />;
                }
                if (topOrgId == 11000008) {
                  return <img src="http://www.xinchao.com/img/logo.9cee6484.png" alt="" style={{ width: '100%' }} />;
                }
              }())
            }
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
              <UserLand {...this.props} />
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

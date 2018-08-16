import React from 'react';
import { Icon, Menu } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;


const Sider = ({ menus, current }) => {
  const defaultSelectedKeys = [];
  function TreeMenu({
    title, icon, children, link,
  }) {
    if (current.indexOf(link) === 0) {
      defaultSelectedKeys.push(link);
    }
    if (children && children.length) {
      return (
        <SubMenu
          key={link}
          title={<div><Icon type={icon} /><span className="nav-text">{title}</span></div>}
        >
          {children.map(prop => TreeMenu(prop))}
        </SubMenu>
      );
    } return (
      <Menu.Item key={link}>
        {
          <Link href={link} to={link}>
            <Icon type={icon} /><span className="nav-text">{title}</span>
          </Link>
        }
      </Menu.Item>
    );
  }

  TreeMenu.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape(TreeMenu.propTypes)).isRequired,
    link: PropTypes.string.isRequired,
  };

  return (
    <Menu
      style={{ height: window.innerHeight - 40 }}
      mode="inline"
      theme="dark"
      defaultSelectedKeys={defaultSelectedKeys}
      defaultOpenKeys={defaultSelectedKeys}
    >
      {
        menus.map(TreeMenu)
      }
    </Menu>
  );
};

Sider.propTypes = {
  current: PropTypes.string.isRequired,
  menus: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sider;

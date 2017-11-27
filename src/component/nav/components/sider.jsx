import React from 'react';
import { Icon, Menu } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const SubMenu = Menu.SubMenu;

const Sider = ({ current, menus }) => {

  function CustomSubMenu({ title, icon, children, link }) {
    if (children && children.length) {
      return (
        <SubMenu
          key={title}
          title={<span><Icon type={icon} /><span>{title}</span></span>}
        >
          {children.map(prop => CustomSubMenu(prop))}
        </SubMenu>
      );
    } return (
      <Menu.Item key={link}>
        {
          <Link to={link}>
            <Icon type={icon} /> {title}
          </Link>
        }
      </Menu.Item>
    );
  }

  CustomSubMenu.propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape(CustomSubMenu.propTypes)).isRequired,
    link: PropTypes.string.isRequired,
  };

  return (
    <Menu
      style={{ overflowY: 'auto', width: 180, height: window.innerHeight - 48 }}
      mode="inline"
      theme="dark"
      inlineIndent={12}
    >
      {
        menus.map(CustomSubMenu)
      }
    </Menu>
  );
};

Sider.propTypes = {
  current: PropTypes.string.isRequired,
  menus: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sider;

import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon, Button } from 'antd';
import { changeValue, getUserByDeptId, getAllrovince, getAllCityByProvinceId, getAllCityByProvinceName } from '../action';
import styles from '../style.css';


const SubMenu = Menu.SubMenu;
const Dept = (props) => {
  // const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  const {
    dispatch, openkeys, deptTree, customerId, provinceId,
  } = props;
  return (

    <div>
      <div className={styles.addCustomer}>
        <Button
          onClick={() => dispatch(changeValue('addCustomerVisiable', true))}
        >添加客户
        </Button>
      </div>
      <Menu
        mode="inline"
        openKeys={openkeys}
        onOpenChange={(openKeys) => {
          const result = openKeys.filter((v => props.openkeys.findIndex(value => value === v) === -1));
          if (result.length === 0) {
            result.concat(openKeys);
            dispatch(changeValue('openkeys', result));
            return null;
          }
          const after = result[0].split('|')[1];
          const parentId = after.split('.').reverse()[0];
          const parentLevel = after.split('.').reverse().slice(1);
          result.push(`${parentId}|${parentLevel}`);
          dispatch(changeValue('openkeys', result));
        }}
        onClick={
          ({ item, key, keyPath }) => {
            dispatch(changeValue('deptId', key.split('|')[0]));
            dispatch(getUserByDeptId(Object.assign({}, props, {
              deptId: key.split('|')[0],
            })));
          }
        }
      >

        {
          deptTree.map(v => (
            <SubMenu
              key={`${v.value.id}|${v.value.level}`}
              title={
                <span><Icon
                  type="mail"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(changeValue('addDeptVisiable', true));
                    dispatch(getAllrovince());
                    dispatch(changeValue('customerId', v.value.id));
                  }}
                /><span>{v.value.name}</span>
                </span>
              }
            >
              {
                v.detail.length && v.detail.map(k => (
                  <SubMenu
                    key={`${k.value.id}|${k.value.level}`}
                    title={
                      <span>
                        <Icon
                          type="mail"
                          onClick={
                          (e) => {
                            e.stopPropagation();
                            dispatch(changeValue('addCityModalVisiable', true));
                            dispatch(getAllCityByProvinceName(k.value.name));
                            dispatch(changeValue('provinceId', k.value.id));
                          }
                        }
                        />
                        <span>{k.value.name}</span>
                      </span>
                    }
                  >
                    {
                      k.detail.length && k.detail.map(t => (
                        <Menu.Item key={`${t.value.id}|${t.value.level}`}>
                          <span>{t.value.name}</span>
                        </Menu.Item>
                      ))
                    }
                  </SubMenu>
                ))
              }
            </SubMenu>
          ))
        }
      </Menu>
    </div>

  );
};


export default Dept;

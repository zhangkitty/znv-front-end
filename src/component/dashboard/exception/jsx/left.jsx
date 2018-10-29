import React from 'react';
import PropTypes from 'prop-types';
import { Tree } from 'antd';


const TreeNode = Tree.TreeNode;
const LeftTree = (props) => {
  const { cityTree } = props;
  const renderTreeNodes = data => data.map((item) => {
    if (item.cityList) {
      return (
        <TreeNode title={item.areaName} key={`${item.level}.${item.areaCode}`} value={item}>
          {renderTreeNodes(item.cityList)}
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  });

  return (
    <div>
      <Tree
        onSelect={(selectedKeys, e) => {
          console.log(selectedKeys);
          console.log(e);
        }}
      >
        {
          renderTreeNodes(cityTree)
        }
      </Tree>
    </div>
  );
};

export default LeftTree;

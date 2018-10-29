import React from 'react';
import assign from 'object-assign';
import PropTypes from 'prop-types';
import { Tree } from 'shineout';


const LeftTree = (props) => {
  console.log(props);
  const { cityTree } = props;
  const cityTreeShowDate = cityTree.map(v => assign({}, v, {
    text: v.areaName,
    id: `${v.level}.${v.areaCode}`,
    // children: v.cityList || [],
  }));

  const data = [
    {
      id: '0',
      text: '0',
      children: [
        {
          id: '0-0',
          text: '0-0',
          children: [],
        },
      ],
    },
  ];

  return (
    <div>
      <Tree
        data={data}
        keygen="id"
        renderItem={v => v.text}
      />

    </div>
  );
};

export default LeftTree;

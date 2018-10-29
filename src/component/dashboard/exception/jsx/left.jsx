import React from 'react';
import assign from 'object-assign';
import PropTypes from 'prop-types';
import { Tree } from 'shineout';
import styles from '../style.css';


const LeftTree = (props) => {
  const { cityTree } = props;
  const transfrom = data => data.map(v => assign({}, v, {
    text: v.areaName,
    id: `${v.level}.${v.areaCode}`,
    children: transfrom(v.cityList),
  }));


  return (
    <div className={styles.left}>
      <Tree
        data={transfrom(cityTree)}
        keygen="id"
        renderItem={v => v.areaName}
        line={false}
        onClick={(node, id) => {
          console.log(node);
          console.log(id);
        }}
      />
    </div>
  );
};

export default LeftTree;

import React from 'react';
import assign from 'object-assign';
import PropTypes from 'prop-types';
import { Tree } from 'shineout';
import styles from '../style.css';
import { changeValue } from '../action';


const LeftTree = (props) => {
  const { cityTree, dispatch, clickedId } = props;
  const transfrom = data => data.map(v => assign({}, v, {
    id: `${v.level}.${v.areaCode}`,
    children: transfrom(v.cityList),
  }));

  const data = [{
    areaName: '全国',
    id: '0',
    children: transfrom(cityTree),
  }];


  return (
    <div className={styles.left}>
      <Tree
        data={data}
        keygen="id"
        defaultExpanded={['0']}
        renderItem={v => (<span className={clickedId === v.id ? styles.leftItem : null}>{v.areaName}</span>)}
        line={false}
        onClick={(node, id) => {
          console.log(node);
          console.log(id);
          dispatch(changeValue('clickedId', id));
        }}
      />
    </div>
  );
};

export default LeftTree;

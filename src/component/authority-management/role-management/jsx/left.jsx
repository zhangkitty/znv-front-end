import React from 'react';
import { Tree } from 'shineout';
import styles from './style.css';


const tmp = (props) => {
  console.log(props);

  return (
    <div className={styles.left}>
      <Tree />


    </div>
  );
};

export default tmp;

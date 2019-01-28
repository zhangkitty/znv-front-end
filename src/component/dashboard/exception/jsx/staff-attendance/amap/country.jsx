import React from 'react';
import { Map as Amap } from 'react-amap';
import { Wrapper, DistrictExplorer } from 'react-amapui-wrapper';
import { getLastcoordinate } from '../../../action';
import styles from './style.css';


export default class tmp extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    setInterval(
      () => dispatch(getLastcoordinate()),
      10000,
    );
  }


  render() {
    const useAMapUI = true;

    return (

      <div className={styles.test} />
    );
  }
}

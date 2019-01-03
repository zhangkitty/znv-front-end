import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChinaMap from './jsx/china-map';
import BMap from './jsx/b-map';
import Content from './jsx/content';
import { init, changeValue } from './actions';

class FSU extends Component {
  constructor(props) {
    console.log(1);
    super(props);
    const { dispatch } = props;
    dispatch(init(props));
    dispatch(changeValue('bmapShow', false));
  }

  render() {
    const { bmapShow, contentShow } = this.props;
    return (
      <div>
        {
          !bmapShow ? <ChinaMap {...this.props} /> :
          <BMap {...this.props} />
        }
        {
          bmapShow && <Content {...this.props} />
        }
      </div>
    );
  }
}


const mapStateToProps = state => state['network-detection/fsu'];
export default connect(mapStateToProps)(FSU);

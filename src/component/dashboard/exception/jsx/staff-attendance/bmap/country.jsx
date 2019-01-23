import React from 'react';

import { getLastcoordinate } from '../../../action';


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
    return (
      <div>
        <hr />
      </div>
    );
  }
}

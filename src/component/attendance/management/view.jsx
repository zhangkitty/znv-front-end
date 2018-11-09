import React, { Component } from 'react';
import { connect } from 'react-redux';
import { init } from './actions';
import { Select, DatePicker, Button } from 'shineout';
import styles from './style.css';
import AttendanceTable from './table';


class AttendanceManagement extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch(init(props));
  }

  render() {
    const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];
    return (
      <div>
        <div className={styles.oneLine}>
          <Select
            style={{ width: 200, marginRight: 20 }}
            keygen
            data={data}
            placeholder="城市"
            onChange={d => console.log(d)}
            onFilter={text => d => d.indexOf(text) >= 0}
          />
          <Select
            style={{ width: 200, marginRight: 20 }}
            keygen
            data={data}
            placeholder="团队"
            onChange={d => console.log(d)}
            onFilter={text => d => d.indexOf(text) >= 0}
          />
          <DatePicker
            style={{ width: 200, marginRight: 20 }}
            range={86400 * 10}
            value={[new Date(), new Date()]}
          />
          <Select
            style={{ width: 200, marginRight: 20 }}
            keygen
            data={data}
            placeholder="运维人员"
            onChange={d => console.log(d)}
            onFilter={text => d => d.indexOf(text) >= 0}
          />
        </div>

        <div className={styles.twoLine}>
          <Button>查询</Button>
          <Button>清空</Button>
          <Button>导出</Button>
        </div>

        <hr />

        <AttendanceTable {...this.props} />
      </div>
    );
  }
}


const mapStateToProps = state => state['attendance/management'];
export default connect(mapStateToProps)(AttendanceManagement);

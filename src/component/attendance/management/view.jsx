import React, { Component } from 'react';
import { Select, DatePicker, Button } from 'shineout';
import { connect } from 'react-redux';
import { search, init, changeCity, changePerson } from './actions';
import styles from './style.css';
import AttendanceTable from './table';


class AttendanceManagement extends Component {
  constructor(props) {
    super(props);
    const { dispatch, cityList } = props;
    dispatch(init(props));
  }

  render() {
    const {
      dispatch, cityList, personList, formData: { cityValue, personValue, date },
    } = this.props;
    return (
      <div>
        <div className={styles.oneLine}>
          <Select
            style={{ width: 200, marginRight: 20 }}
            keygen
            data={cityList}
            placeholder="城市"
            onChange={(d) => {
              dispatch(changeCity(this.props, d));
            }}
            defaultValue={cityValue}
            renderItem={d => d.areaName}
            value={cityValue}
            format={d => d.areaCode}
          />
          <Select
            disabled
            style={{ width: 200, marginRight: 20 }}
            keygen
            data={[]}
            placeholder="团队"
            onChange={d => console.log(d)}
          />
          <DatePicker
            style={{ width: 200, marginRight: 20 }}
            range={86400 * 10}
            value={date}
            data-bind="formData.date"
          />
          <Select
            style={{ width: 200, marginRight: 20 }}
            keygen
            data={personList}
            placeholder="运维人员"
            onChange={(d) => {
              dispatch(changePerson(this.props, d));
            }}
            renderItem={d => d.executorName}
            value={personValue}
            format={d => d.executor}
          />
        </div>

        <div className={styles.twoLine}>
          <Button
            onClick={() => dispatch(search(this.props))}
          >查询
          </Button>
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

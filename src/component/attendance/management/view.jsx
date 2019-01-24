import React, { Component } from 'react';
import { Spin } from 'antd';
import { Select, DatePicker, Button } from 'shineout';
import { connect } from 'react-redux';
import { search, init, changeCity, changePerson, newInit } from './actions';
import styles from './style.css';
import AttendanceTable from './table';


class AttendanceManagement extends Component {
  constructor(props) {
    super(props);
    const { dispatch, cityList, params } = props;
    if (params.city === undefined) {
      dispatch(init(props));
    } else {
      dispatch(newInit(props));
    }
  }

  render() {
    const {
      dispatch, cityList, personList, attendanceList, formData: {
        cityValue, personValue, date, isAttendance, loading,
      },
    } = this.props;
    return (
      loading ?
        <div style={{ textAlign: 'center' }}>
          <Spin size="large" />
        </div>
        :
        <div>
          <div className={styles.oneLine}>
            <Select
              style={{ width: 200, marginRight: 20 }}
              keygen
              data={cityList}
              placeholder="城市"
              // data-bind="formData.cityValue"
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
              clearable
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
            <Select
              style={{ width: 200, marginRight: 20 }}
              keygen
              data={attendanceList}
              renderItem={d => d.value}
              value={isAttendance}
              format={d => d.key}
              data-bind="formData.isAttendance"
            />

          </div>

          <div className={styles.twoLine}>
            <Button
              onClick={() => dispatch(search(this.props))}
            >查询
            </Button>
            {/* <Button>导出</Button> */}
          </div>

          <hr />

          <AttendanceTable {...this.props} />
        </div>

    );
  }
}


const mapStateToProps = state => state['attendance/management'];
export default connect(mapStateToProps)(AttendanceManagement);

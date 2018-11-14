import React from 'react';
import { Tabs } from 'shineout';
import OnlineRate from './online-rate/online-rate';
import StaffAttendance from './staff-attendance/staff-attendance';
import styles from '../style.css';

export default class Right extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const panelStyle = { padding: '12px 0' };
    return (
      <div className={styles.right}>
        <Tabs shape="line" defaultActive={0}>
          <Tabs.Panel border="transparent" style={panelStyle} tab="在线率">
            <OnlineRate {...this.props} />
          </Tabs.Panel>
          <Tabs.Panel style={panelStyle} tab="人员考勤">
            <StaffAttendance {...this.props} />
          </Tabs.Panel>
          <Tabs.Panel style={panelStyle} tab="工单">
            工单
          </Tabs.Panel>
          <Tabs.Panel style={panelStyle} tab="任务">
            任务
          </Tabs.Panel>
        </Tabs>
      </div>
    );
  }
}

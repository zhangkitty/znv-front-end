import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'shineout';
import OnlineRate from './online-rate/online-rate';

const Right = (props) => {
  console.log(props);
  const panelStyle = { padding: '12px 0' };
  return (
    <div>
      <Tabs shape="line" defaultActive={0}>
        <Tabs.Panel style={panelStyle} tab="在线率">
          <OnlineRate {...props} />
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="工单">
       工单
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="任务">
       任务
        </Tabs.Panel>
        <Tabs.Panel style={panelStyle} tab="人员考勤">
       人员考勤
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default Right;

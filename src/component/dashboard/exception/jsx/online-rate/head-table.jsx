import React from 'react';
import PropType from 'prop-types';
import { Table, Progress, Button } from 'shineout';
import { Icon } from 'antd';
import { compare } from 'utils/compare';
import { mydefineAction } from '../../action';
import DeviceOnlineRateCity from './device-onlineRate/device-onlineRate-city';

const HeadTable = (props) => {
  const { dispatch, onlineRate: { headTable: { dataSource } } } = props;
  const { node } = props;
  const len = node.id.split('.').length;


  let mydataSource = dataSource;
  if (Array.isArray(dataSource)) {
    if (dataSource.length === 2) {
      mydataSource = dataSource.map((v, idx) => {
        if (idx === 0) {
          return Object.assign({}, v, {
            devTotalInc: compare(v.devTotal, dataSource[1].devTotal),
            devOnlineNumInc: compare(v.devOnlineNum, dataSource[1].devOnlineNum),
            onlineNumRateInc: compare(v.onlineNumRate, dataSource[1].onlineNumRate),
            onlineNumInc: compare(v.onlineNum, dataSource[1].onlineNum),
            onlineRateInc: compare(v.onlineRate, dataSource[1].onlineRate),
            openNumInc: compare(v.openNum, dataSource[1].openNum),
          });
        }
        return v;
      });
    }
  }

  const renderIcon = (str) => {
    if (str === '>') {
      return <Icon type="arrow-up" />;
    }
    if (str === '<') {
      return <Icon type="arrow-down" />;
    }
    return '';
  };

  const columns = [
    {
      title: '     ',
      render: 'dataTime',
    },
    {
      title: '广告机总数',
      render: (d, idx) => {
        if (idx === 0) {
          return (
            <div>
              <span>{d.devTotal}</span>
              {renderIcon(d.devTotalInc)}
            </div>
          );
        }
        return <span>{d.devTotal}</span>;
      },
    },
    {
      title: '广告机在线数',
      render: (d, idx) => {
        if (idx === 0) {
          return (
            <div>
              <span>{d.devOnlineNum}</span>
              {renderIcon(d.devOnlineNumInc)}
            </div>
          );
        }
        return <span>{d.devOnlineNum}</span>;
      },
    },
    {
      title: '广告机在线率',
      render: (d, idx) => {
        if (idx === 0) {
          // return <span>{ `${Number(d.onlineNumRate * 100).toFixed(2)}%`}{renderIcon(d.onlineNumRateInc) }</span>;
          return (
            <div>
              {
                (function (props) {
                  if (renderIcon(d.onlineNumRateInc) === '') {
                    return <span>{ `${Number(d.onlineNumRate * 100).toFixed(2)}%`}{renderIcon(d.onlineNumRateInc) }</span>;
                  }
                  return (<Button
                    type="link"
                    style={{ marginLeft: -12 }}
                    onClick={() => {
                      // 各种指标变化都用这个接口
                      dispatch(mydefineAction(props, 11));
                    }}
                  >
                    { `${Number(d.onlineNumRate * 100).toFixed(2)}%`}{renderIcon(d.onlineNumRateInc) }
                          </Button>);
                }(props))
              }
            </div>
          );
        }
        return <span>{ `${Number(d.onlineNumRate * 100).toFixed(2)}%`}</span>;
      },

    },
    {
      title: '云运维FSU在线数',
      render: (d, idx) => {
        if (idx === 0) {
          return <span>{d.onlineNum}{renderIcon(d.onlineNumInc)}</span>;
        }
        return <span>{d.onlineNum}</span>;
      },
    },
    {
      title: 'FSU在线率',
      render: (d, idx) => {
        if (idx === 0) {
          // return <span>{ `${Number(d.onlineRate * 100).toFixed(2)}%`}{renderIcon(d.onlineRateInc) }</span>;
          return (
            <div>
              {
                (function (props) {
                  if (renderIcon(d.onlineRateInc) === '') {
                    return <span>{ `${Number(d.onlineNumRate * 100).toFixed(2)}%`}{renderIcon(d.onlineRateInc) }</span>;
                  }
                  return (<Button
                    type="link"
                    style={{ marginLeft: -12 }}
                    onClick={() => {
                      // 各种指标变化都用这个接口
                      dispatch(mydefineAction(props, 12));
                    }}
                  >
                    { `${Number(d.onlineNumRate * 100).toFixed(2)}%`}{renderIcon(d.onlineRateInc) }
                  </Button>);
                }(props))
              }
            </div>
          );
        }
        return <span>{`${Number(d.onlineRate * 100).toFixed(2)}%`}</span>;
      },
    },
    {
      title: 'FSU入网数',
      render: (d, idx) => {
        if (idx === 0) {
          return <span>{d.openNum}{renderIcon(d.openNumInc) }</span>;
        }
        return <span>{d.openNum}</span>;
      },
    },
    {
      title: '入网进度',
      render: (d, idx) => {
        if (idx === 0) {
          return (
            <div style={{ display: 'flex' }}>
              <Progress style={{ width: 50 }} value={d.openRate * 100} />
              <Button
                type="link"
                onClick={() => {
                  // 各种指标变化都用这个接口
                  dispatch(mydefineAction(props, 13));
                }}
              >
                {`${Number(d.openRate * 100).toFixed(2)}%`}
              </Button>
            </div>

          );
        }
        return (
          <div style={{ display: 'flex' }}>
            <Progress style={{ width: 50 }} value={d.openRate * 100} />
            <div style={{ marginLeft: 13 }}>{`${Number(d.openRate * 100).toFixed(2)}%`}</div>
          </div>

        );
      },
    },
  ];

  return (
    <div>
      <Table
        keygen="id"
        data={mydataSource}
        columns={columns}
        virticalAlign="middle"
      />
      <DeviceOnlineRateCity {...props} />
    </div>
  );
};

export default HeadTable;

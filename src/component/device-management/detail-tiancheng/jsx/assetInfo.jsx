import React from 'react';
import { Card } from 'shineout';
import { Card as CardAnt } from 'antd';

const { Meta } = CardAnt;
const tmp = (props) => {
  const { initData, historyData } = props;
  console.log(historyData, 'historyData');
  // const {
  //   assetNumber,
  //   sbbm,
  //   mac,
  //   devicesType,
  //   devicesBrand,
  //   installMode,
  //   dwNumber,
  //   remark,
  //   name,
  //   address,
  //   managerName,
  //   managerPhone,
  //   checkStatus,
  //   checkerName,
  //   mobileTelephone,
  //   handovertime,
  //   assetnumberurl,
  //   terminalsystemurl,
  //   terminalviewurl,
  //   shopurl,
  // } = initData;


  const left = [
    { key: '资产编号', value: 'assetNumber' },
    { key: '设备编号', value: 'sbbm' },
    { key: 'mac地址', value: 'mac' },
    { key: '设备类型', value: 'devicesType' },
    { key: '设备品牌', value: 'devicesBrand' },
    { key: '安装方式', value: 'installMode' },
    { key: '点位信息', value: 'dwNumber' },
    { key: '备注信息', value: 'remark' },
  ];


  const right = [
    { key: '商家名称', value: 'name' },
    { key: '商家地址', value: 'address' },
    { key: '联系人', value: 'managerName' },
    { key: '联系电话', value: 'managerPhone' },
    { key: '资产状态', value: 'checkStatus' },
    { key: '接收人', value: 'checkerName' },
    { key: '接收人电话', value: 'mobileTelephone' },
    { key: '交接时间', value: 'handovertime' },

  ];

  const pic = [
    { key: '资产编号照片', value: 'assetnumberurl' },
    { key: '终端系统照片', value: 'terminalsystemurl' },
    { key: '终端全景照片', value: 'terminalviewurl' },
    { key: '商家门头照片', value: 'shopurl' },
  ];

  return (
    <div>
      <Card.Accordion>
        <Card>
          <Card.Header>资产信息</Card.Header>
          <Card.Body style={{ display: 'flex' }}>
            <div style={{ flexBasis: '50%' }}>
              {
                left.map(v => (
                  <div>
                    <span style={{
                      display: 'inline-block', width: 100, textAlign: 'right', marginRight: 20,
                    }}
                    >{v.key}
                    </span>
                    <span style={{ display: 'inline-block', textAlign: 'left' }}>{initData[v.value]}</span>
                  </div>
                ))
              }
            </div>
            <div>
              {
                right.map(v => (
                  <div>
                    <span style={{
 display: 'inline-block', width: 100, textAlign: 'right', marginRight: 20,
}}
                    >{v.key}
                    </span>
                    <span style={{ display: 'inline-block', textAlign: 'left' }}>{initData[v.value]}</span>
                  </div>
                ))
              }
            </div>
          </Card.Body>
        </Card>
      </Card.Accordion>

      <Card.Accordion>
        <Card>
          <Card.Header>照片信息</Card.Header>
          <Card.Body style={{ display: 'flex' }}>
            {
              pic.map(v => (
                <CardAnt
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt={v.key} src={initData[v.value]} />}
                >
                  <Meta
                    title={v.key}
                    description={v.key}
                  />
                </CardAnt>
              ))
            }

          </Card.Body>
        </Card>
      </Card.Accordion>

      {
        historyData.length > 0 && <Card.Accordion defaultActive={2}>
          <Card>
            <Card.Header>历史信息</Card.Header>
            {
            historyData.map(t => (
              <Card.Body style={{ display: 'flex' }}>
                <div style={{ flexBasis: '50%' }}>
                  {
                    left.map(v => (
                      <div>
                        <span style={{
                          display: 'inline-block',
                          width: 100,
                          textAlign: 'right',
                          marginRight: 20,
                        }}
                        >{v.key}
                        </span>
                        <span style={{
                          display: 'inline-block',
                          textAlign: 'left',
                        }}
                        >{t[v.value]}
                        </span>
                      </div>
                    ))
                  }
                </div>
                <div>
                  {
                    right.map(v => (
                      <div>
                        <span style={{
                          display: 'inline-block',
                          width: 100,
                          textAlign: 'right',
                          marginRight: 20,
                        }}
                        >{v.key}
                        </span>
                        <span style={{
                          display: 'inline-block',
                          textAlign: 'left',
                        }}
                        >{t[v.value]}
                        </span>
                      </div>
                    ))
                  }
                </div>
              </Card.Body>
            ))
          }


          </Card>
        </Card.Accordion>
      }


    </div>
  );
};

export default tmp;

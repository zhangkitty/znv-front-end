import React from 'react';
import { Modal, Button } from 'shineout';
import { push } from 'react-router-redux';
import { Popover } from 'antd';
import { changeValue, initContent, getPicture, live, temperatureTrend, meteTrend, getPicture1 } from '../actions';
import styles from './style.css';
import Temp from './temperatureEcharts';
import Mete from './meteEcharts';


export default class Content extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    // dispatch(initContent(props));
    console.log(98989);
  }

  render() {
    console.log(this.props);
    const {
      modelVisiable, dispatch, AlarmInfo, deviceId, statusName, screen, smoke, ydn, statusCode, livingFlag, picUrl, screenUrl, meteTable, openTime, closeTime, temperature,
    } = this.props;
    return (
      <div>
        <Modal
          zIndex={4321}
          visible={modelVisiable}
          width={500}
          onClose={() => dispatch(changeValue('modelVisiable', false))}
        >

          {
            AlarmInfo.length > 0 ? <section style={{ background: '#e6e6e6', marginTop: 15 }}>告警信息</section>
              :
            <section style={{ color: 'blue', textAlign: 'center' }}>当前无告警信息</section>
          }

          <div>
            {
              AlarmInfo.length > 0 && AlarmInfo.map(v =>
                (
                  <div className={styles.deviceInfoLine}>
                    <div style={{ width: '80%' }}>{v.alarmTypeDesc}:{v.alarmTime}</div>
                    {
                        (function () {
                          const content = (<img
                            style={{ width: 450, height: 450 / 16 * 9 }}
                            src={v.imgUrl}
                            alt="没有图片"
                          />);
                          return (
                            <Popover content={content} trigger="click" overlayClassName={styles.popover} overlayStyle={{ zIndex: 1051 }}>
                              {
                                /** 静静的组件Popover包含Button的时候,button的click时间失效 * */
                              }
                              <Button>查看截屏</Button>
                            </Popover>
                          );
                        }(v))
                      }
                  </div>
                ))
            }
          </div>

          <section style={{ background: '#e6e6e6' }}>设备信息</section>

          <div>
            <div className={styles.deviceInfoLine}>
              <span>设备编码:  </span>
              <span>{deviceId}</span>
            </div>

            <div className={styles.deviceInfoLine}>
              <span>设备状态:  </span>
              <span>{statusName}</span>
            </div>

            <div className={styles.deviceInfoLine}>
              <div style={{ width: '80%' }}>定时开机:{openTime}</div>
              <Button type="secondary"> 配置 </Button>
            </div>

            <div className={styles.deviceInfoLine}>
              <div style={{ width: '80%' }}>定时关机:{closeTime}</div>
              <Button type="secondary" > 配置 </Button>
            </div>


            <div className={styles.deviceInfoLine}>
              <div style={{ width: '80%' }}>远程监播:{livingFlag}</div>
              {
                statusCode ?
                  <Button
                    onClick={() => {
                    // dispatch(live(deviceId));
                    //   console.log(window.location);
                    // window.open(`window.location/#/net`, '_blank');
                    //   dispatch(push(`/network-detection/video/${deviceId}`));
                      window.open(`http://120.79.12.124:9000/dashboard/index.html#/video/${deviceId}`, '_blank');
                  }}
                  >观看
                  </Button>
                  :
                  null
              }
            </div>

            <div className={styles.deviceInfoLine}>
              <div style={{ width: '80%' }}>屏幕:{screen}</div>
              <div>
                {
                  (function (props) {
                    if (screen === '正常') {
                      return null;
                    }
                    const content = <img style={{ width: 450, height: 450 / 16 * 9 }} src={screenUrl} alt="" />;
                    return (
                      <Popover content={content} position="bottom-right" trigger="click" overlayStyle={{ zIndex: 1051 }}>
                        <Button onClick={() => {
                          console.log(1);
                          dispatch(getPicture1(props));
                        }}
                        >查看截屏
                        </Button>
                      </Popover>
                    );
                  }(this.props))
                }
              </div>
            </div>

            <div className={styles.deviceInfoLine}>
              <span>烟雾:  </span>
              <span>{smoke}</span>
            </div>

            <div className={styles.deviceInfoLine}>
              <span>水浸:  </span>
              <span>{ydn}</span>
            </div>

            <div className={styles.deviceInfoLine}>
              <div style={{ width: '80%' }}>温度</div>
              {
                <Button
                  onClick={() => dispatch(temperatureTrend(this.props))}
                >查看趋势
                </Button>
              }

            </div>
            <Temp {...this.props} />


            {
              meteTable.map((v, idx) => (
                <div>
                  <div className={styles.deviceInfoLine}>
                    <div style={{ width: '80%' }}>{v.key}</div>
                    <Button onClick={() => {
                      dispatch(meteTrend(this.props, idx));
                    }}
                    >查看趋势
                    </Button>
                  </div>
                  <div>
                    <Mete {...Object.assign({}, this.props, { idx })} />
                  </div>
                </div>

              ))
            }
          </div>


        </Modal>
      </div>
    );
  }
}


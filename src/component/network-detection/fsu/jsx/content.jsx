import React from 'react';
import { Modal, Button, Popover } from 'shineout';
import { changeValue, initContent, getPicture, live, temperatureTrend, meteTrend } from '../actions';
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
                  <div style={{ display: 'flex', margin: 5 }}>
                    <div style={{ width: '80%' }}>{v.alarmTypeDesc}:{v.alarmTime}</div>
                    <div>
                      {
                        (function () {
                          const content = <img style={{ width: 450, height: 450 / 16 * 9 }} src={v.imgUrl} alt="没有图片" />;
                          return (
                            <Popover content={content} position="bottom-right" trigger="click">
                              <Button>查看截屏</Button>
                            </Popover>
                          );
                        }(v))
                      }
                    </div>
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
                    dispatch(live(deviceId));
                    window.open('http://cocozhang.cn/video/video.html', '_blank');
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
                  (function () {
                    if (screen === '正常') {
                      return null;
                    }
                    const content = <img style={{ width: 450, height: 450 / 16 * 9 }} src={screenUrl} alt="" />;
                    return (
                      <Popover content={content} position="bottom-right" trigger="click">
                        <Button style={{ marginLeft: 0 }}>查看截屏</Button>
                      </Popover>
                    );
                  }())
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


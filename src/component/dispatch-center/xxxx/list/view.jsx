import React from 'react';
import { Button, DatePicker } from 'shineout';
import DeckGL, { LineLayer, HexagonLayer, FirstPersonView, MapView } from 'deck.gl';
import { StaticMap } from 'react-map-gl';
import { connect } from 'react-redux';
import { init, change } from './action';
import styles from './style.css';


const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiemhhbmdjYW9jaGFvIiwiYSI6ImNqcGYwdXJ0bTA2M2gzd3BpZGxhZjlldDUifQ.oxTMZ2N7RLD0mJ9OkhcGLA';


// Source data CSV
const DATA_URL =
  'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv'; // eslint-disable-line


export const INITIAL_VIEW_STATE = {
  longitude: 108.9398165260,
  latitude: 34.3412614674,
  zoom: 4,
  // minZoom: 1,
  maxZoom: 15,
  pitch: 40.5,
  bearing: -27.396674584323023,
};

const LIGHT_SETTINGS = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2,
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];

const elevationScale = { min: 1, max: 300 };


class Container extends React.Component {
  static get defaultColorRange() {
    return colorRange;
  }

  constructor(props) {
    super(props);
    const { dispatch, data } = props;
    dispatch(init(props));
    this.state = {
      elevationScale: elevationScale.min,
    };

    this.startAnimationTimer = null;
    this.intervalTimer = null;

    this._startAnimate = this._startAnimate.bind(this);
    this._animateHeight = this._animateHeight.bind(this);
  }

  componentDidMount() {
    this._animate();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && this.props.data && nextProps.data.length !== this.props.data.length) {
      this._animate();
    }
  }

  componentWillUnmount() {
    this._stopAnimate();
  }

  _animate() {
    this._stopAnimate();

    // wait 1.5 secs to start animation so that all data are loaded
    this.startAnimationTimer = window.setTimeout(this._startAnimate, 1500);
  }

  _startAnimate() {
    this.intervalTimer = window.setInterval(this._animateHeight, 20);
  }

  _stopAnimate() {
    window.clearTimeout(this.startAnimationTimer);
    window.clearTimeout(this.intervalTimer);
  }

  _animateHeight() {
    if (this.state.elevationScale === elevationScale.max) {
      this._stopAnimate();
    } else {
      this.setState({ elevationScale: this.state.elevationScale + 1 });
    }
  }


  _renderTooltip() {
    const { x, y, hoveredObject } = this.props;

    if (!hoveredObject) {
      return null;
    }

    const lat = hoveredObject && hoveredObject.centroid[1];
    const lng = hoveredObject && hoveredObject.centroid[0];
    const count = hoveredObject.points.length;

    return (
      <div
        className={styles.tooltip}
        style={{ left: x, top: y }}
      >
        {/* <div>{`latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ''}`}</div> */}
        {/* <div>{`longitude: ${Number.isFinite(lng) ? lng.toFixed(6) : ''}`}</div> */}
        <div>{`${count}`}</div>
      </div>
    );
  }

  _renderLayers() {
    const {
      dataSource, radius = 1000, upperPercentile = 100, coverage = 1, dispatch,
    } = this.props;

    return [
      new HexagonLayer({
        id: 'heatmap',
        colorRange,
        coverage,
        data: dataSource,
        elevationRange: [0, 3000],
        elevationScale: this.state.elevationScale,
        extruded: true,
        getPosition: d => d,
        // lightSettings: LIGHT_SETTINGS,
        opacity: 1,
        radius,
        upperPercentile,
        pickable: true,
        onHover: ({ x, y, object }) => {
          dispatch(change('x', x));
          dispatch(change('y', y));
          dispatch(change('hoveredObject', object));
        },

      }),
    ];
  }


  render() {
    const {
      viewState, controller = true, baseMap = true, dispatch, dataTime, quotaType,
    } = this.props;

    return (
      <div>
        <div className={styles.overlay}>
          <Button
            className={styles.button1}
            type={quotaType === 1 ? 'primary' : null}
            onClick={() => dispatch(init(Object.assign({}, this.props, {
              quotaType: 1,
            })))}
          >广告机离线时间超长数
          </Button>
          <Button
            className={styles.button2}
            type={quotaType === 3 ? 'primary' : null}
            onClick={() => dispatch(init(Object.assign({}, this.props, {
              quotaType: 3,
            })))}
          >广告机稳定在线数
          </Button>
          <Button
            className={styles.button3}
            type={quotaType === 2 ? 'primary' : null}
            onClick={() => dispatch(init(Object.assign({}, this.props, {
              quotaType: 2,
            })))}
          >广告机频繁离线数
          </Button>
          <DatePicker
            clearable={false}
            className={styles.datePicker}
            data-bind="dataTime"
          />
        </div>
        <div>
          {this._renderTooltip()}
        </div>

        <DeckGL
          layers={this._renderLayers()}
          initialViewState={INITIAL_VIEW_STATE}
          viewState={viewState}
          controller={controller}

        >
          <div style={{ color: 'white' }}>asfaf</div>
          {baseMap && (
            <StaticMap
              reuseMaps
              mapStyle="mapbox://styles/zhangcaochao/cjpuhiw4a0crr2rmpfzoum9ks"
              preventStyleDiffing
              mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}

            />
          )}
        </DeckGL>
      </div>


    );
  }
}


const stateToProp = state => state['dispatch-center/xxxx/list'];
export default connect(stateToProp)(Container);

import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { SVGOverlay } from 'react-map-gl';

import { fromJS } from 'immutable';

function redraw({ project }) {
  const [cx, cy] = project([-122, 37]);
  return <circle cx={cx} cy={cy} r={4} fill="blue" />;
}


export default class Map extends Component {
  state = {
    viewport: {
      width: '100%',
      height: 800,
      latitude: 31.961,
      longitude: 118.831,
      zoom: 12.0,
    },
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ReactMapGL
          mapStyle="mapbox://styles/zhangcaochao/cjpnpuwqv13is2rpi62k2o747"


          // mapStyle={mapStyle}

          mapboxApiAccessToken="pk.eyJ1IjoiemhhbmdjYW9jaGFvIiwiYSI6ImNqcGYwdmtqMDA1bXYzcWxxaG56Y25rMG0ifQ.vd8gjGclpMMqIrnusmNqZQ"
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport })}
        >
          <SVGOverlay redraw={redraw} />
        </ReactMapGL>
      </div>

    );
  }
}

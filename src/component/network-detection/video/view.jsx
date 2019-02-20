import React from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { init } from './action';

// const video = require('./mydist/video-js.swf');
// // require('./mydist/video.min');


class Container extends React.Component {
  constructor(props) {
    super(props);
    console.log(1);
    const { dispatch, params: { id } } = this.props;
    dispatch(init(id));
    setInterval(() => console.log(1), 5000);
  }

  componentDidUpdate() {
    const { url } = this.props;
    // url = 'rtmp://202.69.69.180:443/webcast/bshdlive-pc';
    let player;
    // document.getElementById('url').focus();
    videojs.options.flash.swf = './mydist/video-js.swf';
    videojs.log.history.enable();

    // document.getElementById('form').addEventListener('submit', play);

    function play() {
      // e.preventDefault();
      // const input = document.getElementById('url');
      player = videojs('rtmp-player', {
        flash: {
          swf: './mydist/video-js.swf',
        },
        techOrder: ['flash'],
      }, function () {
        console.log('ready', url);
        this.src([
          { type: 'rtmp/mp4', src: url },
        ]);
        this.play();
      });
    }

    // play();
    if (this.props.url !== '') {
      play();
    }
  }


  render() {
    const { ready } = this.props;
    if (ready) {
      return (
        <div>
          <video
            id="rtmp-player"
            className="video-js"
            controls
            width="720"
            height="480"
            preload="none"
          />
        </div>
      );
    }
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }
}


const stateToProp = state => state['network-detection/video'];
export default connect(stateToProp)(Container);

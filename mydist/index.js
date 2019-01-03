/*
 * index.js
 * Copyright (C) 2018 disoul <disoul@DiSouldeMacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */
const url = 'rtmp://pili-live-rtmp.zhibo.znv.com/znvtest/maa442c051f03ff';
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

play();

// player = videojs('rtmp-player', {
//   flash: {
//     swf: './mydist/video-js.swf',
//   },
//   techOrder: ['flash'],
// }, () => {
// });

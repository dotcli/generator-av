// TODO add more boiletplate (e.g. dat.gui control)

const randomColor = require('randomcolor');

<% if(visualLib === 'three') {%>
global.THREE = require('three');
const TWEEN = require('tween.js');
const createOrbitViewer = require('three-orbit-viewer')(THREE)

/* Scene */
var app = createOrbitViewer({
  clearColor: 0x000000,
  clearAlpha: 1,
  fov: 65,
  position: new THREE.Vector3(0, 0, 50), // camera
})

app.on('tick', function(dt) {
  //.. handle pre-render updates
  TWEEN.update();
})
<% } %>

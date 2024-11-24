/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import {
  WebGLRenderer,
  Scene,
  sRGBEncoding,
  EventDispatcher,
  PCFSoftShadowMap,
  AmbientLight,
  ReinhardToneMapping,
  Vector2,
  Object3D,
  Mesh
} from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { CameraMgr } from './CameraMgr';
import { Doc } from './Doc';
import { CylinderObj } from './CylinderObj';
import { AObjectId, ArgType } from '../src';

class ThreeViewer extends EventDispatcher {
  domElement: HTMLElement;

  width: number;

  height: number;

  scene: Scene;

  cameraMgr: CameraMgr;

  renderer: WebGLRenderer;

  requestId: number | undefined;

  stats: Stats | undefined;

  doc: Doc;

  cylinderIds: AObjectId[] = [];

  constructor(element: HTMLElement) {
    super();

    this.domElement = element;
    this.width = this.domElement.clientWidth;
    this.height = this.domElement.clientHeight;

    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: true
    });
    this.initiateRenderer(this.renderer);

    const aspect = this.width / this.height;
    this.cameraMgr = new CameraMgr();
    this.cameraMgr.createCamera(aspect);

    this.scene = new Scene();
    this.scene.add(new AmbientLight(0xffffff, 0.8));

    this.doc = new Doc();
    const center = new Vector2(0, -1); // {x, z}
    const cylinder1 = new CylinderObj();
    cylinder1.center.copy(center);
    cylinder1.radius = 0.1;
    cylinder1.height = 0.12;
    this.doc.addAObject(cylinder1);
    const cylinder2 = new CylinderObj();
    cylinder2.center.copy(center);
    cylinder2.radius = 0.05;
    cylinder2.height = 0.08;
    this.doc.addAObject(cylinder2);

    cylinder2.baseCylinderId = cylinder1.Id(); // cylinder 2 is on the top of 1.

    this.cylinderIds.push(cylinder1.Id(), cylinder2.Id());

    const enableStats = true;
    if (enableStats) {
      this.stats = Stats();
      this.domElement.appendChild(this.stats.dom);
    }
  }

  initiateRenderer(renderer: WebGLRenderer) {
    renderer.autoClear = true;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.needsUpdate = true;

    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;

    this.renderer.setClearColor(0x000000, 0.0);
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.toneMapping = ReinhardToneMapping;

    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.setSize(this.width, this.height);

    this.domElement.appendChild(this.renderer.domElement);
  }

  onWindowResize() {
    this.renderer.setSize(this.domElement.clientWidth, this.domElement.clientHeight);
  }

  animate() {
    this.requestId = requestAnimationFrame(this.animate.bind(this));

    this.render();
  }

  render() {
    this.stats?.update();

    const visible: Object3D[] = [];
    this.scene.traverseVisible(obj3D => {
      visible.push(obj3D);
    });
    visible.forEach(obj3D => {
      obj3D.removeFromParent();
      if (obj3D instanceof Mesh) {
        obj3D.geometry.dispose();
        obj3D.material.dispose();
      }
    });

    // it should be event driven other than happen here.
    this.cylinderIds.forEach(id => {
      const cylinder = this.doc.getAObject(id);
      if (cylinder) {
        // whenever the argument change just touch it.
        this.doc.touchArg(cylinder.createArg(ArgType.BaseElevation));
      }
    });

    // calculate one time to make document consistent for all the touches above.
    this.doc.regen();

    this.cylinderIds.forEach(id => {
      const cylinder = this.doc.getAObject(id);
      if (cylinder instanceof CylinderObj) {
        this.scene.add(cylinder.getGraphics());
      }
    });

    const { renderer, scene, cameraMgr } = this;
    const camera = cameraMgr.getCamera();
    if (camera) {
      renderer.render(scene, camera);
    }
  }
}

export { ThreeViewer };

/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import { WebGLRenderer, Scene, sRGBEncoding, EventDispatcher, PCFSoftShadowMap, AmbientLight, ReinhardToneMapping } from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';
import { CameraMgr } from './CameraMgr';
import { Doc } from './Doc';

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

    // here is example how to update ui for dynamic view contents.
    // if (this.gview.dirty) {
    //   this.gview.onAdd(obj3D => this.scene.add(obj3D));
    //   this.gview.onDel(obj3D => {
    //     obj3D.removeFromParent();
    //     if (obj3D instanceof Mesh) {
    //       obj3D.geometry.dispose();
    //       obj3D.material.dispose();
    //     }
    //   });
    // }

    const { renderer, scene, cameraMgr } = this;
    const camera = cameraMgr.getCamera();
    if (camera) {
      renderer.render(scene, camera);
    }
  }
}

export { ThreeViewer };

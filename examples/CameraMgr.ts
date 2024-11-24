import { PerspectiveCamera } from 'three';

export class CameraMgr {
  camera: PerspectiveCamera | undefined;

  fov: number = 60;

  cameraNear: number = 0.01;

  cameraFar: number = 100;

  createCamera(aspect: number) {
    if (!this.camera) {
      this.camera = new PerspectiveCamera(this.fov, aspect, this.cameraNear, this.cameraFar);
    }
    return this.camera;
  }

  getCamera() {
    return this.camera;
  }
}

import { Vector2 } from 'three';
import { AObjectId, ArgType, UpdateProc } from '../src';
import { AObject } from './AObject';
import { CylinderBaseElevationProc } from './CylinderBaseElevationProc';
import { CylinderTopElevationProc } from './CylinderTopElevationProc';

export class CylinderObj extends AObject {
  category: 'cylinder' = 'cylinder';

  baseCylinderId: AObjectId | undefined;

  baseElevation: number;

  topElevation: number;

  height: number;

  center: Vector2;

  constructor() {
    super();
    this.center = new Vector2();
    this.baseElevation = 0;
    this.height = 1;
    this.topElevation = this.baseElevation + this.height;
  }

  getCategory(): string {
    return this.category;
  }

  // eslint-disable-next-line class-methods-use-this
  getTotalParents(): AObjectId[] {
    return [];
  }

  getPartialParents(): AObjectId[] {
    const parents: AObjectId[] = [];
    if (this.baseCylinderId) {
      parents.push(this.baseCylinderId);
    }
    return parents;
  }

  // eslint-disable-next-line class-methods-use-this
  getUpdateProcs(): UpdateProc[] {
    return [new CylinderBaseElevationProc(this.createArg(ArgType.BaseElevation)), new CylinderTopElevationProc(this.createArg(ArgType.TopElevation))];
  }
}

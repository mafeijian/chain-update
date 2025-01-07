import { AObjectId, Arg, ChainCore, IRegenDoc, IRegenObj } from '../src';
import { IDepenObj } from '../src/IDepenObj';

export class Doc implements IRegenDoc {
  core: ChainCore;

  latestObjId: number = 0;

  objects: IRegenObj[];

  constructor() {
    this.core = new ChainCore(this);
    this.objects = [];
  }

  getAObjectsByCategory(category: string): IDepenObj[] | undefined {
    return this.objects.filter(o => o.getCategory() === category);
  }

  // eslint-disable-next-line no-unused-vars
  forEachAObject(fn: (o: IDepenObj) => void): void {
    this.objects.forEach(fn);
  }

  touchArg(arg: Arg) {
    this.core.touchArg(arg);
  }

  regen() {
    this.core.regen();
  }

  private allocObjId() {
    this.latestObjId += 1;
    return this.latestObjId.toString();
  }

  addAObject(obj: IRegenObj) {
    obj.assignId(this.allocObjId());
    this.objects.push(obj);
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  getAObject(id: AObjectId): IRegenObj | undefined {
    const idx = this.objects.findIndex(o => o.Id() === id);
    if (idx < 0) {
      return undefined;
    }
    return this.objects[idx];
  }

  getAObjects(): IRegenObj[] {
    return this.objects;
  }
}

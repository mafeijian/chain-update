import { AObjectId, Arg, ChainCore, IRegenDoc, IRegenObj } from '../src';

export class Doc implements IRegenDoc {
  core: ChainCore;

  latestObjId: number = 0;

  objects: IRegenObj[];

  constructor() {
    this.core = new ChainCore(this);
    this.objects = [];
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

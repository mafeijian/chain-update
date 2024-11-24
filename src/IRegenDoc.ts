import { AObjectId } from './AObjectId';
import { Arg } from './Arg';
import { IDepenDoc } from './IDepenDoc';
import { IRegenObj } from './IRegenObj';
import { ChainCore } from './regen/ChainCore';

export abstract class IRegenDoc extends IDepenDoc {
  core: ChainCore;

  constructor() {
    super();
    this.core = new ChainCore(this);
  }

  // eslint-disable-next-line no-unused-vars
  abstract getAObject(id: AObjectId): IRegenObj | undefined;

  touchArg(arg: Arg): void {
    this.core.touchArg(arg);
  }

  regen() {
    this.core.regen();
  }
}

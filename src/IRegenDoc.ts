import { AObjectId } from './AObjectId';
import { Arg } from './Arg';
import { IDepenDoc } from './IDepenDoc';
import { IRegenObj } from './IRegenObj';

export interface IRegenDoc extends IDepenDoc {
  // eslint-disable-next-line no-unused-vars
  getAObject(id: AObjectId): IRegenObj | undefined;

  // eslint-disable-next-line no-unused-vars
  touchArg(arg: Arg): void;

  regen(): void;
}

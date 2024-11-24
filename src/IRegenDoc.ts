import { AObjectId } from './AObjectId';
import { IDepenDoc } from './IDepenDoc';
import { IRegenObj } from './IRegenObj';

export abstract class IRegenDoc extends IDepenDoc {
  // eslint-disable-next-line no-unused-vars
  abstract getAObject(id: AObjectId): IRegenObj | undefined;
}

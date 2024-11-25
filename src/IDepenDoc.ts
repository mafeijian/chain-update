import { AObjectId } from './AObjectId';
import { IDepenObj } from './IDepenObj';

export abstract class IDepenDoc {
  abstract getAObjects(): IDepenObj[];

  // eslint-disable-next-line no-unused-vars
  abstract getAObject(id: AObjectId): IDepenObj | undefined;
}

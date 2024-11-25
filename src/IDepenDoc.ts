import { AObjectId } from './AObjectId';
import { IDepenObj } from './IDepenObj';

export interface IDepenDoc {
  getAObjects(): IDepenObj[];

  // eslint-disable-next-line no-unused-vars
  getAObject(id: AObjectId): IDepenObj | undefined;
}

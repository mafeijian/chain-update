import { AObjectId } from './AObjectId';
import { IDepenObj } from './IDepenObj';

export interface IDepenDoc {
  // eslint-disable-next-line no-unused-vars
  getAObjectsByCategory(category: string): IDepenObj[] | undefined;

  // eslint-disable-next-line no-unused-vars
  forEachAObject(fn: (o: IDepenObj) => void): void;

  // eslint-disable-next-line no-unused-vars
  getAObject(id: AObjectId): IDepenObj | undefined;
}

import { AObjectId } from './AObjectId';

export interface IDepenObj {
  Id(): AObjectId;
  getTotalParents(): AObjectId[];
  getPartialParents(): AObjectId[];
  // eslint-disable-next-line no-unused-vars
  addParent(id: AObjectId);
  // eslint-disable-next-line no-unused-vars
  delParent(id: AObjectId);
  // eslint-disable-next-line no-unused-vars
  addChild(id: AObjectId);
  // eslint-disable-next-line no-unused-vars
  delChild(id: AObjectId);
  getParents(): AObjectId[];
  getChildren(): AObjectId[];
}

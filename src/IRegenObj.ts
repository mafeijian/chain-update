import { Arg } from './Arg';
import { AObjectId } from './AObjectId';
import { UpdateProc } from './regen/UpdateProc';

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

export interface IRegenObj extends IDepenObj {
  // eslint-disable-next-line no-unused-vars
  assignId(id: AObjectId);

  getCategory(): string;

  getUpdateProcs(): UpdateProc[];

  // eslint-disable-next-line no-unused-vars
  createArg(argType: string, data?: number): Arg;
}

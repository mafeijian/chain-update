import { Arg } from './Arg';
import { AObjectId } from './AObjectId';
import { UpdateProc } from './regen/UpdateProc';
import { IDepenObj } from './IDepenObj';

export interface IRegenObj extends IDepenObj {
  Id(): AObjectId;
  // eslint-disable-next-line no-unused-vars
  assignId(id: AObjectId): void;

  getCategory(): string;

  getUpdateProcs(): UpdateProc[];

  // eslint-disable-next-line no-unused-vars
  createArg(argType: string, data?: number): Arg;
}

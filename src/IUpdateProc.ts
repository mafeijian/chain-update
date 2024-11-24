import { Arg } from './Arg';
import { IRegenDoc } from './IRegenDoc';

export interface IUpdateProc {
  getResultArg(): Arg;
  // eslint-disable-next-line no-unused-vars
  getInputArgs(doc: IRegenDoc): Arg[];
}

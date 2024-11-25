import { Arg } from './Arg';
import { ErrorStatus } from './ErrorStatus';
import { IRegenDoc } from './IRegenDoc';

export interface IUpdateProc {
  getResultArg(): Arg;
  // eslint-disable-next-line no-unused-vars
  getInputArgs(doc: IRegenDoc): Arg[];
  // eslint-disable-next-line no-unused-vars
  execute(doc: IRegenDoc): ErrorStatus;
}

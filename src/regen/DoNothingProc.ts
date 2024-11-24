import { IRegenDoc } from '../IRegenDoc';
import { Arg } from '../Arg';
import { ErrorStatus } from '../ErrorStatus';
import { UpdateProc } from './UpdateProc';

/**
 * Do nothing procedure.
 *
 * @export
 * @class DoNothingProc
 * @extends {UpdateProc}
 */
export class DoNothingProc extends UpdateProc {
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  getInputArgs(doc: IRegenDoc): Arg[] {
    return [];
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  execute(doc: IRegenDoc): ErrorStatus {
    // do nothing
    return ErrorStatus.Success;
  }
}

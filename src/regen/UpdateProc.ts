import { IRegenDoc } from '../IRegenDoc';
import { Arg } from '../Arg';
import { ErrorStatus } from '../ErrorStatus';
import { IUpdateProc } from '../IUpdateProc';

/**
 *
 *         Arg           Arg
 *          |             |
 *          v             v
 *    +-----------+ +-----------+
 *     \           V           /
 *      \                     /
 *       \     UpdateProc    /
 *        \                 /
 *         \               /
 *          +-------------+
 *                 |
 *                 v
 *                Arg
 */
export abstract class UpdateProc implements IUpdateProc {
  readonly result: Arg;

  constructor(result: Arg) {
    this.result = result;
  }

  getResultArg(): Arg {
    return this.result;
  }

  // eslint-disable-next-line no-unused-vars
  abstract getInputArgs(doc: IRegenDoc): Arg[];

  /**
   * upc calculation
   *
   * @param doc the doc
   */
  // eslint-disable-next-line no-unused-vars
  abstract execute(doc: IRegenDoc): ErrorStatus;

  // eslint-disable-next-line class-methods-use-this
  dispose() {}

  toString() {
    const { id, data } = this.result;
    return `[${this.constructor.name}] -> ${id}${data ? `(${data})` : ''}`;
  }

  /**
   * for debugging
   * @returns info obj
   */
  dumpAsObj() {
    return { arg: this.result };
  }
}

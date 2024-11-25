import { Arg, ErrorStatus, IRegenDoc, IRegenObj, UpdateProc } from '../src';
import { ArgType } from '../src/ArgType';

/**
 *
 *       baseElev       height
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
 *              topElev
 */

export class CylinderTopElevationProc extends UpdateProc {
  constructor(obj: IRegenObj) {
    super(obj.createArg(ArgType.TopElevation));
  }

  getInputArgs(doc: IRegenDoc): Arg[] {
    const inputArgs: Arg[] = [];
    const arg = this.getResultArg();
    const id = arg.getAObjId();
    const obj = doc.getAObject(id);
    if (obj) {
      inputArgs.push(obj.createArg(ArgType.BaseElevation), obj.createArg(ArgType.Height));
    }
    return inputArgs;
  }

  execute(doc: IRegenDoc): ErrorStatus {
    const arg = this.getResultArg();
    const id = arg.getAObjId();
    const obj = doc.getAObject(id);
    if (obj) {
      (obj as any).topElevation = (obj as any).baseElevation + (obj as any).height;
      return ErrorStatus.Success;
    }
    return ErrorStatus.Failure;
  }
}

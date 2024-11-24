import { Arg, ArgType, ErrorStatus, IRegenDoc, UpdateProc } from '../src';

/**
 *
 * baseCylinder.topElev
 *          |
 *          v
 *    +-----------+ +-----------+
 *     \           V           /
 *      \                     /
 *       \     UpdateProc    /
 *        \                 /
 *         \               /
 *          +-------------+
 *                 |
 *                 v
 *              baseElev
 */

export class CylinderBaseElevationProc extends UpdateProc {
  getInputArgs(doc: IRegenDoc): Arg[] {
    const inputArgs: Arg[] = [];
    const arg = this.getResultArg();
    const id = arg.getAObjId();
    const obj = doc.getAObject(id);
    if (obj) {
      const baseId = (obj as any).baseCylinderId;
      if (baseId) {
        const baseObj = doc.getAObject(baseId);
        if (baseObj) {
          inputArgs.push(baseObj.createArg(ArgType.TopElevation));
        }
      }
    }
    return inputArgs;
  }

  execute(doc: IRegenDoc): ErrorStatus {
    const arg = this.getResultArg();
    const id = arg.getAObjId();
    const obj = doc.getAObject(id);
    if (obj) {
      const baseId = (obj as any).baseCylinderId;
      if (baseId) {
        const baseObj = doc.getAObject(baseId);
        if (baseObj) {
          (obj as any).baseElevation = (baseObj as any).topElevation;
          return ErrorStatus.Success;
        }
      }
    }
    return ErrorStatus.Failure;
  }
}

import { Arg, ArgType, ErrorStatus, IRegenDoc, UpdateProc } from '../src';
import { CylinderObj } from './CylinderObj';

export class CylinderBaseElevationProc extends UpdateProc {
  getInputArgs(doc: IRegenDoc): Arg[] {
    const inputArgs: Arg[] = [];
    const arg = this.getResultArg();
    const id = arg.getAObjId();
    const obj = doc.getAObject(id);
    if (obj instanceof CylinderObj) {
      const baseId = obj.baseCylinderId;
      if (baseId) {
        const baseObj = doc.getAObject(baseId);
        if (baseObj instanceof CylinderObj) {
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
    if (obj instanceof CylinderObj) {
      const baseId = obj.baseCylinderId;
      if (baseId) {
        const baseObj = doc.getAObject(baseId);
        if (baseObj instanceof CylinderObj) {
          obj.baseElevation = baseObj.topElevation;
          return ErrorStatus.Success;
        }
      }
    }
    return ErrorStatus.Failure;
  }
}

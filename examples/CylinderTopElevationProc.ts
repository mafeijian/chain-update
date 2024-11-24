import { Arg, ErrorStatus, IRegenDoc, UpdateProc } from '../src';
import { ArgType } from '../src/ArgType';
import { CylinderObj } from './CylinderObj';

export class CylinderTopElevationProc extends UpdateProc {
  // eslint-disable-next-line class-methods-use-this
  getInputArgs(doc: IRegenDoc): Arg[] {
    const inputArgs: Arg[] = [];
    const arg = this.getResultArg();
    const id = arg.getAObjId();
    const obj = doc.getAObject(id);
    if (obj instanceof CylinderObj) {
      inputArgs.push(obj.createArg(ArgType.BaseElevation), obj.createArg(ArgType.Height));
    }
    return inputArgs;
  }

  execute(doc: IRegenDoc): ErrorStatus {
    const arg = this.getResultArg();
    const id = arg.getAObjId();
    const obj = doc.getAObject(id);
    if (obj instanceof CylinderObj) {
      obj.topElevation = obj.baseElevation + obj.height;
      return ErrorStatus.Success;
    }
    return ErrorStatus.Failure;
  }
}

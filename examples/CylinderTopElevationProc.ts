import { Arg, ErrorStatus, IRegenDoc, UpdateProc } from '../src';
import { ArgType } from '../src/ArgType';

export class CylinderTopElevationProc extends UpdateProc {
  // eslint-disable-next-line class-methods-use-this
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

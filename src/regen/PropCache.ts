import { Arg } from '../Arg';
import { UpdateProc } from './UpdateProc';
import { ChainCore } from './ChainCore';
import { IRegenDoc } from '../IRegenDoc';

import { IRegenObj } from '../IRegenObj';
import { unique } from '../Unique';

export class PropCache {
  private readonly adjObjMap: Map<string, IRegenObj[]> = new Map();

  private readonly procMap: Map<string, UpdateProc[]> = new Map();

  private readonly parentMap: Map<UpdateProc, Arg[]> = new Map();

  private readonly doc: IRegenDoc;

  private readonly core: ChainCore;

  constructor(core: ChainCore, doc: IRegenDoc) {
    this.core = core;
    this.doc = doc;
  }

  clear() {
    this.adjObjMap.clear();
    this.procMap.clear();
    this.parentMap.clear();
  }

  // eslint-disable-next-line no-unused-vars
  getPropagatableObjs(fnGetPropagatableObjs: (arg: Arg) => IRegenObj[], arg: Arg): IRegenObj[] {
    const cacheObjs = this.adjObjMap.get(arg.toString());
    if (cacheObjs === undefined) {
      const dynObjs = unique(fnGetPropagatableObjs.apply(this.core, [arg]) as IRegenObj[]);
      this.adjObjMap.set(arg.toString(), dynObjs);
      return dynObjs;
    }
    return cacheObjs;
  }

  getUpdateProcs(obj: IRegenObj): UpdateProc[] {
    const cacheProcs = this.procMap.get(obj.Id());
    if (cacheProcs === undefined) {
      const dynProcs = unique(obj.getUpdateProcs());
      this.procMap.set(obj.Id(), dynProcs);
      return dynProcs;
    }
    return cacheProcs;
  }

  getInputArgs(proc: UpdateProc): Arg[] {
    const cacheParents = this.parentMap.get(proc);
    if (cacheParents === undefined) {
      const dynArgs = unique(proc.getInputArgs(this.doc));
      this.parentMap.set(proc, dynArgs);
      return dynArgs;
    }
    return cacheParents;
  }
}

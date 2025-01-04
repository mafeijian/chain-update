import * as GraphLib from 'graphlib';
import { IRegenDoc } from '../IRegenDoc';
import { IRegenObj } from '../IRegenObj';
import { Arg } from '../Arg';
import { DoNothingProc } from './DoNothingProc';
import { ErrorStatus } from '../ErrorStatus';
import { PropCache } from './PropCache';
import { UpdateProc } from './UpdateProc';
import { assert, alert } from '../Assertion';
import { ObjectDepen } from './ObjectDepen';

export class ChainCore {
  private touchedArgs: Map<string, Arg> = new Map();

  private doc: IRegenDoc;

  private graph: GraphLib.Graph;

  private cache: PropCache;

  private depen: ObjectDepen;

  constructor(doc: IRegenDoc) {
    this.doc = doc;
    this.cache = new PropCache(this, doc);
    this.depen = new ObjectDepen(this.doc);
    this.graph = new GraphLib.Graph();
  }

  touchArg(arg: Arg): void {
    this.touchedArgs.set(arg.toString(), arg);
  }

  // eslint-disable-next-line class-methods-use-this
  private getNodeName(proc: UpdateProc): string {
    return proc.result.toString();
  }

  private addEdge(graph: GraphLib.Graph, from: UpdateProc, to: UpdateProc) {
    const v = this.getNodeName(from);
    const w = this.getNodeName(to);
    if (graph.hasEdge(v, w) === false) {
      graph.setEdge(v, w);
    }
  }

  regen() {
    this.graph = new GraphLib.Graph();

    try {
      this.propagateTouches();
      // eslint-disable-next-line no-unused-vars
      const executeSteps = this.executeProcs(this.sortProcs());
    } catch (error) {
      const cycles = GraphLib.alg.findCycles(this.graph);
      assert(() => cycles.length < 1, `fail to regenerate with cycle ${cycles}: ${error}`);
    } finally {
      this.clear();
    }
  }

  private propgatedArgs: Set<string> = new Set<string>();

  private propagateTouches() {
    this.doc.forEachAObject(o => this.depen.rebuildDependency(o));
    this.cache = new PropCache(this, this.doc);
    this.propgatedArgs.clear();
    this.touchedArgs.forEach(arg => this.propagate(this.getProc(arg)));
    this.cache.clear();
  }

  private propagate(proc: UpdateProc) {
    const arg = proc.result;
    if (this.propgatedArgs.has(arg.toString())) {
      return;
    }
    this.propgatedArgs.add(arg.toString());
    const propagatingObjs = this.cache.getPropagatableObjs(this.getPropagatableObjs, arg);
    propagatingObjs.forEach(propagatingObj => {
      const iteratingProcs = this.cache.getUpdateProcs(propagatingObj);
      iteratingProcs.forEach(iteratingProc => {
        if (!iteratingProc.result.equals(arg)) {
          const inputArgs = this.cache.getInputArgs(iteratingProc);
          if (inputArgs.findIndex(input => input.equals(arg)) >= 0) {
            if (!this.hasNode(this.graph, iteratingProc)) {
              this.addNode(this.graph, iteratingProc);
            }

            if (this.hasNode(this.graph, proc)) {
              this.addEdge(this.graph, proc, iteratingProc);
            }

            this.propagate(iteratingProc);
          }
        }
      });
    });
  }

  private hasNode(graph: GraphLib.Graph, proc: UpdateProc): boolean {
    const nodeName = this.getNodeName(proc);
    if (graph.hasNode(nodeName) === false || graph.node(nodeName) === undefined) {
      return false;
    }
    return true;
  }

  private addNode(graph: GraphLib.Graph, proc: UpdateProc) {
    const nodeName = this.getNodeName(proc);
    graph.setNode(nodeName, proc);
  }

  private sortProcs() {
    return GraphLib.alg.topsort(this.graph).map((nodeName: any) => this.graph.node(nodeName) as UpdateProc);
  }

  /**
   * get corresponding update procedure
   * @param arg current argument
   * @returns get corresponding update procedure
   */
  private getProc(arg: Arg): UpdateProc {
    const argObj = this.getAObj(arg);
    if (!argObj) {
      return new DoNothingProc(arg);
    }
    const procs = this.cache.getUpdateProcs(argObj);
    const relateProcs = procs.filter(proc => proc.result.equals(arg));

    if (relateProcs.length > 0) {
      alert(() => relateProcs.length === 1, `${argObj.getCategory()} has multi procedures for result arg ${arg.type}`);
      return relateProcs[0];
    }

    return new DoNothingProc(arg);
  }

  /**
   * rely on object dependency
   */
  private getPropagatableObjs(arg: Arg): IRegenObj[] {
    const propagateObjs: IRegenObj[] = [];

    const argObj = this.getAObj(arg);
    if (argObj) {
      new Set([argObj.Id(), ...argObj.getChildren()]).forEach(id => {
        const propagateObj = this.doc.getAObject(id);
        if (propagateObj) {
          propagateObjs.push(propagateObj);
        }
      });
    }
    return propagateObjs;
  }

  /**
   * execute procedures one by one.
   */
  private executeProcs(procs: UpdateProc[]) {
    const executed: Map<UpdateProc, ErrorStatus> = new Map<UpdateProc, ErrorStatus>();
    for (let i = 0; i < procs.length; i += 1) {
      const proc = procs[i];
      if (this.cache.getInputArgs(proc).some(arg => this.touchedArgs.has(arg.toString()))) {
        const status = proc.execute(this.doc);
        executed.set(proc, status);
        if (ErrorStatus.Failure === status) {
          break;
        } else if (ErrorStatus.Success === status) {
          this.touchedArgs.set(proc.result.toString(), proc.result);
        }
      } else {
        executed.set(proc, ErrorStatus.Constant);
      }
    }
    return executed;
  }

  private getAObj(arg: Arg): IRegenObj | undefined {
    return this.doc.getAObject(arg.getAObjId());
  }

  size() {
    return this.touchedArgs.size;
  }

  deleteArgsForObj(obj: IRegenObj) {
    Array.from(this.touchedArgs.values())
      .filter(arg => obj.Id() === arg.getAObjId())
      .forEach(arg => this.touchedArgs.delete(arg.toString()));
  }

  clear() {
    this.touchedArgs.clear();
  }
}

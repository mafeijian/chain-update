import { AObjectId, Arg, IRegenObj, UpdateProc } from '../src';

export class AObject implements IRegenObj {
  id: AObjectId;

  parents: AObjectId[] = [];

  children: AObjectId[] = [];

  constructor() {
    this.id = '';
  }

  addParent(id: AObjectId) {
    const idx = this.parents.findIndex(parent => parent === id);
    if (idx < 0) {
      this.parents.push(id);
    }
  }

  delParent(id: AObjectId) {
    const idx = this.parents.findIndex(parent => parent === id);
    if (idx >= 0) {
      this.parents.splice(idx, 1);
    }
  }

  addChild(id: AObjectId) {
    const idx = this.children.findIndex(child => child === id);
    if (idx < 0) {
      this.children.push(id);
    }
  }

  delChild(id: AObjectId) {
    const idx = this.children.findIndex(child => child === id);
    if (idx >= 0) {
      this.children.splice(idx, 1);
    }
  }

  getParents(): AObjectId[] {
    return this.parents;
  }

  getChildren(): AObjectId[] {
    return this.children;
  }

  Id(): AObjectId {
    return this.id;
  }

  assignId(id: AObjectId) {
    this.id = id;
  }

  // eslint-disable-next-line class-methods-use-this
  getCategory(): string {
    throw new Error('What is my category?');
  }

  // eslint-disable-next-line class-methods-use-this
  getTotalParents(): AObjectId[] {
    throw new Error('Kill me if he is dead.');
  }

  // eslint-disable-next-line class-methods-use-this
  getPartialParents(): AObjectId[] {
    throw new Error('Update me if he is dead.');
  }

  // eslint-disable-next-line class-methods-use-this
  getUpdateProcs(): UpdateProc[] {
    throw new Error('What are upcs for my args?');
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  createArg(argType: string, data?: number): Arg {
    return new Arg(this.Id(), argType, data);
  }
}

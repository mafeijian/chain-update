import { AObjectId } from '../AObjectId';
import { IDepenDoc } from '../IDepenDoc';
import { IDepenObj } from '../IRegenObj';
import { unique } from '../Unique';

export class ObjectDepen {
  readonly doc: IDepenDoc;

  constructor(doc: IDepenDoc) {
    this.doc = doc;
  }

  /**
   * rebuild object dependencies
   * @param obj
   * @returns true if dependency changes，false if no change
   */
  rebuildDependency(obj: IDepenObj): boolean {
    const parentsToDel: AObjectId[] = [];
    const parentsToAdd: AObjectId[] = [];
    const currentParents = unique(obj.getTotalParents().concat(obj.getPartialParents())) as AObjectId[];
    currentParents.forEach(cp => {
      if (!obj.getParents().some(p => cp === p)) {
        parentsToAdd.push(cp);
      }
    });
    obj.getParents().forEach(p => {
      if (!currentParents.some(cp => cp === p)) {
        parentsToDel.push(p);
      }
    });
    return this.updateDependency(obj, parentsToDel, parentsToAdd);
  }

  /**
   * update parent of obj and child of parent
   * @param obj
   * @param parentsToDel
   * @param parentsToAdd
   * @private
   */
  private updateDependency(obj: IDepenObj, parentsToDel: AObjectId[], parentsToAdd: AObjectId[]) {
    if (parentsToDel.length < 1 && parentsToAdd.length < 1) {
      return false;
    }

    parentsToDel.forEach(parentId => {
      const parent = this.doc.getAObject(parentId);
      if (parent) {
        parent.delChild(obj.Id());
      }
      obj.delParent(parentId);
    });

    parentsToAdd.forEach(parentId => {
      const parent = this.doc.getAObject(parentId);
      if (parent) {
        parent.addChild(obj.Id());
      }
      obj.addParent(parentId);
    });
    return true;
  }

  onDeleteObject(obj: IDepenObj) {
    obj.getParents().forEach(parentId => {
      const parent = this.doc.getAObject(parentId);
      if (parent) {
        parent.delChild(obj.Id());
      }
      obj.delParent(parentId);
    });
  }

  dump() {
    const children = new Map<AObjectId, any>();
    const parents = new Map<AObjectId, any>();
    this.doc.getAObjects().forEach(e => {
      children.set(e.Id(), e.getChildren());
      parents.set(e.Id(), e.getParents());
    });
    return { children, parents };
  }
}

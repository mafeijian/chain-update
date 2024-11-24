/**
 *
 * @see {UpdateProc} update procedure
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
 *
 */

import { AObjectId } from './AObjectId';

export class Arg {
  readonly id: AObjectId;

  readonly type: string;

  readonly data: number | undefined;

  readonly caption: string;

  constructor(id: AObjectId, type: string, data?: number) {
    this.id = id;
    this.type = type;
    this.data = data;
    this.caption = `(${this.id})-${this.type} ${this.data !== undefined ? this.data : ''}`;
  }

  getAObjId() {
    return this.id;
  }

  equals(other: Arg): boolean {
    if (this.id && this.id !== other.id) {
      return false;
    }
    if (this.type && this.type !== other.type) {
      return false;
    }
    if (this.data !== other.data) {
      return false;
    }
    return true;
  }

  toString() {
    return this.caption;
  }

  static create(aobjId: AObjectId, type: string, data?: number) {
    return new Arg(aobjId, type, data);
  }
}

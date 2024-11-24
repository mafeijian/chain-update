/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
export enum ErrorStatus {
  /**
   * good
   */
  Success = 'Success',
  /**
   * fail to execute, regen suspends immediately.
   */
  Failure = 'Failure',
  /**
   * no change for execution
   */
  Unchanged = 'Unchanged',
  /**
   * all my parent unchanged
   */
  Constant = 'Constant'
}

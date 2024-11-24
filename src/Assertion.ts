/* eslint-disable no-console */
const validate = true;

export function assert(condition: () => boolean, msg: string) {
  if (validate && condition() !== true) {
    throw new Error(msg);
  }
}

export function alert(condition: () => boolean, msg: string) {
  if (validate && condition() !== true) {
    console.warn(msg);
  }
}

export function hint(condition: () => boolean, msg: string) {
  if (validate && condition() !== true) {
    console.log(msg);
  }
}

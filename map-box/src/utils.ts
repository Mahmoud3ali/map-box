/**
 *
 * @param constructor
 * @description
 * This decorator is used to seal the class and its prototype.
 * This is done to prevent the class from being extended.
 *
 */
export function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

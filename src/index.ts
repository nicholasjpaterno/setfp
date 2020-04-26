export default class SetFP<K> extends Set<K> {
  /**
   * SetFP is a Set with native `filter`, `map`,`reduce`, `every`, and `some` methods.
   * @param args Array of keys K[] to be inserted in into the SetFP
   */
  constructor(args?: K[]) {
    super(args);
  }

  private _map<T>(fn: FnSig<K, T>, op: (value: T) => void): void {
    this.forEach((val) => {
      op(fn(val, this));
    });
  }

  /**
   * Calls a defined callback function on each element of the SetFP, and returns a new SetFP that contains the result of each transformation.
   * @param fn A function that accepts up to two arguments. The map method calls the callback function one time for each element in the SetFP.
   */
  map<T>(fn: FnSig<K, T>): SetFP<T> {
    const res = new SetFP<T>();
    this._map<T>(fn, (val: T) => res.add(val));
    return res;
  }

  /**
   * Calls a defined callback function on each element of the SetFP, and returns an array that contains the results of each transformation.
   * @param fn A function that accepts up to two arguments. The map method calls the callback function one time for each element in the SetFP.
   */
  mapToArray<T>(fn: FnSig<K, T>): T[] {
    const res: T[] = [];
    this._map<T>(fn, (val: T) => res.push(val));
    return res;
  }

  private _filter(fn: FnSig<K, unknown>, op: (key: K) => void): void {
    this.forEach((key) => {
      if (fn(key, this)) op(key);
    });
  }

  /**
   * Returns the elements of the SetFP that meet the condition specified in the callback function.
   * @param fn A function that accepts up to two arguments. The filter method calls the callback function one time for each element in the SetFP.
   */
  filter(fn: FnSig<K, unknown>): SetFP<K> {
    const res = new SetFP<K>();
    this._filter(fn, (key: K) => res.add(key));
    return res;
  }

  /**
   * Returns an array K[] with the elements of the SetFP that meet the condition specified in a callback function.
   * @param fn A function that accepts up to two arguments. The filter method calls the callback function one time for each element in the SetFP.
   */
  filterToArray(fn: FnSig<K, unknown>): K[] {
    const res: K[] = [];
    this._filter(fn, (key: K) => res.push(key));
    return res;
  }

  /**
   * Calls the specified callback function for all the elements in the SetFP. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
   * @param fn A function that accepts up to two arguments. The reduce method calls the callback function one time for each element in the SetFP.
   * @param accumulator If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callback function provides this value as an argument instead of an element.
   */
  reduce<T>(
    fn: (accumulator: T, key: K, set: SetFP<K>) => T,
    accumulator: T = {} as T,
  ): T {
    this.forEach((key) => {
      accumulator = fn(accumulator, key, this);
    });
    return accumulator;
  }

  /**
   * The every method calls the callback function for each element in the SetFP until the callback returns a value which is coercible to the Boolean value false, or until the last element of the SetFP.
   * @param fn A function that accepts up to two arguments that is applied to every element and determines whether all the members satisfy the specified test.
   * @param thisArg An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value.
   */
  every(fn: FnSig<K, unknown>, thisArg?: unknown): boolean {
    for (const key of this) {
      if (!fn.call(thisArg, key, this)) {
        return false;
      }
    }
    return true;
  }

  /**
   * The some method calls the callback function for each element in the SetFP until the callback returns a value which is coercible to the Boolean value true, or until the last element of the SetFP.
   * @param fn A function that accepts up to two arguments that is applied to every element and determines whether all the members satisfy the specified test.
   * @param thisArg An object to which the this keyword can refer in the callback function. If thisArg is omitted, undefined is used as the this value.
   */
  some(fn: FnSig<K, unknown>, thisArg?: unknown): boolean {
    for (const key of this) {
      if (fn.call(thisArg, key, this)) {
        return true;
      }
    }
    return false;
  }
}

interface FnSig<K, T> {
  (key: K, set: SetFP<K>): T;
}

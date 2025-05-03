/**
 * Extends a function (or object) by adding properties to it.
 * 
 * @template F - The type of the function or object to extend.
 * @template P - The type of the properties to add to the function or object.
 * @param fn - The function or object to which properties will be added.
 * @param props - An object containing properties to add to the function or object.
 * @returns A new function or object that includes the original function along with the added properties.
 *
 * @example
 * const myFunc = () => "Hello!";
 * const extendedFunc = withProperties(myFunc, { description: "A simple greeting function" });
 * console.log(extendedFunc.description); // "A simple greeting function"
 *
 * @example
 * const obj = { name: "John" };
 * const extendedObj = withProperties(obj, { age: 30 });
 * console.log(extendedObj.age); // 30
 */
export function withProperties<
    F extends Function | object,
    P extends Record<string, any>
>(fn: F, props: P): F & P {
    return Object.assign(fn, props);
}

/**
 * Returns a promise that resolves with the original promise's result or a fallback value if it doesn't resolve within the specified timeout.
 *
 * @template T - The type of the original promise's resolved value.
 * @template R - The type of the fallback value. Defaults to `null`.
 * @param promise - The promise to monitor.
 * @param time - The maximum time (in milliseconds) to wait for the promise to resolve.
 * @param fallback - The value to return if the timeout is reached before the promise resolves. Defaults to `null`.
 * @returns A `Promise` that resolves with either the original result or the fallback value.
 *
 * @example
 * const slowPromise = new Promise(res => setTimeout(() => res("done"), 2000));
 * await withTimeout(slowPromise, 1000, "timeout");
 * // Returns: "timeout" after 1 second
 *
 * @example
 * const fastPromise = Promise.resolve("finished");
 * await withTimeout(fastPromise, 1000, "timeout");
 * // Returns: "finished" immediately
 */
export function withTimeout<T, R = null>(
    promise: Promise<T>,
    time: number,
    fallback?: R
): Promise<T | R> {
    const timeout = new Promise<R>((resolve) =>
        setTimeout(() => resolve((fallback??null) as R), time)
    );
    return Promise.race([promise, timeout]);
}
import { sleep, createInterval, createTimeout, createLoopInterval } from "#package";
import { describe, it, expect, vi } from "vitest";

describe('sleep function tests', () => {
  it('should resolve immediately when 0 ms is passed', async () => {
    vi.useFakeTimers();

    const sleepPromise = sleep(0);
    vi.runAllTimers();  

    await expect(sleepPromise).resolves.toBeUndefined();

    vi.useRealTimers();  
  });

  it('should resolve after 100 ms', async () => {
    vi.useFakeTimers();

    const sleepPromise = sleep(100);
    vi.advanceTimersByTime(100);

    await expect(sleepPromise).resolves.toBeUndefined();

    vi.useRealTimers();
  });

  it('should resolve after 5 seconds when using seconds()', async () => {
    vi.useFakeTimers();

    const sleepPromise = sleep.seconds(5);
    vi.advanceTimersByTime(5000);

    await expect(sleepPromise).resolves.toBeUndefined();

    vi.useRealTimers();
  });
});

describe("createInterval", () => {
  it("should run the function periodically", async () => {
    const mockRun = vi.fn();
    const { stop } = createInterval({
      time: 50,
      run: mockRun,
      immediately: false,
    });

    await sleep(100);
    expect(mockRun).toHaveBeenCalledTimes(1);

    stop();
  });

  it("should run the function immediately if immediately is true", async () => {
    const mockRun = vi.fn();
    createInterval({
      time: 50,
      run: mockRun,
      immediately: true,
    });

    expect(mockRun).toHaveBeenCalledTimes(1);
  });

  it("should stop the interval when stop() is called", async () => {
    const mockRun = vi.fn();
    const { stop } = createInterval({
      time: 50,
      run: mockRun,
      immediately: true,
    });

    stop();
    await sleep(100);
    expect(mockRun).toHaveBeenCalledTimes(1);
  });
});

describe("createTimeout", () => {
  it("should run the function after the specified delay", async () => {
    const mockRun = vi.fn();
    createTimeout({
      delay: 1000,
      run: mockRun,
    });

    await sleep(1100);
    expect(mockRun).toHaveBeenCalledTimes(1);
  });

  it("should stop the timeout when stop() is called", async () => {
    const mockRun = vi.fn();
    const { stop } = createTimeout({
      delay: 1000,
      run: mockRun,
    });

    stop();
    await sleep(1100);
    expect(mockRun).toHaveBeenCalledTimes(0);
  });
});

describe("createLoopInterval", () => {
  it("should loop through the array and reset after completing", async () => {
    const mockRun = vi.fn();
    const testArray = [1, 2, 3];

    const { stop } = createLoopInterval({
      time: 50,
      array: testArray,
      run: mockRun,
      immediately: false,
    });

    await sleep(250);
    expect(mockRun).toHaveBeenCalledTimes(4);

    stop();
  });

  it("should start the loop immediately if immediately is true", async () => {
    const mockRun = vi.fn();
    const testArray = [1, 2];

    createLoopInterval({
      time: 50,
      array: testArray,
      run: mockRun,
      immediately: true,
    });

    expect(mockRun).toHaveBeenCalledTimes(1);
  });

  it("should stop after completing the loop", async () => {
    const mockRun = vi.fn();
    const testArray = [1, 2];

    const { stop } = createLoopInterval({
      time: 50,
      array: testArray,
      run: mockRun,
      immediately: true,
    });

    await sleep(200);
    expect(mockRun).toHaveBeenCalledTimes(4);

    stop();
  });
});


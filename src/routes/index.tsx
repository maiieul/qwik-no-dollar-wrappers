import { $, component$, Signal, useSignal } from "@qwik.dev/core";

const someFactory = (instance: number, count: Signal<number>) => {
  let timesCalled = 0;

  return function () {
    timesCalled++;
    count.value = count.value + instance + timesCalled;
  };
};

export default component$(() => {
  const count = useSignal(0);

  const incrementFn = $(() => someFactory(123, count)());

  return <button onClick$={incrementFn}>{count.value}</button>;
});

import { $, component$, Signal, useSignal } from "@qwik.dev/core";

export default component$(() => {
  const count = useSignal(0);

  class MyClass {
    value: number;
    constructor(v: number) {
      this.value = v;
    }
  }

  const someFactory = $((instance: number, count: Signal<number>) => {
    let timesCalled = 0;

    return function () {
      timesCalled++;
      count.value = count.value + instance + timesCalled;
    };
  });

  const increment$ = $(async () => await someFactory(123, count));

  return <button onClick$={async () => increment$()}>{count.value}</button>;
});

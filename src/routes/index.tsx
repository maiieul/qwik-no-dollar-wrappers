import { $, component$, Signal, useSignal } from "@qwik.dev/core";

class MyClass {
  constructor(public readonly value: number) {}
}

const someFactory = (classInstance: MyClass, count: Signal<number>) => {
  let timesCalled = 0;
  return function () {
    timesCalled++;
    count.value = count.value + classInstance.value + timesCalled;
  };
};

export default component$(() => {
  const count = useSignal(0);
  const incrementRef = useSignal<() => void>();

  const incrementFn = $(() => {
    if (!incrementRef.value) {
      const myClass = new MyClass(1);
      incrementRef.value = someFactory(myClass, count);
    }
    incrementRef.value?.();
  });

  return <button onClick$={incrementFn}>{count.value}</button>;
});

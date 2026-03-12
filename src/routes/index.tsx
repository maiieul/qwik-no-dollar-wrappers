import { $, component$, Signal, useSignal } from "@qwik.dev/core";

const MyClass = class {
  constructor(public readonly instance: number) {}
};

const someFactory = (instance: number, count: Signal<number>) => {
  return function () {
    count.value = count.value + instance;
  };
};

export default component$(() => {
  const count = useSignal(0);

  const incrementFn = $(() => {
    const myClass = new MyClass(123);
    return someFactory(myClass.instance, count)();
  });

  return <button onClick$={incrementFn}>{count.value}</button>;
});

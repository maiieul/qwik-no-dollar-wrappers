import {
  component$,
  createSignal,
  Signal,
  useSignal,
  useVisibleTask$,
} from "@qwik.dev/core";

const MyClass = class {
  constructor(public readonly instance: number) {}
};

const someFactory = (instance: number, count: Signal<number>) => {
  return function () {
    count.value = count.value + instance;
  };
};

const myClass = new MyClass(123);
const countSig = createSignal(0);
const incrementFn = someFactory(myClass.instance, countSig);

export default component$(() => {
  const isClient = useSignal(false);
  useVisibleTask$(() => {
    isClient.value = true;
  });
  if (!isClient.value) {
    return <div>Loading...</div>;
  }
  return <button onClick$={() => incrementFn()}>{countSig.value}</button>;
});

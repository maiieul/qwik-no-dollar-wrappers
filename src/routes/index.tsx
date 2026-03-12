import {
  $,
  component$,
  noSerialize,
  NoSerialize,
  Signal,
  useSignal,
} from "@qwik.dev/core";

export default component$(() => {
  const count = useSignal(0);
  const instance = useSignal(123);
  const incrementFn = useSignal<() => void | undefined>();

  const someFactory = $((instance: number, count: Signal<number>) => {
    let timesCalled = 0;

    return function () {
      timesCalled++;
      count.value = count.value + instance + timesCalled;
    };
  });

  return (
    <button
      onClick$={async () => {
        if (!incrementFn.value) {
          incrementFn.value = await someFactory(instance.value, count);
        }

        incrementFn.value?.();
      }}
    >
      {count.value}
    </button>
  );
});

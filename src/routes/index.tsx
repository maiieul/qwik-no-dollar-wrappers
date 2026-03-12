import {
  $,
  component$,
  Signal,
  useSerializer$,
  useSignal,
} from "@qwik.dev/core";

export default component$(() => {
  const count = useSignal(0);

  const factoryState = useSerializer$({
    deserialize: (
      data: { instance: number; timesCalled: number } | undefined,
    ) => data ?? { instance: 123, timesCalled: 0 },
    serialize: (data) => data,
    initial: { instance: 123, timesCalled: 0 },
  });

  const someFactory = $(
    (
      instance: number,
      count: Signal<number>,
      state: typeof factoryState.value,
    ) => {
      return function () {
        state.timesCalled++;
        count.value = count.value + instance + state.timesCalled;
      };
    },
  );

  return (
    <button
      onClick$={async () => {
        const increment = await someFactory(
          factoryState.value.instance,
          count,
          factoryState.value,
        );
        increment();
      }}
    >
      {count.value}
    </button>
  );
});

export const INCREMENT = '@counter/increment';
export const increment = value => ({
  type: INCREMENT,
  value,
});

export const DECREMENT = '@counter/decrement';
export const decrement = value => ({
  type: DECREMENT,
  value,
});

export const RESET = '@counter/reset';
export const reset = () => ({
  type: RESET,
});

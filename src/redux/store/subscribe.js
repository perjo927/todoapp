export const makeSubscriber = (subscribers) => ({
  subscribe(callback) {
    subscribers.push(callback);
  },
});

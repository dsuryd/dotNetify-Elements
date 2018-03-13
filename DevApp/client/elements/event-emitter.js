const createEventEmitter = _ => {
   let subscribers = []
   return {
      emit(...args) {
         subscribers.forEach(subscriber => subscriber(...args));
      },

      subscribe(subscriber) {
         subscribers.push(subscriber);
         return () => subscribers = subscribers.filter(x => x !== subscriber);
      }
   }
}

export default createEventEmitter;
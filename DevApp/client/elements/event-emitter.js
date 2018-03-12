const createEventEmitter = _ => {
   let subscribers = []
   return {
      emit(value) {
         subscribers.forEach(subscriber => subscriber(value));
      },

      subscribe(subscriber) {
         subscribers.push(subscriber);
         return () => subscribers = subscribers.filter(x => x !== subscriber);
      }
   }
}

export default createEventEmitter;
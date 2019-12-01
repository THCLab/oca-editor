class Communicator {
  constructor(){
    this.callbacks = [];
  }

  subscribe (event, callback) {
    this.callbacks.push({event, callback, once: false});
  }
  subscribeOnce (event, callback) {
    this.callbacks.push({event, callback, once: true});
  }
  publish (event, data) {
    this.callbacks.forEach((obj, index, array) => {
      if(obj.event === event){
        obj.callback(data);
        if(obj.once){
          array.splice(index, 1);
        }
      }
    });
  }
}

export default new Communicator();

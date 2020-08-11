"use strict"; 
const expect = require('chai').expect;  
const Queue = function(){
    this._store = []; 
}

Object.defineProperty(Queue.prototype, 'isEmpty', {
    get : function(){
        return this._store.length === 0; 
    }
})

Queue.prototype.enqueue = function(val){
    this._store.push(val); 
}

Queue.prototype.dequeue = function(){
    return this._store.shift(); 
}


let QueueTest = function(){
    let q = new Queue();
    q.enqueue(3); 
    q.enqueue(5); 
    expect(q.dequeue()).to.equal(3); 
    expect(q.dequeue()).to.equal(5); 
}

module.exports = {
    Queue
}

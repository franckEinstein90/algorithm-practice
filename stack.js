"use strict";

const expect = require('chai').expect; 

const stack = (function(){
    return {
        exception : {
            emptyStack : "stack empty"
        }
    }
})(); 

let Stack = function(){
    this._store = []; 
}

Object.defineProperty(Stack.prototype, 'isEmpty', {
    get : function(){
       return this._store.length === 0;  
    }
})

Object.defineProperty(Stack.prototype, 'size', { get: function(){
    return this._store.length
}})

Object.defineProperty(Stack.prototype, 'peek', { 
        get: function(){
           if(this.size > 0){
            return this._store[this._store.length - 1];
           }
           throw stack.exception.emptyStack; 
        }
})

Stack.prototype.push = function( val ){
    if(Array.isArray(val)){
        this._store = this._store.concat(val)
    } else {
        this._store.push(val); 
    }
}
    
Stack.prototype.pop = function( ){
    if(this._store.length > 0){
        let retValue = this._store[this.size - 1]; 
        this._store = this._store.splice(0, this.size - 1); 
        return retValue; 
    }
    throw stack.exception.emptyStack; 
}


const stackTests = function(){
    let s = new Stack(); 
    s.push('a'); 
    expect(s.peek).to.equal('a'); 
    s.push('b'); 
    expect(s.pop()).to.equal('b'); 
    expect(s.peek).to.equal('a'); 
    s.pop(); 
    expect(s.isEmpty).to.equal(true);
}

module.exports = {
    stackTests, 
    Stack
}

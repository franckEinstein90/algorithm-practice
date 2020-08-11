"use strict"; 

const expect = require('chai').expect; 

const Tree = function(tag){
    this._nodeID = 1; 
    this._nodes = new Map(); 
    this._nodes.set(0, {tag, children:[]})
}

Tree.prototype.insert = function(parentID, tag){
    if(!this.nodes.has(parentID)) throw "bad parent id";
    let nodeDescriptor = this._nodes.get(parentID);
    nodeDescriptor.children.push(tag); 
    this._nodes.set(this._nodeID, {tag, children:[]}); 
    this._nodeID += 1; 
} 

module.exports = {
    Tree
}


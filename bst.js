"use strict"; 

const graphviz = require('graphviz'); 

const node = (function(){

    return {
        exception: {
            noData : "invalid insertion data", 
            duplicateData : "insertion data already exists"
        }
    }
})()

let Node = function( data ){
    if(data === undefined) throw node.exception.noData; 
    this.left  = null; 
    this.right = null; 
    this.data  = data; 
    this.minHeight = 1; 
    this.maxHeight = 1; 
}

Node.prototype.insertLeft = function(value){
    if(this.left === null){
        this.left = new Node(value)
    } else {
        this.left.insert(value)
    }
}

Node.prototype.insertRight = function(value){
    if(this.right === null){
        this.right = new Node(value)
    } else {
        this.right.insert(value)
    }
}

Node.prototype.insertSingle = function(value){
    if( this.data === value ) throw node.exception.duplicateData; 
    if( this.data > value ){
        this.insertLeft(value); 
        this.maxHeight = Math.max(
            this.left.maxHeight + 1,
            this.maxHeight
        )
        this.minHeight = Math.min(
            this.left.minHeight + 1, 
            this.minHeight
        )
        return ; 
    } 
    if( this.data < value ){
        this.insertRight(value); 
        this.maxHeight = Math.max( 
            this.maxHeight,
            this.right.maxHeight + 1
        )        
        this.minHeight  = Math.min(
            this.right.minHeight + 1, 
            this.minHeight
        )        
        return; 
    }
}

Node.prototype.insert = function( val ){
    if(Array.isArray(val)){
        val.forEach(v => {
            this.insertSingle(v)
        })
    } else {
        this.insertSingle(val); 
    }
}

Node.prototype.find = function( val ){
    if(this.data === val) return true; 
    if(val >= this.data) {
        if(this.right === null) return false; 
        return this.right.find(val); 
    }
    if(this.left === null) return false; 
    return this.left.find(val); 
}

Node.prototype.toSortedArray = function(){
   let returnArray = []; 
   if(this.left !== null){
       returnArray = returnArray.concat(this.left.toSortedArray()); 
   }
   returnArray.push(this.data);
   if(this.right !== null){
      returnArray = returnArray.concat(this.right.toSortedArray()) ; 
   }
   return returnArray; 
}

let BST = function( val ){
    if(val === undefined){
        this.head = null;
    } else {
        this.head = new Node(val); 
    }
}

BST.prototype.insert = function(val){
    console.log(`inserting ${val} in the bst`); 
    if(this.head === null) {
        this.head = new Node(val); 
    } else {
        this.head.insert(val); 
    }
    if(this.minHeight < this.maxHeight + 2) {
        console.log("tree is no longer balanced"); 
    }
}

BST.prototype.print = function(){
    return this.head.toSortedArray(); 
}

BST.prototype.draw = function(){
    let g = graphviz.digraph("G");

    let traverse = function(node){
        if (node === null) return; 
        let head = g.addNode(node.data); 
        if (node.left !== null){
            let left = traverse(node.left); 
            g.addEdge(head, left); 
        }
        if (node.right !== null){
            let right = traverse(node.right); 
            g.addEdge(head, right); 
        }
        return head; 
    }
    traverse(this.head); 
    return(g.output('png', 'test.png'));  
}

Object.defineProperty(BST.prototype, 'maxHeight', {
    get :  function(){
        if(this.head === null) return 0; 
        return this.head.maxHeight; 
    }
})


Object.defineProperty(BST.prototype, 'minHeight', {
    get : function(){
       if(this.head === null) return 0; 
       return this.head.minHeight;   
    }
})

module.exports = {
   BST
}

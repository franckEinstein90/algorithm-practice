"use strict"; 
const graphviz = require('graphviz'); 
const Queue = require('./queue').Queue; 
const expect = require('chai').expect;
 
const node = (function(){
    return {
        exception:{
            duplicateNode : "Duplicate Node Error"
        }
    }
})()


const Graph = function(){
    this.nodes = new Map(); 
    this.vertices = []; 
}

Graph.prototype.addNode = function(tag){
    if( !this.nodes.has(tag) ){
        this.nodes.set(tag, [])
        return; 
    }
    throw graph.exception.duplicateNode; 
}

Graph.prototype.addVertice = function( verticeDef ){
    let addToVerticeArray = (t1, t2) => {
        let vertArray = this.nodes.get(t1);
        if(!vertArray.includes(t2)){
            vertArray.push(t2); 
        }
    }
        
    let t1 = verticeDef.from
    let t2 = verticeDef.to   
    addToVerticeArray(t1,t2); 
}

Graph.prototype.breadthFirstSearch = function( cb ){
    let q = new Queue();
    let visited = []; 

    let exploreFromNode = (nodeTag) => {
        if(!visited.includes(nodeTag)){
           visited.push(nodeTag); 
           cb(nodeTag);
           this.nodes.get(nodeTag).forEach(v => {
                if(!visited.includes(v)) q.enqueue(v); 
           }) 
        }
        while(!q.isEmpty){
            let node = q.dequeue(); 
            exploreFromNode(node); 
        }
    }

    this.nodes.forEach((vertices, key) => {
        if(visited.includes(key)){
            while(!q.isEmpty){
                let node = q.dequeue(); 
                exploreFromNode(node); 
            }
        } else {
            exploreFromNode(key); 
       }
    })
}

Graph.prototype.draw = function(){
    let g = graphviz.digraph("G");
    this.nodes.forEach((_,key) => {
        g.addNode(key); 
    })    
    this.nodes.forEach((edges, key) =>{
        edges.forEach(dest => {
            g.addEdge(key, dest)
        })
    })
    return(g.output('png', 'test.png'));  
} 


let graphTests = function(){
    let g = new Graph();
    'abcdefghi'.split('').forEach(n => g.addNode(n)); 
    g.addVertice({from: 'a', to: 'b'});  
    g.addVertice({from: 'a', to: 'c'});  
    g.addVertice({from: 'a', to: 'f'});  
    g.addVertice({from: 'b', to: 'i'});  
    g.addVertice({from: 'b', to: 'e'});  
    g.addVertice({from: 'c', to: 'd'});  
    g.addVertice({from: 'c', to: 'g'});  
    g.addVertice({from: 'e', to: 'h'});  
    g.draw();
 
    let bfsArray = []; 
    g.breadthFirstSearch( function(tag) {
        bfsArray.push(tag);  
    }); 
    expect(bfsArray.join('')).to.equal('abcfiedgh'); 

}


module.exports = {
    Graph, 
    graphTests
}

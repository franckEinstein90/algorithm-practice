
let Path = function(start, end, cost,nodes){
   this.nodes = nodes || [start]; 
   this.start = start; 
   this.end = end; 
   this.cost = cost; 
}

Path.prototype.minus = function(start, graph){
   //returns array of nodes not included
   //in this path
   let nodes = graph.map((_,idx)=>idx)
   .filter((_,idx) => {
       if(idx === start) return false; 
       if(this.nodes.includes(idx)) return false; 
       return true; 
   })
   return nodes; 
}


Path.prototype.descendentPaths = function(start, memo, graph){
   //returns a set of paths
   //that finish with this path 
   if(Number.isNaN(this.cost)) return []; 
   let notIns = this.minus(start, graph);
   debugger; 
/*    if(notIns.length === 0){
      return 0;  
   }
   notIns.forEach(node => {
       memo.store(new Path(node, this.end, Math.min({
           

       }), node))
   }) */
   return 1; 
}



const setup = function(start, memo, graph){
  graph.forEach((row,idx) => {
       if(idx !== start) {
           memo.push(new Path(idx, start, graph[idx][start])); 
       }
   })
}

const solve = function(start, memo, graph){
  memo.forEach(path => {
       memo.push(path.descendentPaths(start, memo, graph)); 
       debugger; 
  }) 

}

const tsp = function(graph){
   let memo = [];  
   let numberOfNodes = graph.length;  
   setup(0, memo, graph); 
   solve(0, memo, graph); 
//   let minCost = findMinCost(0, memo, numberOfNodes, graph); 
 //  let tour = findOptimalTour(0, memo, numberOfNodes, graph);
//    return (minCost, tour);  
   
   
}


tsp([
   [0,     1,      3], 
   [NaN,   0,      2], 
   [1,     NaN,    0]

])




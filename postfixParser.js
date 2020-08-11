"use strict"; 
const Stack = require('./Stack').Stack; 
const expect= require('chai').expect; 


const operators = new Map(); 
operators.set('*', (x,y) => x * y);
operators.set('+', (x,y) => x + y);
operators.set('-', (x,y) => x - y);


let postfixEvaluate = function(expr) {
 
    let parsed = expr.split(/\s*/); 
    let s1 = new Stack(); 
    let s2 = new Stack();

    parsed.forEach(token => {
        s1.push(token); 
    })

    let evalSubExpression = function(){
        let subExpr = [];
        let parStack = new Stack();
        parStack.push(')'); 
        let token = s1.pop(); 
        while( !parStack.isEmpty){
            if(token === '(') {
                parStack.pop();
                if(parStack.isEmpty) continue;
            }
            if( token === ')'){
                parStack.push(token);
            } 
            subExpr.push(token);
            token = s1.pop(); 
        }
        return postfixEvaluate(subExpr.reverse().join(' ')); 
    }

    while(!s1.isEmpty){
        let token = s1.pop(); 
        if(operators.has(token)){
            let op = operators.get(token);
            s1.push(op(s2.pop(),s2.pop())); 
            continue; 
        }
        if(token === ')'){
            s2.push(evalSubExpression());  
            continue; 
        } 
        s2.push(parseInt(token)); 
    }
    return s2.pop(); 
}

const postfixEvaluateTest = function(){
    let evaluate = expr => postfixEvaluate(expr);
    expect(evaluate('* 4 5')).to.equal(20); 
    expect(evaluate('+ 4 * 5 3')).to.equal(19); 
    expect(evaluate('* 4 + 5 3')).to.equal(32); 
    expect(evaluate('* + 4 2 + 5 3')).to.equal(48); 
    expect(evaluate('* ( + 4 5 ) 3')).to.equal(27); 
    expect(evaluate('* ( + 4 5 ) (- 2 3)')).to.equal(-9); 
    expect(evaluate('* ( + 4 (- 5 3) ) (- 2 3)')).to.equal(-6); 
    expect(evaluate('* ( * 2 (- 5 3) ) (- 2 3)')).to.equal(-4); 
}

module.exports = {
    postfixEvaluate,
    postfixEvaluateTest
}


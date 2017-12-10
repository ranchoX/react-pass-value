import React from 'react'
import ReactDOM from 'react-dom';
import Hello from './Hello'
let obj = {a:4,b:5}
let newObj = {...obj,c:7,b:8};
console.log(newObj)


ReactDOM.render(<Hello />, document.getElementById('main'));
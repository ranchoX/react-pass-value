import React,{Component} from 'react'
import EventEmitter from 'eventemitter3';
const EVENT = new EventEmitter();

class NodeOne extends Component{
    constructor(props){
        super(props)
        this.state={
            counter:0
        };
        EVENT.on('NodeOne:increment',(num)=>{
            this.setState({
                counter:this.state.counter+num
            })
        })
    }
    render(){
        return (
            <div>
                <h4>Node One 当前counter:{this.state.counter}</h4>
                <button onClick={()=>{
                    EVENT.emit('NodeTwo:increment',20)
                }}>Node Two 加 20</button>
            </div>
        )
    }
}

class NodeTwo extends Component{
    constructor(props){
        super(props)
        this.state={
            counter:0
        };
        EVENT.on('NodeTwo:increment',(num)=>{
            this.setState({
                counter:this.state.counter+num
            })
        })
    }
    render(){
        return (
            <div>
                <h4>Node Two当前counter:{this.state.counter}</h4>
                <button onClick={()=>{
                    EVENT.emit('NodeOne:increment',5)
                }}>Node One 加 5</button>
            </div>
        )
    }
}

export default function(){
    return (
        <div>
            <NodeOne/>
            <NodeTwo/>
        </div>
    )
}
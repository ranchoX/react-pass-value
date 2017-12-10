import React,{Component} from 'react'
import {createStore,combineReducers} from 'redux'
import { Provider,connect } from 'react-redux'

/**
 * reducer 用来描述state 是怎样改变的
 * @param state
 * @param action
 * @returns {number}
 */
function reducerOne(state=0,action){
    switch (action.type) {
        case 'reducerOne/INCREMENT':
            return state + 1
        case 'reducerOne/DECREMENT':
            return state - 1
        default:
            return state
    }
}

const store = createStore(combineReducers({reducerOne}))

class ReduxNodeOne extends Component{
    render(){
        return (
            <div>
                <h6>节点一</h6>
                <button onClick={()=>{
                    this.props.increment()
                }}>加1</button>
                <button onClick={()=>{
                    this.props.decrement()
                }}>减1</button>
            </div>
        )
    }
}
class ReduxNodeTwo extends Component {
    render(){
        return (
            <div>
                <h6>节点二</h6>
                <span>Counter:{this.props.counter}</span>
            </div>
        )
    }
}
const ConnectedReduxNodeTwo = connect(({reducerOne})=>{
    return {
        counter:reducerOne
    }
})(ReduxNodeTwo)

const ConnectedReduxNodeOne= connect(null,{
    increment:function(){
        return {
            type:'reducerOne/INCREMENT'
        }
    },
    decrement:function(){
        return {
            type:'reducerOne/DECREMENT'
        }
    }
})(ReduxNodeOne)

export default function(){
    return (
        <Provider store={store}>
            <div>
                <h1>Redux Simple Demo</h1>
                <ConnectedReduxNodeOne />
                <ConnectedReduxNodeTwo/>
            </div>
        </Provider>
    )
};
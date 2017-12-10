#React 页面间传值

react 组件之间传值的方案有很多，下面是我个人经验的总结


###props 来传递值

##### 传值方式：
* 通过props 获取值
* 通过props 提供的func去修改值

##### 优点：
* 不需要任何第三方的组件，纯react，非常纯哦

##### 缺点：
* 代码调试有些麻烦，但是可以react 插件辅助查看到当前react 对象的props

##### 注意事项：
一般在表单页面中用到组件时候会用到props 传递值，需要注意下，最好页面的状态控制都在该页面的顶级节点的state 的，不要尝试获取或控制子节点的state，所以组件内部state是父级节点不关心的


##### Demo 代码如下：

```javascript
import React,{Component} from 'react';
import PropTypes from 'prop-types'

class ChildNode extends Component{
    static PropTypes={
        value:PropTypes.string.isRequired,
        onChange:PropTypes.func.isRequired
    }
    render(){
        const {value,onChange} = this.props;
        return (
            <div>
                <span>这里是子节点值：{value}</span><br/>

                <input type="text" value={value} onChange={(e)=>{
                    console.log('开始更改值')
                    onChange(e.target.value)
                }}/>
            </div>
        )
    }
}


class Parent extends Component{
    state={
        childValue:'this is the value of the child node'
    }
    onChildValueChange=(val)=>{//注意这里用ES6 的array function 来绑定当前的this
        this.setState({childValue:val})
    }
    render(){
        const {childValue} = this.state;
        return (
            <div>
                <span>这里是父节点</span>
                <div>
                    <span>父节点控制子节点的内容</span>
                    <button onClick={()=>{
                        let childValue = this.state.childValue||""
                        this.setState({
                            childValue:childValue+'我最帅！'
                        })
                    }}>内容直接加上我最帅</button>
                </div>
                <br/>
                <br/>
                <ChildNode value={childValue} onChange={this.onChildValueChange}/>
            </div>
        )
    }
}


export default Parent;
```


###Redux

这里使用redux-react 来连接 react 和 redux。

##### 传递方式：

获取值：通过redux-react connect()

传递值：通过dispatch 具体的action

##### 优点：

* 可以通过redux-logger 组件来查看数据的变化过程，可以容易的调试复杂的业务逻辑
* 全局的数据都可以获取到以及修改

##### 缺点：

* 因为业务独立逻辑代码独立到action、reducer里面，需要增加code的代码量以及单独action、reducer文件的分割。

> 可以借助文件夹名称的约定和第三方组件来弥补上面的缺点

##### 注意事项

通过connect 传递过来的props 值不能修改哦。只读的！

##### Demo 代码如下：


```javascript
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
```

### context
纯react 页面的时候，如果数据的传递要通过多层react 对象的时候，你可以考虑context 传递值哦。
##### 传递方法：

获取值：子组件内定义`static contextTypes={
    name:PropTypes.string.isRequired,
}` 在通过this.context 去获取


传递值：父组件定义`static childContextTypes={
    name:PropTypes.string
}`和`getChildContext(){
    return {
        name:'爷爷'
    }
}`

##### 优点：
* 可以透过多层react 传值

##### 缺点：
* 有点打乱数据传递的流向，不好理解数据

##### 注意事项：
* 一般在写通用性组件的时候才会用到，其他时候尽量用props 或者 redux 去实现

Demo 如下：

```javascript
import React,{Component} from 'react'
import PropTypes from 'prop-types'

class ContextParent extends Component{
    static childContextTypes={
        name:PropTypes.string
    }
    render(){
        return (
            <div>
                Node Parent
                {this.props.children}
            </div>
        )
    }

    getChildContext(){
        return {
            name:'爷爷'
        }
    }
}

class Context extends Component{
    render(){
        return <div>
            Current Node
            {this.props.children}
        </div>
    }
}

class ContextChild extends Component{
    static contextTypes={
        name:PropTypes.string.isRequired,
    }
    render(){
        return (
            <div>
                Node Children
                <span>Parent:{this.context.name}</span>
            </div>
        )
    }
}

export default function(){
    return (
        <ContextParent>
            <Context>
                <ContextChild/>
            </Context>
        </ContextParent>
    )
}
```

###event 传值
通过 eventemitter3 library 实现，也可以用其他的event 库

该传值方案一般作为react state 存储数据时候需要联动触发的业务逻辑以及专业填上线前出现的业务逻辑的代码坑。

##### 传值方式：
获取值：通过在constructor 里面监听event 事件，再setState到内部state

传递值： 触发 emit 事件

##### 优点：
* 事件驱动，可以和其他框架做数据交换

##### 缺点
* 数据流向不明确，不好理解和后续维护

##### 注意事项
* event 的 事件名称 最好是全局的constants 对象，同时也是有规律的

##### Demo 如下：

```javascript
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
```



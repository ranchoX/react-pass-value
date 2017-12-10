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
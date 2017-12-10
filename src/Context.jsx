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
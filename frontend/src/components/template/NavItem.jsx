import React from 'react'

export default props => {
    return (
        <a href ={props.path}>
            <i className = {`fa fa-${props.icon}`}></i>{props.title}
        </a>
    )
}
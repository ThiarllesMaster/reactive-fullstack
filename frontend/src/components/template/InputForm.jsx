import React from 'react'

export default props =>
    <div className="col-12 col-md-6">
        <div className="form-group">
            <label>{props.label}</label>
            <input type="text" className="form-control"
                name={props.name}
                value={props.value}
                onChange={props.method}
                placeholder={props.placeholder}
            ></input>
        </div>
    </div>
import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import InputForm from '../template/InputForm'
import ReactPaginate from 'react-paginate'

const headerProperties = {
    icon: 'users',
    title: 'Users',
    subtitle: 'Register of users (create, remove, update, delete)'
}

const baseURL = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: '' },
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseURL}/${user.id}` : baseURL
        axios[method](url, user).then(resp => {
            const list = this.getUpdatedList(resp.data)
            this.setState({ user: initialState.user, list })
        })
    }

    updateFields(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    componentWillMount() {
        axios(baseURL).then(resp => {
            this.setState({list: resp.data})
        })
    }

    loadUser(user) {
        this.setState({user})
    } 

    removeUser(user) {
        axios.delete(`${baseURL}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({list})
        })
    }


    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <InputForm label="Name" name="name" value={this.state.user.name}
                        method={e => this.updateFields(e)} placeholder="Please inform the name" />
                </div>
                <div className="row">
                    <InputForm label="Email" name="email" value={this.state.user.email}
                        method={e => this.updateFields(e)} placeholder="Please inform the email" />
                </div>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Save
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

        )
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>E-mail</th>
                            <th>Actions</th>
                        </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return(
                <tr key = {user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick = {() => this.loadUser(user)}>
                            <i className = "fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick = {() => this.removeUser(user)}>
                            <i className = "fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        }) 
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if (add) list.unshift(user)

        return list

    }

    render() {
        return (
            <Main {...headerProperties}>
                {this.renderForm()}
                {this.renderTable()}
                
            </Main>
        )
    }

}
import React, {Component} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import '../styles/Users.css';

import AuthService from '../services/AuthService';
import BackService from '../services/BackService';
import NavBar from './NavBar';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state={ users: [], error: ""}
    }

    componentDidMount() {
        BackService.getUsers()
            .then( response => {
              this.setState({
                users: response.data
              })
            }, error => {
              console.log(error);
              this.setState({
                error: error.toString()
              });
            });
    }

    editable = (cell) => {
        return (
            <div style={ {backgroundColor: "#fafafa"} } contentEditable suppressContentEditableWarning onBlur={e => {
                const user = [...this.state.users];
                user[cell.index][cell.column.id] = e.target.innerHTML;
                this.setState({users: user});
            }}
                 dangerouslySetInnerHTML={ {__html: this.state.users[cell.index][cell.column.id]} }
            />
        );
    }

    render()
    {
        const columns = [{
               Header: 'Login',
               accessor: 'userName',
               Cell: this.editable
           }, {
               Header: 'Płeć',
               accessor: 'userGender',
               Cell: this.editable
           }, {
               Header: 'Hasło',
               accessor: 'password',
               Cell: this.editable
           }, {
               sortable: false,
               filterable: false,
               width: 100,
               Cell: row => (
                   <div>
                       <button id="button_del">Usuń</button>
                   </div>
               )
           }, {
               sortable: false,
               filterable: false,
               width: 100,
               Cell: row => (
                   <div>
                       <button>Zapisz</button>
                   </div>
               )
           }
        ,];

        return (
            <div>
                <NavBar/>
                <ReactTable data={this.state.users} columns={columns} filterable={true}/>
            </div>
        );
    }

}

export default Users;
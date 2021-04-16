import React, {Component} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import '../styles/Users.css';

import AuthService from '../services/AuthService';
import BackService from '../services/BackService';
import NavBar from './NavBar';
import AddUser from './AddUser';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state={ users: [] , user: undefined }
    }

    componentDidMount() {
        this.fetchUsers();

        const user = AuthService.getCurrentUser();
        this.setState({user: user});
    }

    fetchUsers = () => {
        BackService.getUsers()
            .then( response => {
              this.setState({
                users: response.data
              })
            }, error => {
              console.log(error);
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

    onDelClick = (id, userName) => {
        if (this.state.user.username === userName) {
            window.alert('Nie możesz usunąć tego konta');
        } else if (window.confirm('Na pewno chcesz usunąć tego użytkownika?')) {
            BackService.deleteUser(id)
                .then(response => {
                  if (response.status === 200) {
                  console.log("User delete successfully");}
                  this.fetchUsers();
                }, error => {
                  console.log(error);
                });
        }
    }

    updateUserData(username, gender, id) {
            BackService.editUser(username, gender, id)
                .then(response => {
                     if (response.status === 200) {
                     console.log("successfully");}
                     this.fetchUsers();
                   }, error => {
                     console.log(error);
                   });
    }


    addUser = (username, password, userGender) => {
        AuthService.register(username, password, userGender)
            .then(response => {
                this.fetchUsers();}
            );
    }

    render()
    {
        const columns = [{
               Header: 'Login',
               accessor: 'userName',
               Cell: this.editable
           }, {
               Header: 'Hasło',
               accessor: 'password'
           }, {
               Header: 'Płeć',
               accessor: 'userGender',
               Cell: this.editable
           }, {
               sortable: false,
               filterable: false,
               width: 150,
               Cell: row => (
                   <div>
                       <button id="button_del" onClick={() => this.onDelClick(row.original.id, row.original.userName)}>Usuń użytkownika</button>
                   </div>
               )
           }, {
               sortable: false,
               filterable: false,
               width: 130,
               Cell: row => (
                   <div>
                       <button onClick={() => this.updateUserData(row.original.userName, row.original.userGender, row.original.id)}>Zapisz zmianę</button>
                   </div>
               )
           }
        ,];

        return (
            <div>
                <NavBar/>
                <div className="contener">
                    <AddUser addUser={this.addUser}/>
                </div>
                <ReactTable data={this.state.users} columns={columns} filterable={true}/>
            </div>
        );
    }

}

export default Users;
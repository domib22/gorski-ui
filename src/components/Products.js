import React, {Component} from 'react';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import '../styles/Users.css';

import BackService from '../services/BackService';
import NavBar from './NavBar';
import AddProduct from './AddProduct';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = { products: [] };
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts = () => {
        BackService.getProducts()
            .then( response => {
              this.setState({
                products: response.data
              })
            }, error => {
              console.log(error);
            });
    }

    editable = (cell) => {
        return (
            <div style={ {backgroundColor: "#fafafa"} } contentEditable suppressContentEditableWarning onBlur={e => {
                const prod = [...this.state.products];
                prod[cell.index][cell.column.id] = e.target.innerHTML;
                this.setState({products: prod});
            }}
                 dangerouslySetInnerHTML={ {__html: this.state.products[cell.index][cell.column.id]} }
            />
        );
    }

    onDelClick = (id) => {
        if (window.confirm('Na pewno chcesz usunąć ten produkt?')) {
            BackService.deleteProduct(id)
                .then(response => {
                    if (response.status === 200) {
                        console.log("Product delete successfully");}
                        this.fetchProducts();
                    }, error => {
                        console.log(error);
                });
        }
    }

    onAddClick = (name, price, productGender, season, category, pictureName, link) => {
        BackService.addProduct(name, price, productGender, season, category, pictureName, link)
            .then(response => {
                if (response.status === 200) {
                    console.log("Product add successfully");}
                    this.fetchProducts();
                }, error => {
                    console.log(error);
                });
    }

    render()
    {
        const columns = [{
               Header: 'Produkt',
               accessor: 'name',
               Cell: this.editable
           }, {
               Header: 'Typ',
               accessor: 'category',
               width: 220,
               Cell: this.editable
           }, {
               Header: 'Okres',
               accessor: 'season',
               width: 100,
               Cell: this.editable
           },{
               Header: 'Płeć',
               accessor: 'productGender',
               width: 100,
               Cell: this.editable
           },{
                Header: 'Cena',
                accessor: 'price',
                width: 100,
                Cell: this.editable
           },{
               sortable: false,
               filterable: false,
               width: 150,
               Cell: row => (
                   <div>
                       <button id="button_del" onClick={() => this.onDelClick(row.original.id)}>Usuń ten produkt</button>
                   </div>
               )
           }, {
               sortable: false,
               filterable: false,
               width: 130,
               Cell: row => (
                   <div>
                       <button>Zapisz zmianę</button>
                   </div>
               )
           }
        ,];

        return (
            <div>
                <NavBar/>
                <div className="contener">
                    <AddProduct addProduct={this.onAddClick}/>
                </div>
                <ReactTable data={this.state.products} columns={columns} filterable={true}/>
            </div>
        );
    }

}

export default Products;
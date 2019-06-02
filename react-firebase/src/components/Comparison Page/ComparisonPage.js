import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import '../NavigationBar/NavigationBar.js';
import NavigationBar from "../NavigationBar/NavigationBar";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import './ComparisonPage.css';

class ComparisonPage extends Component {

    constructor(props) {
        super(props);

        this.state = {

            list1: [
                {image: ''},
                {name: <a href="">''</a>},
                {address: ''},
                {distance_to_campus: ''},
                {num_bedrooms: ''},
                {num_bathrooms: ''},
                {distance_grocery_store: ''},
                {distance_bus_stop: ''},
                {driving_time: ''},
                {transit_time: ''},
            ],

            list2: [
                {name: <a href="">''</a>},
                {address: ''},
                {image: ''},
                {distance_to_campus: ''},
                {num_bedrooms: ''},
                {num_bathrooms: ''},
                {distance_grocery_store: ''},
                {distance_bus_stop: ''},
                {driving_time: ''},
                {transit_time: ''},
                {original_url: ''},
            ],

            list3: [
                {name: <a href="">''</a>},
                {address: ''},
                {image: ''},
                {distance_to_campus: ''},
                {num_bedrooms: ''},
                {num_bathrooms: ''},
                {distance_grocery_store: ''},
                {distance_bus_stop: ''},
                {driving_time: ''},
                {transit_time: ''},
                {original_url: ''},
            ],

            list4: [
                {name: <a href="">''</a>},
                {address: ''},
                {image: ''},
                {distance_to_campus: ''},
                {num_bedrooms: ''},
                {num_bathrooms: ''},
                {distance_grocery_store: ''},
                {distance_bus_stop: ''},
                {driving_time: ''},
                {transit_time: ''},
                {original_url: ''},
            ],
        }
    }

    render() {

        return (

            <div>

                <NavigationBar/>

                <Table striped bordered hover size="lg">
                    <thead>
                    <tr>
                        <th>Key</th>
                        <th><Button variant="success">Add New Listing</Button></th>
                        <th><Button variant="success">Add New Listing</Button></th>
                        <th><Button variant="success">Add New Listing</Button></th>
                        <th><Button variant="success">Add New Listing</Button></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="tableHead">Image</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Name</td>

                    </tr>
                    <tr>
                        <td className="tableHead">Address</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Price</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Distance to Campus</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Number of Bedrooms</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Number of Bathrooms</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Square Footage</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Distance to Grocery Store</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Distance to Bus Stop</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Driving Time to Campus</td>
                    </tr>
                    <tr>
                        <td className="tableHead">Transit Time to Campus</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ComparisonPage;
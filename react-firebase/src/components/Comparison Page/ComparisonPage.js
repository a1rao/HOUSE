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
                        <td className="tableHead" Hello></td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ComparisonPage;
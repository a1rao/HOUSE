import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import NavigationBar from '../NavigationBar/NavigationBar';
import Table1 from './List Table 1/Table1';
import Table2 from './List Table 2/Table2';
import Table3 from './List Table 3/Table3';
import Table4 from './List Table 4/Table4';
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
                        <th><Table1 /></th>
                        <th><Table2 /></th>
                        <th><Table3 /></th>
                        <th><Table4 /></th>

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
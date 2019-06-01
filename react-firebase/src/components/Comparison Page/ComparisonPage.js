import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import '../NavigationBar/NavigationBar.js';
import NavigationBar from "../NavigationBar/NavigationBar";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import './ComparisonPage.css';

class ComparisonPage extends Component {

    render() {

        var text = '{ "employees" : [' +
            '{ "firstName":"Gary" , "lastName":"Mollestme" },' +
            '{ "firstName":"Anna" , "lastName":"Smith" },' +
            '{ "firstName":"Peter" , "lastName":"Jones" } ]}';

        var obj = JSON.parse(text);

        return (

            <div>

                <NavigationBar />

                <Dropdown className="sortByParent">
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                        Sort By
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Table striped bordered hover size = "lg">
                    <thead>
                    <tr>
                        <th><Button variant="success">Add New Listing</Button></th>
                        <th><Button variant="success">Add New Listing</Button></th>
                        <th><Button variant="success">Add New Listing</Button></th>
                        <th><Button variant="success">Add New Listing</Button></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>{obj.employees[0].firstName}</td>
                        <td>{obj.employees[0].lastName}</td>
                        <td>@garyrocks</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

}

export default ComparisonPage;
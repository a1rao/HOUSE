import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import '../NavigationBar/NavigationBar.js';
import NavigationBar from "../NavigationBar/NavigationBar";

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

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Stuff</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
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
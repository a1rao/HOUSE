import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, {Component} from "react";
class SearchForm extends Component {
    render() {
        return (
            <Form inline className="searchBar">
                <FormControl type="text" name="url" placeholder="Enter Listing URL" className="mr-sm-2"/>
                <Button variant="outline-success" type="submit">Search</Button>
            </Form>
        )
    }
}

export default SearchForm;
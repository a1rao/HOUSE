import React, {Component} from "react";

// To Do
function SaveListing(){

}

class AddNewURL extends Component {

    render() {
        return(
            <div>
                <form id="insertURL">
                    <input
                        name="url"
                        type="text"
                        placeholder="Enter Listing URL"/>
                </form>
                <button onClick={SaveListing}>Add to folder</button>
            </div>
        );
    }

}

export default AddNewURL;

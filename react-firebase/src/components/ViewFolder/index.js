import React, {Component} from 'react';
import NavigationBar from "../Home/homeComponents/NavigationBar";
import DisplayFolderContent from "./ViewFolderComponents/DisplayFolderContent.js";


class FolderView extends Component{
    render(){
        return(
            <div>

                {/*Display navigation bar*/}
                <NavigationBar/>

                {/*Display all listings in folder*/}
                <DisplayFolderContent/>

            </div>

        );
    }

}

export default FolderView;

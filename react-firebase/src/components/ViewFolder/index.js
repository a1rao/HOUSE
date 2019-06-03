import React, {Component} from 'react';
import NavigationBar from "../NavigationBar/NavigationBar.js";
import DisplayFolderContent from "./ViewFolderComponents/DisplayFolderContent.js";
import {folderName} from "../NavigationBar/NavigationBar.js";



class FolderView extends Component{
    render(){
        return(
            <div>

                {/*Display navigation bar*/}
                <NavigationBar/>
                {/*Display all listings in folder*/}
                <DisplayFolderContent folder={folderName}/>

            </div>

        );

    }

}

export default FolderView;

import React, { Component } from 'react'; 
import UserList from './UserList';
class Santosh extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <UserList complexName={'Santosh Complex'}/>
               </div> 
        )
    }
}

export default Santosh;
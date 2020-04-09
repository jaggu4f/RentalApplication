import React, { Component } from 'react'; 
import UserList from './UserList';

class Sachin extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <UserList complexName={'Sachin Complex'}/>
            </div> 
        )
    }
}

export default Sachin;
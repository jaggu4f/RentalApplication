import React, { Component } from 'react'; 
import UserList from './UserList';
class Jagadeesh extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <UserList complexName={'Jagadeesh Complex'}/>
               </div> 
        )
    }
}

export default Jagadeesh;
import React, { Component } from 'react'; 
import {Navbar,Nav,Form,FormControl,Button} from 'react-bootstrap';
import addIcon from '../assets/addIcon.png';
import homeIcon from '../assets/homeIcon.png'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complexName : 'Home'
        };
    }
   
    getComplexName = selectedComplex =>{
        this.setState({complexName:selectedComplex});
        console.log(this.state.complexName);
    }
    render() {
        let {complexName} = this.state;
        console.log('render',typeof complexName)
        return(
            
                <div className="navBar">
                    <Navbar bg="dark" variant="dark">
                        <Nav className="mr-auto">
                        <Link to="/home" onClick={()=>this.getComplexName('Home')}><Nav.Link href="#home">Home</Nav.Link></Link>
                        <Link to="/sachin" onClick={()=>this.getComplexName('Sachin')}><Nav.Link href="#features">Sachin</Nav.Link></Link>
                        <Link to="/santosh" onClick={()=>this.getComplexName('Santosh')}><Nav.Link href="#pricing">Santosh</Nav.Link></Link>
                        <Link to="/jagadeesh" onClick={()=>this.getComplexName('Jagadeesh')}><Nav.Link href="#pricing">Naveen</Nav.Link></Link>
                        </Nav>
                        <Link to={`/addNewUser?q=${complexName}`} ><Nav.Link href="#pricing" className='addIcon'> <img className='' src={addIcon} width='20' height='20' /></Nav.Link></Link>
                        <Link to={`/home`} ><Nav.Link href="#pricing" className='addIcon'> <img className='' src={homeIcon} width='30' height='30' /></Nav.Link></Link>
                        <Form inline>
                            <FormControl disabled type="text" placeholder="Search" className="mr-sm-2" />
                            <Button disabled variant="outline-info">Search</Button>
                        </Form>
                    </Navbar>
                </div>

        )
    }
}

export default Header;
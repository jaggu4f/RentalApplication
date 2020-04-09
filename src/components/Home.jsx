import React, { Component } from 'react'; 
import Carousel from './Caraosel';
import Footer from './Footer';
import {
    Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody
  } from 'reactstrap';
class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <Carousel />
                <CardGroup>
                    <Card>
                        <CardTitle >Sachin Complex</CardTitle>
                        <CardBody>
                        <CardText>Owner Name: Sachin S</CardText>
                            <CardText>Total Rooms : 10</CardText>
                            <CardText>Total Rent(/month) : 30000 Rs</CardText>
                            <CardText>Contact : 9858985664</CardText>
                            <CardText>Address : MG Road Bangalore</CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardTitle >Santosh Complex</CardTitle>
                        <CardBody>
                        <CardText>Owner Name: Santosh S</CardText>
                            <CardText>Total Rooms : 10</CardText>
                            <CardText>Total Rent(/month) : 30000 Rs</CardText>
                            <CardText>Contact : 9858985664</CardText>
                            <CardText>Address : MG Road Bangalore</CardText>
                        </CardBody>
                    </Card>
                    
                </CardGroup>
                <CardGroup>
                <Card>
                        <CardTitle >Naveen Complex</CardTitle>
                        <CardBody>
                        <CardText>Owner Name: Naveen S</CardText>
                            <CardText>Total Rooms : 10</CardText>
                            <CardText>Total Rent(/month) : 30000 Rs</CardText>
                            <CardText>Contact : 9858985664</CardText>
                            <CardText>Address : MG Road Bangalore</CardText>
                        </CardBody>
                    </Card>
                </CardGroup>
                <Footer />
               </div> 
        )
    }
}

export default Home;
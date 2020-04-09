import React, { Component } from 'react'; 
import {
    Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody
  } from 'reactstrap';
import expand from '../assets/expand.png';
import collapse from '../assets/collapse.png'
class DetailsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpand : false
        }
    }
    toggleRow = () =>{
        let {isExpand} = this.state;
        isExpand = !isExpand;
        this.setState({isExpand})
    }
    getCardDetails = (payload) =>{
        let dateObj = new Date(payload.advanceDetails.date);
        let months = ["January","February","March","April","May","June","July","August","Septmber","October","November","December"]
        let year = dateObj.getFullYear();
        let month = months[dateObj.getMonth()];
        let day = dateObj.getDate();
        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes();
        let format = hours<12 ? 'AM' : 'PM';
        let formattedDate = `${month} ${day}, ${year} ${hours}:${minutes} ${format}`
        let recentPaymentDate = new Date(payload.recentPaymentsInfo.month)
        
        return(
            <CardGroup>
                <Card>
                    <CardTitle onClick={()=>this.toggleRow()}>User Details <img className='expandIcon' src={this.state.isExpand ? expand : collapse} width='25' height='25' /></CardTitle>
                    {this.state.isExpand ? <CardBody>
                    <CardText>Name : {payload.personalInfo.name}</CardText>
                        <CardText>SurName : {payload.personalInfo.surname}</CardText>
                        <CardText>Ph No : {payload.personalInfo.phNo}</CardText>
                        <CardText>Address : {payload.personalInfo.address}</CardText>
                        
                    </CardBody> : null}
                </Card>
                <Card>
                    <CardTitle onClick={()=>this.toggleRow()}>Meter Details <img className='expandIcon' src={this.state.isExpand ? expand : collapse} width='25' height='25' /></CardTitle>
                    {this.state.isExpand ? <CardBody>
                        <CardText>Home No : {payload.meterInfo.homeNo}</CardText>
                        <CardText>CL No : {payload.meterInfo.clNo}</CardText>
                        <CardText>Due : {payload.meterInfo.dueAmount}</CardText>
                        <CardText>Type : {payload.meterInfo.type}</CardText>
                        
                    </CardBody> : null}
                </Card>
                <Card>
                    <CardTitle onClick={()=>this.toggleRow()}>Advance Details <img className='expandIcon' src={this.state.isExpand ? expand : collapse} width='25' height='25' /></CardTitle>
                    {this.state.isExpand ? <CardBody>
                        <CardText>Date : {formattedDate}</CardText>
                        <CardText>Advance(Rs) : {payload.advanceDetails.advance}</CardText>
                        <CardText>Paid(Rs) : {payload.advanceDetails.paid}</CardText>
                        <CardText>Balance(Rs) : {payload.advanceDetails.advance - payload.advanceDetails.paid}</CardText>
                        <CardText>Total(Rs) : {payload.advanceDetails.paid}</CardText>
                        <CardText>Remarks : {(payload.advanceDetails.advance-payload.advanceDetails.paid)>0?`Rs ${payload.advanceDetails.advance-payload.advanceDetails.paid} is Due.`:`No Due.`} </CardText>
                        
                    </CardBody> : null}
                </Card>
                <Card>
                    <CardTitle onClick={()=>this.toggleRow()}>Recent Rent Details <img className='expandIcon' src={this.state.isExpand ? expand : collapse} width='25' height='25' /></CardTitle>
                    {this.state.isExpand ? <CardBody>
                        <CardText>Date : {months[recentPaymentDate.getMonth()]?`${months[recentPaymentDate.getMonth()]} ${recentPaymentDate.getDate()}, ${recentPaymentDate.getFullYear()} ${recentPaymentDate.getHours()}:${recentPaymentDate.getMinutes()} ${recentPaymentDate.getHours()<12? 'AM' : 'PM'}`:'-'}</CardText>
                        <CardText>Rent(Rs) : {payload.recentPaymentsInfo.rent}</CardText>
                        <CardText>Paid(Rs) : {payload.recentPaymentsInfo.paid}</CardText>
                        <CardText>Balance(Rs) : {(payload.recentPaymentsInfo.rent-payload.recentPaymentsInfo.paid)?(payload.recentPaymentsInfo.rent-payload.recentPaymentsInfo.paid):'-'}</CardText>
                        <CardText>Total(Rs) : {payload.recentPaymentsInfo.paid}</CardText>
                        <CardText>Remarks : {(payload.recentPaymentsInfo.rent-payload.recentPaymentsInfo.paid)>0?`Rs ${payload.recentPaymentsInfo.rent-payload.recentPaymentsInfo.paid} is Due.`:((payload.recentPaymentsInfo.rent-payload.recentPaymentsInfo.paid))?`No Due.`:'-'} </CardText>
                        
                    </CardBody> : null}
                </Card>
        </CardGroup>
        )
    }
    render(){
        let {payload} = this.props;
        return(
            <div>
                {payload.length > 0 ? this.getCardDetails(payload[0]) : 'No Records Found.'}
            </div>
        )
    }
}

export default DetailsCard;
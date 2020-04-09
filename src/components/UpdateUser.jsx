import React, { Component } from 'react'; 
import {Form,Col,Row,Button} from 'react-bootstrap';
import axios from "axios";
import _ from 'lodash';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "isValidated":false,
            "payload":[],
            "personalInfo" : {
                "name" : "",
                "surname" : "",
                "phNo" : "",
                "address" : ""
            },
            "meterInfo" : {
                "homeNo" : "",
                "clNo" : "",
                "dueAmount" : "",
                "type" : ""
            },
            "advanceInfo":{
                "date" : "",
                "advance" : "",
                "paid" : "",
                "balance" : "",
                "total" : "",
                "remarks" : ""
            }
        }
    }
    componentDidMount(){
        let {personalInfo,meterInfo,advanceInfo} = this.state;
        console.log('onload');
        axios.get('http://127.0.0.1:8081/complexDetails')
          .then(res => {
            const payload = res.data;
            this.setState({ payload });
            //this.setState({personalInfo,meterInfo,advanceInfo});
            console.log('did mount data',this.state)
                let { match: { params } } = this.props;
                let filteredComplexObj = _.filter(this.state.payload,item=>((item.ownerDetails.complexName).replace(/ +/g, "")) == params.complexName);
                let userDetailsObj = filteredComplexObj.length>0 && filteredComplexObj[0].userList && _.filter(filteredComplexObj[0].userList,item=>(item.meterInfo.clNo === params.clNo))
                console.log('userDetailsObj',userDetailsObj)
                personalInfo = userDetailsObj[0].personalInfo;
                meterInfo = userDetailsObj[0].meterInfo;
                advanceInfo = userDetailsObj[0].advanceDetails;
                advanceInfo.date = new Date(userDetailsObj[0].advanceDetails.date);
                this.setState({personalInfo,meterInfo,advanceInfo});
            
          })
    }
    getFormData = (event) =>{
        let {personalInfo,meterInfo,advanceInfo} = this.state;
        
        if(event&&event.target){
            const { target: { name, value } } = event
            if(name in personalInfo){
                personalInfo[name] = value;
            }
            if(name in meterInfo){
                meterInfo[name] = value;
            }
            if(name in advanceInfo){
                advanceInfo[name] = value;
            }
        }
        if(event && !event.target){
            advanceInfo["date"] = event;
        }
        
        this.setState({personalInfo,meterInfo,advanceInfo});
    }
    
    handleSubmit = (event) =>{
        let { match: { params:{complexName,userId,clNo} } } = this.props;
        console.log('this.props',this.props)
        let filteredComplexObj = _.filter(this.state.payload,item=>((item.ownerDetails.complexName).replace(/ +/g, "")) == complexName);
        let userDetailsObj = filteredComplexObj.length>0 && filteredComplexObj[0].userList && _.filter(filteredComplexObj[0].userList,item=>(item.meterInfo.clNo === clNo))
        let formElements = document.getElementsByClassName('formInput');
        let isValidated = false;
        
        event.preventDefault();
        axios.post('http://127.0.0.1:8081/updateUser',{"personalInfo":this.state.personalInfo,"meterInfo":this.state.meterInfo,"advanceInfo":this.state.advanceInfo,"recentPaymentsInfo":userDetailsObj[0].recentPaymentsInfo,"rentDetails":userDetailsObj[0].rentDetails,"objKeys":{complexName,userId,clNo}   })
            .then(res => {
                
                if(res){
                    let {payload} = this.state;
                    payload = res.data;
                    //this.setState({payload})
                }
            });
            let redirectTo = filteredComplexObj[0].ownerDetails.complexName.split(' ')[0];
            _.map(formElements,(item,index)=>{
                if(index<formElements.length){
                    isValidated = item.value?true:false;
                }
            })
            if(isValidated){
                this.props.history.push(`/${redirectTo}`)
            }
            this.setState({isValidated})
            
    }
    handleCancel = ()=>{
        let { match: { params:{complexName} } } = this.props;
        console.log('this.props',this.props)
        let filteredComplexObj = _.filter(this.state.payload,item=>((item.ownerDetails.complexName).replace(/ +/g, "")) == complexName);
        let redirectTo = filteredComplexObj[0].ownerDetails.complexName.split(' ')[0];
        this.props.history.push(`/${redirectTo}`)
    }
    render() {
        
        return(
            <div className="addUser">
                <h3>{"Update User Information Form"}</h3>
                <hr/>
                <p className="errorClassFields">{this.state.isValidated?``:`Note: Fill the required fields.`}</p>
                <Form>
                    <h4>{"Personal Information"}</h4>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridnName">
                        <Form.Label>Name<span>*</span></Form.Label>
                        <Form.Control className="formInput" type="text" placeholder="Enter Name" name="name" value={this.state.personalInfo.name} onChange={this.getFormData} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" name="surname" value={this.state.personalInfo.surname} onChange={this.getFormData}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Label>Address<span>*</span></Form.Label>
                            <Form.Control className="formInput" placeholder="Enter Address" name="address" value={this.state.personalInfo.address} onChange={this.getFormData}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridMobileNo">
                            <Form.Label>Mobile No<span>*</span></Form.Label>
                            <Form.Control className="formInput" placeholder="Enter Mobile Number" name="phNo" value={this.state.personalInfo.phNo} onChange={this.getFormData}/>
                        </Form.Group>
                    </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City<span>*</span></Form.Label>
                        <Form.Control className="formInput" placeholder="Enter City" name="city" value={this.state.personalInfo.city} onChange={this.getFormData}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State<span>*</span></Form.Label>
                        <Form.Control className="formInput" placeholder="Enter State" name="state" value={this.state.personalInfo.state} onChange={this.getFormData}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip<span>*</span></Form.Label>
                        <Form.Control className="formInput" placeholder="Enter Pincode" name="zip" value={this.state.personalInfo.zip} onChange={this.getFormData}/>
                        </Form.Group>
                    </Form.Row>
                </Form>
                <hr/>
                <Form>
                    <h4>{"Meter Information"}</h4>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridnDoorNo">
                        <Form.Label>Home No<span>*</span></Form.Label>
                        <Form.Control className="formInput" type="text" placeholder="Enter Home No" name="homeNo" value={this.state.meterInfo.homeNo} onChange={this.getFormData}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastClNo">
                        <Form.Label>CL No<span>*</span></Form.Label>
                        <Form.Control className="formInput" type="text" placeholder="Enter CL No" name="clNo" value={this.state.meterInfo.clNo} onChange={this.getFormData} disabled/>
                        </Form.Group>
                    </Form.Row>

                    
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridDue">
                        <Form.Label>Due Amount<span>*</span></Form.Label>
                        <Form.Control className="formInput" placeholder="Enter Due Amount" name="dueAmount" value={this.state.meterInfo.dueAmount} onChange={this.getFormData}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridMeterType">
                        <Form.Label>Type<span>*</span></Form.Label>
                        <Form.Control className="formInput" placeholder="Enter Meter Type" name="type" value={this.state.meterInfo.type} onChange={this.getFormData}/>
                        </Form.Group>
                    </Form.Row>
                </Form>
                <hr/>
                <Form>
                    <h4>{"Advance Information"}</h4>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridnDate">
                        <Form.Label>Date<span>*</span></Form.Label>
                        {/* <Form.Control type="text" placeholder="Select Date" name="date" onChange={this.getFormData}/> */}
                        <DatePicker className="formInput" className="mr-sm-2 form-control" placeholder="select date" name="date" selected={this.state.advanceInfo.date} onChange={this.getFormData}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastAdvance">
                        <Form.Label>Advance(Rs)<span>*</span></Form.Label>
                        <Form.Control className="formInput" type="text" placeholder="Enter Advance Amount" name="advance" value={this.state.advanceInfo.advance} onChange={this.getFormData}/>
                        </Form.Group>
                    </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridPaid">
                        <Form.Label>Paid(Rs)<span>*</span></Form.Label>
                        <Form.Control className="formInput" placeholder="Enter Paid Amount" name="paid"  value={this.state.advanceInfo.paid} onChange={this.getFormData}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridMeterBalance">
                        <Form.Label>Balance(Rs)</Form.Label>
                        <Form.Control placeholder="Enter Balance Amount" value={this.state.advanceInfo.advance-this.state.advanceInfo.paid} name="balance" onChange={this.getFormData}/>
                        </Form.Group>
                        
                        
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridLastTotal">
                        <Form.Label>Total(Rs)</Form.Label>
                        <Form.Control type="text" placeholder="Enter Total Amount" value={this.state.advanceInfo.paid} name="total" onChange={this.getFormData}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridMeterRemarks">
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control placeholder="Enter Remarks" name="remarks" value={(this.state.advanceInfo.advance-this.state.advanceInfo.paid)>0?`Rs ${this.state.advanceInfo.advance-this.state.advanceInfo.paid} is Due.`:`No Due.`} onChange={this.getFormData}/>
                        </Form.Group>
                    </Form.Row>
                    <div className="buttons">
                        <Button variant="primary" type="button" onClick={this.handleSubmit}>
                        Update
                        </Button>
                        <Button variant="secondary" type="button" onClick={this.handleCancel}>
                        Cancel
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default AddUser;
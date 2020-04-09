import React, { Component } from 'react'; 
import {Form,Col,Row,Button} from 'react-bootstrap';
import _ from 'lodash';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "isValidated":false,
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
                "date" : new Date(),
                "advance" : "",
                "paid" : "",
                "balance" : "",
                "total" : "",
                "remarks" : ""
            }
        }
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
            console.log('date is',new Date(event).getHours());
            advanceInfo["date"] = event;
        }
        
        this.setState({personalInfo,meterInfo,advanceInfo});
    }
    handleSubmit = (event) =>{
        const { location:{search} } = this.props;
        let trimmedComplexName = search.split('=');
        let formElements = document.getElementsByClassName('formInput');
        let isValidated = false;
        event.preventDefault();
        axios.post('http://127.0.0.1:8081/addUser',{"personalInfo":this.state.personalInfo,"meterInfo":this.state.meterInfo,"advanceInfo":this.state.advanceInfo,"complexName":trimmedComplexName[1]   })
            .then(res => {
                
                if(res){
                    let {payload} = this.state;
                    payload = res.data;
                    this.setState({payload})
                }
            });
            _.map(formElements,(item,index)=>{
                if(index<formElements.length){
                    isValidated = item.value?true:false;
                }
            })
                if(isValidated){
                    this.props.history.push(`/${trimmedComplexName[1]}`);
                }
                this.setState({isValidated})

                        
    }
    handleCancel = ()=>{
        const { location:{search} } = this.props;
        let trimmedComplexName = search.split('=')
        this.props.history.push(`/${trimmedComplexName[1]}`);
    }
    render() {
        
        return(
            <div className="addUser">
                <h3>{"User Information Form"}</h3>
                <hr/>
                <p className="errorClassFields">{this.state.isValidated?``:`Note: Fill the required fields.`}</p>
                <Form>
                    <h4>{"Personal Information"}</h4>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridnName">
                        <Form.Label>Name<span>*</span></Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" className="formInput" name="name" onChange={this.getFormData} required={true}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name" name="surname" onChange={this.getFormData}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridAddress1">
                            <Form.Label>Address<span>*</span></Form.Label>
                            <Form.Control className="formInput" placeholder="Enter Address" name="address" onChange={this.getFormData}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridMobileNo">
                            <Form.Label>Mobile No<span>*</span></Form.Label>
                            <Form.Control className="formInput" placeholder="Enter Mobile Number" name="phNo" onChange={this.getFormData}/>
                        </Form.Group>
                    </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City<span>*</span></Form.Label>
                        <Form.Control className="formInput" placeholder="Enter City" name="city" onChange={this.getFormData}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State<span>*</span></Form.Label>
                        <Form.Control className="formInput" placeholder="Enter State" name="state" onChange={this.getFormData}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip<span>*</span></Form.Label>
                        <Form.Control className="formInput" placeholder="Enter Pincode" name="zip" onChange={this.getFormData}/>
                        </Form.Group>
                    </Form.Row>
                </Form>
                <hr/>
                <Form>
                    <h4>{"Meter Information"}</h4>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridnDoorNo">
                        <Form.Label>Home No<span>*</span></Form.Label>
                        <Form.Control className="formInput" type="text" placeholder="Enter Home No" name="homeNo" onChange={this.getFormData}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastClNo">
                        <Form.Label>CL No<span>*</span></Form.Label>
                        <Form.Control className="formInput" type="text" placeholder="Enter CL No" name="clNo" onChange={this.getFormData}/>
                        </Form.Group>
                    </Form.Row>

                    
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridDue">
                        <Form.Label>Due Amount<span>*</span></Form.Label>
                        <Form.Control className="formInput" placeholder="Enter Due Amount" name="dueAmount" onChange={this.getFormData}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridMeterType">
                        <Form.Label>Type<span>*</span></Form.Label>
                        <Form.Control className="formInput" placeholder="Enter Meter Type" name="type" onChange={this.getFormData}/>
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
                        <DatePicker className="mr-sm-2 form-control formInput" placeholder="select date" name="date" 
                        selected={this.state.advanceInfo.date} 
                        onChange={this.getFormData}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="time"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastAdvance">
                        <Form.Label>Advance(Rs)<span>*</span></Form.Label>
                        <Form.Control className="formInput" type="text" placeholder="Enter Advance Amount" name="advance" onChange={this.getFormData}/>
                        </Form.Group>
                    </Form.Row>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formGridPaid">
                        <Form.Label>Paid(Rs)<span>*</span></Form.Label>
                        <Form.Control className="formInput" placeholder="Enter Paid Amount" name="paid"  onChange={this.getFormData}/>
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
                        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                            Submit
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
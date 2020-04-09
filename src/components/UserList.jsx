import React, { Component } from 'react'; 
import {Accordion,Card,Button,Form,FormControl} from 'react-bootstrap';
import {
    Card as ReactStarpCard, CardTitle, CardText, CardGroup, CardBody
  } from 'reactstrap';
import expand from '../assets/expand.png';
import editIcon from '../assets/editIcon.png';
import deleteIcon from '../assets/deleteIcon.jfif';
import collapse from '../assets/collapse.png';
import Footer from './Footer';
import axios from "axios";
import _ from 'lodash';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";


class Sachin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            payload : [],
            isFlag:true,
            isUpdateRent:false,
            isExpandPayment:true,
            isExpandUpdate:true,
            updatedDetails : {
                "month":new Date(),
                "rent":"",
                "paid":"",
                "balance":"",
                "total":"",
                "remarks":""
            }
        }
    }
    componentDidMount(){
        axios.get('http://127.0.0.1:8081/complexDetails')
      .then(res => {
        const payload = res.data;
        this.setState({ payload });
      })
    }
    toggleRow = (selector) =>{
        let {isExpandPayment,isExpandUpdate} = this.state;
        if(selector=='payment'){
            isExpandPayment = !isExpandPayment;
            this.setState({isExpandPayment})
        }
        if(selector=='update'){
            isExpandUpdate = !isExpandUpdate;
            this.setState({isExpandUpdate});
        }
    }
    clearFields = (key) =>{
        let {updatedDetails} = this.state;
            updatedDetails = {
                "month":new Date(),
                "rent":"",
                "paid":"",
                "balance":"",
                "total":"",
                "remarks":""
            }
        
        this.setState({updatedDetails})
    }
    updateDetails = (event) =>{
        let {updatedDetails} = this.state;
        let {name,value} = event.target;
        
        updatedDetails = { ...updatedDetails,  [name]: value };
        let paymentInfo = updatedDetails.rent || this.rentInput.value;
        updatedDetails.rent = paymentInfo;
        updatedDetails.balance = (updatedDetails.rent-updatedDetails.paid)?updatedDetails.rent-updatedDetails.paid:'-';
        updatedDetails.total = updatedDetails.paid?updatedDetails.paid:'-';
        updatedDetails.remarks = (updatedDetails.rent-updatedDetails.paid)?`Rs ${updatedDetails.rent-updatedDetails.paid} is due.`:'No Due';
        this.setState({updatedDetails});
        console.log('saved',this.state.updatedDetails)
    }
    saveData = (selectedComplex,clNo,rentInput,recentPayment) =>{
        axios.post('http://127.0.0.1:8081/saveData',{"paymentDetails":this.state.updatedDetails,selectedComplex,clNo,date:this.state.updatedDetails.month})
            .then(res => {
                
                if(res){
                    let {isExpandPayment,isExpandUpdate,updatedDetails,payload} = this.state;
                    payload = res.data;
                    isExpandPayment = !isExpandPayment;
                    isExpandUpdate = !isExpandUpdate;
                    updatedDetails = {
                        "month":new Date(),
                        "rent":rentInput.value,
                        "paid":"",
                        "balance":"",
                        "total":"",
                        "remarks":""
                    }
                    this.setState({isExpandPayment,isExpandUpdate,updatedDetails,payload,isFlag:true})
                }
            })
    }
    deleteUser = clNo =>{
        axios.post('http://127.0.0.1:8081/deleteUser',{complexName:this.props.complexName,clNo})
            .then(res => {
                
                if(res){
                    let {payload} = this.state;
                    payload = res.data;
                    this.setState({payload})
                }
            })
    }
    updateRent = event =>{
        event.preventDefault();
        if(this.rentInput&&this.rentInput.value){
            this.rentInput.disabled=false;
            this.setState({isFlag:false})
        }
    }
    handleChange = date => {
        let {updatedDetails} = this.state;
        updatedDetails.month = date;
        this.setState({updatedDetails});
        
      };
    getComplexDetails = (data,selectedComplex) =>{
        let filteredComplexName = selectedComplex.replace(/[^A-Za-z]+/g, '');
        let months = ["January","February","March","April","May","June","July","August","Septmber","October","November","December"]
        return _.map(data.userList,(user,index)=>{
            let recentPaymentDate = new Date(user.recentPaymentsInfo.month);
            console.log('advance date is',user.advanceDetails.date)
            
                   return(
                        <Card key={index}>
                            <Card.Header>
                            <Link to={`/${filteredComplexName}/${user.meterInfo.clNo}/${user.personalInfo.name}`}><Accordion.Toggle as={Button} variant="link" eventKey={index}>
                                    {`${user.personalInfo.name} - ${user.meterInfo.clNo}`}
                                </Accordion.Toggle></Link>
                                <Link className="editIconLink" to={`/${filteredComplexName}/${user.meterInfo.clNo}/${user.personalInfo.name}/updateUser`}><a className='editIcon' ><img className='' src={editIcon} width='20' height='20' /></a></Link>
                                <a className='deleteIcon' onClick={()=>this.deleteUser(user.meterInfo.clNo)}><img className='' src={deleteIcon} width='20' height='20' /></a>
                                <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                                
                                <img className='expandIcon' src={collapse} width='30' height='30' />
                                </Accordion.Toggle>
                                
                            </Card.Header>
                            <Accordion.Collapse eventKey={index}>
                                <Card.Body>
                                    <CardGroup>
                                        <ReactStarpCard>
                                            <CardTitle onClick={()=>this.toggleRow('payment')}>Recent Payment Details <img className='expandIcon' src={this.state.isExpandPayment ? expand : collapse} width='25' height='25' /></CardTitle>
                                            {this.state.isExpandPayment ? <CardBody>
                                                <CardText>Date : {months[recentPaymentDate.getMonth()]?`${months[recentPaymentDate.getMonth()]} ${recentPaymentDate.getDate()}, ${recentPaymentDate.getFullYear()} ${recentPaymentDate.getHours()}:${recentPaymentDate.getMinutes()} ${recentPaymentDate.getHours()<12? 'AM' : 'PM'}`:'-'}</CardText>
                                                <CardText>Rent : {user.recentPaymentsInfo.rent}</CardText>
                                                <CardText>Paid : {user.recentPaymentsInfo.paid}</CardText>
                                                <CardText>Balance : {(user.recentPaymentsInfo.rent - user.recentPaymentsInfo.paid)||'-'}</CardText>
                                                <CardText>Total : {user.recentPaymentsInfo.paid}</CardText>
                                                <CardText>Remarks : {(user.recentPaymentsInfo.rent - user.recentPaymentsInfo.paid) ? `Balance amount is ${user.recentPaymentsInfo.rent - user.recentPaymentsInfo.paid}` : ((user.recentPaymentsInfo.rent - user.recentPaymentsInfo.paid)?'Paid':'-')}</CardText>
                                            </CardBody> : <CardBody><CardText className={this.state.isExpandUpdate?'isExpand':''}>Expand to view details of recent payment.</CardText></CardBody>}
                                        </ReactStarpCard>
                                        <ReactStarpCard>
                                            <CardTitle onClick={()=>this.toggleRow('update')}>Update Details <img className='expandIcon' src={this.state.isExpandUpdate ? expand : collapse} width='25' height='25' /></CardTitle>
                                            {this.state.isExpandUpdate ? <CardBody>
                                                <CardText></CardText>
                                                <CardText>
                                                <Form inline>
                                                    Date : <DatePicker className="mr-sm-2 form-control" 
                                                    selected={this.state.updatedDetails.month} 
                                                    onChange={this.handleChange}
                                                    showTimeSelect
                                                    timeFormat="HH:mm"
                                                    timeIntervals={15}
                                                    timeCaption="time"
                                                    dateFormat="MMMM d, yyyy h:mm aa"
                                                    minDate={new Date(user.advanceDetails.date)}
                                                    />
                                                   
                                                </Form>
                                                </CardText>
                                                <CardText><Form inline>
                                                    Rent : <FormControl  ref={(event)=>this.rentInput=event} disabled={this.state.isFlag&&(user.recentPaymentsInfo.rent != '-')?'disabled':''} value={this.state.isFlag && user.recentPaymentsInfo.rent != '-'?user.recentPaymentsInfo.rent:this.state.updatedDetails.rent} type="text" onChange={this.updateDetails} name="rent" placeholder="Rent" className="mr-sm-2" />
                                                    {this.state.isFlag?<Button  variant="outline-info" type="submit" onChange={this.updateDetails} onClick={(event)=>this.updateRent(event)}>Update</Button>:""}
                                                </Form>
                                            </CardText>
                                                <CardText><Form inline>
                                                    Paid : <FormControl value={this.state.updatedDetails.paid} type="text" onChange={this.updateDetails} name="paid" placeholder="Paid" className="mr-sm-2" />
                                                </Form></CardText>
                                                <CardText><Form inline>
                                                    Balance : <FormControl value={this.state.isFlag && user.recentPaymentsInfo.rent != '-'? user.recentPaymentsInfo.rent - this.state.updatedDetails.paid:this.state.updatedDetails.rent - this.state.updatedDetails.paid} type="text" onChange={this.updateDetails} name="balance" placeholder="Balance" className="mr-sm-2" />
                                                </Form></CardText>
                                                <CardText><Form inline>
                                                    Total : <FormControl value={this.state.updatedDetails.paid} type="text" onChange={this.updateDetails} name="total" placeholder="Total" className="mr-sm-2" />
                                                </Form></CardText>
                                                <CardText><Form inline>
                                                    Remarks : <FormControl value={
                                                        this.state.isFlag && user.recentPaymentsInfo.rent != '-'?(user.recentPaymentsInfo.rent - this.state.updatedDetails.paid)?`Due amount is ${user.recentPaymentsInfo.rent - this.state.updatedDetails.paid}`:'No Due.':
                                                                                            (this.state.updatedDetails.rent - this.state.updatedDetails.paid)?`Due amount is ${this.state.updatedDetails.rent - this.state.updatedDetails.paid}`:'No Due.'
                                                    } type="text" onChange={this.updateDetails} name="remarks" placeholder="Remarks" className="mr-sm-2" />
                                                    
                                                </Form></CardText>
                                                <CardText><Button  variant="outline-info" type="submit" onClick={()=>this.saveData(selectedComplex,user.meterInfo.clNo,this.rentInput,user.recentPaymentsInfo.rent)}>Save</Button><Button variant="outline-info">Cancel</Button><Button onClick={()=>this.clearFields("")} variant="outline-info">Clear All</Button></CardText>
                                                <CardText></CardText>
                                                </CardBody> : <CardBody><CardText className={this.state.isExpandPayment?'isExpand':''}>Expand to update details of recent payment.</CardText></CardBody>}
                                        </ReactStarpCard>
                                    </CardGroup>
                                </Card.Body>
                            </Accordion.Collapse>
                         </Card>
                         
                    )
                })
    }
    render() {
        let {payload} = this.state;
        let result = _.filter(payload,item=>item.ownerDetails.complexName==this.props.complexName)
        return(
            
                <div>
                    <Accordion>
                            {result.length > 0 ? <div>{this.getComplexDetails(result[0],this.props.complexName)}</div>:null}
                    </Accordion>
                    <Footer footerData={result[0]} targetComponent="UserList"/>
                </div>
             
        )
    }
}

export default Sachin;
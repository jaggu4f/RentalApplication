import React, { Component } from 'react';  
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css";  
import {Button} from 'react-bootstrap';
import DetailsCard from './DetailsCard';
import axios from "axios";
import Select from 'react-select';
import _ from 'lodash';
import logo from '../assets/sachincomplex.jpg';
import Footer from './Footer';

class UesrTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isYearBtn:false,
            payload:[],
            options:[],
            selectedOption: { value: 'Select Year', label: 'Select Year' }
        };
        this.userObj = [];
         this.columns = [
            {  
                Header: 'Month',  
                accessor: 'date'  
            },
            {  
           Header: 'Date',  
           accessor: 'month'  
           },
           {  
           Header: 'Original Rent',  
           accessor: 'rent'  
           },
           {  
            Header: 'Paid(Rs)',  
            accessor: 'paid'  
           },
            {  
            Header: 'Balance(Rs)',  
            accessor: 'balance'  
            },
            {  
            Header: 'Total',  
            accessor: 'total'  
            },
            {  
                Header: 'Remarks',  
                accessor: 'remarks'  
            }
        
        ]  
    }
    componentDidMount(){
        axios.get('http://127.0.0.1:8081/complexDetails')
          .then(res => {
            const payload = res.data;
            this.setState({ payload },()=>{
                if(this.userObj.length>0){
                    let formattedDate = this.userObj[0].advanceDetails.date;
                  let date = new Date(formattedDate);
                let year = date.getFullYear();
                let{options,isYearBtn} = this.state;
                options.push({ value: 'Select Year', label: 'Select Year' });
                for(let j=0;j<5;j++){
                    let yearObj = { value: year+j, label:year+j }
                    options.push(yearObj);
                }
                isYearBtn = year > options[5].value?false:true;
                this.setState({options,isYearBtn});
                }
            });
          })
          
          
        }
    handleChange = selectedOption => {
        this.setState(
          { selectedOption },
          () => console.log(`Option selected:`, this.state.selectedOption)
        );
      };
      getYearData = () =>{
        if(this.userObj.length>0){
            let formattedDate = this.userObj[0].advanceDetails.date;
            let date = new Date(formattedDate);
            let year = date.getFullYear();
            let{options,isYearBtn} = this.state;
            if(year>options[5].value){
                options = [];
                options.push({ value: 'Select Year', label: 'Select Year' });
                for(let j=0;j<5;j++){
                    let yearObj = { value: year+j, label:year+j }
                    options.push(yearObj);
                }
            }
            isYearBtn = year > options[5].value?false:true;
            this.setState({options,isYearBtn});
        }
            
      }
    render() {
        let {payload} = this.state;
        const { match: { params } } = this.props;
        console.log('params',params.userId,params.clNo);
        const { selectedOption } = this.state;
        //let result = _.filter(this.state.payload.rentDetails,item=>item.year == this.state.selectedOption.value);
        let filteredComplexObj = _.filter(this.state.payload,item=>((item.ownerDetails.complexName).replace(/ +/g, "")) == params.complexName);
        let userDetailsObj = filteredComplexObj.length>0 && filteredComplexObj[0].userList && _.filter(filteredComplexObj[0].userList,item=>(item.meterInfo.clNo === params.clNo))
        let userYearRentDetails = userDetailsObj.length>0 && _.filter(userDetailsObj[0].rentDetails,item=>item.year == this.state.selectedOption.value);
        this.userObj = userDetailsObj.length>0?userDetailsObj:[];
        let resultArr = [];
        if(userYearRentDetails.length>0&&userYearRentDetails[0].month.length>0){
            let months = ["January","February","March","April","May","June","July","August","Septmber","October","November","December"]
            resultArr = _.map(userYearRentDetails[0].month,(item,index)=>{
                console.log('dateObj render before',item)
                    let recentPaymentDate = new Date(item.month);
                    item.month = months[recentPaymentDate.getMonth()]?`${months[recentPaymentDate.getMonth()]} ${recentPaymentDate.getDate()}, ${recentPaymentDate.getFullYear()} ${recentPaymentDate.getHours()}:${recentPaymentDate.getMinutes()} ${recentPaymentDate.getHours()<12? 'AM' : 'PM'}`:item.month;
                
                return item;
            })
        }
        return(
            <div>
                <h3>{payload && payload.ownerDetails && payload.ownerDetails.complexName ? this.state.payload.ownerDetails.complexName : null}</h3>
                <img className="logo" src={logo} alt-="apartment image"/>
                <div className="dataContainer">
                    <div >
                        <DetailsCard payload={userDetailsObj}/>
                        <p className="selectYear">Select Year : </p>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={this.state.options}
                        />
                        <Button disabled={this.state.isYearBtn} className="yearBtn" variant="outline-info" onClick={()=>this.getYearData()} >Load Data</Button>
                    </div>
                    {userYearRentDetails.length > 0 ? <ReactTable  
                    data={userYearRentDetails[0].month}  
                    columns={this.columns}  
                    defaultPageSize = {6}  
                    pageSizeOptions = {[2,4, 6]}  
                    /> : <ReactTable  
                    data={[]}  
                    columns={this.columns}  
                    defaultPageSize = {6}  
                    pageSizeOptions = {[2,4, 6]}  
                    />} 
                </div> 
                {/* <div className="footer">
                        <div className="footerData">{payload && payload.complexDetails && payload.complexDetails.complexAddress ? payload.complexDetails.complexAddress : null}</div>
                    <div className="footerData">{payload && payload.complexDetails && payload.complexDetails.complexAddress ? <div><p>{`Ph No : ${payload.complexDetails.phNo}`}</p><p>{`Email : ${payload.complexDetails.email}`}</p></div> : null}</div>
                </div> */}
                <Footer footerData={userDetailsObj} complexName={params.complexName} targetComponent="UserTable"/>
            </div>
        )
    }
}

export default UesrTable;
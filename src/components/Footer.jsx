import React, { Component } from 'react'; 

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    getFooterData = ()=>{
        if(this.props.targetComponent=='UserList'){
            return(
                <div><div className="footerData">
                            <p>{`Complex Name : ${this.props.footerData&&this.props.footerData.ownerDetails.complexName}`}</p>
                            <p>{`Complex Address : ${this.props.footerData&&this.props.footerData.ownerDetails.complexAddress}`}</p>
                        </div>
                        <div className="footerData">
                                <p>{`Ph No : ${this.props.footerData&&this.props.footerData.ownerDetails.phNo}`}</p>
                                <p>{`Email : ${this.props.footerData&&this.props.footerData.ownerDetails.email}`}</p>
                        </div></div>
            )
        }
        else if(this.props.targetComponent=='UserTable'){
            return(
                <div><div className="footerData">
                        <p>{`Complex Name : ${this.props.footerData&&this.props.complexName}`}</p>
                        <p>{`Complex Address : ${this.props.footerData&&this.props.footerData[0].personalInfo&&this.props.footerData[0].personalInfo.address}`}</p>
                    </div>
                    <div className="footerData">
                            <p>{`Ph No : ${this.props.footerData&&this.props.footerData[0].personalInfo&&this.props.footerData[0].personalInfo.phNo}`}</p>
                            <p>{`Email : ${this.props.footerData&&this.props.footerData[0].personalInfo&&this.props.footerData[0].personalInfo.email || 'abc@email.com'}`}</p>
                    </div></div>
            )
        }else{
            return(
                <div><div className="footerData">
                        <p>{`Complex Names:`}</p>
                        <p>{`Sachin Complex`}</p>
                        
                    </div>
                    <div className="footerData">
                    <p>{`Santosh Complex`}</p>
                    <p>{`Jagadeesh Complex`}</p>
                    </div></div>
            )
        }
    }
    render() {
        return(
            <div className="footer">
                        {this.getFooterData()}
                </div>
        )
    }
}

export default Footer;
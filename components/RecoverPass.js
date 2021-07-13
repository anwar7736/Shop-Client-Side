import React, {Component, Fragment} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import {Redirect} from 'react-router-dom';
import Link from 'next/link';
import Router , {useRouter}  from 'next/router';
import Axios from 'axios';

class RecoverPass extends React.Component{
	constructor(){
		super()
		this.state = {
			email : '',
			new_pass : '',
			confirm_pass : '',
		}
	}

recoverPassword=(e)=>{
	e.preventDefault();
	let email = this.state.email;
	let new_pass = this.state.new_pass;
	let confirm_pass = this.state.confirm_pass;
	let emailPattern = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
	if(email=='')
	{
		 cogoToast.error('Email Address is Required!')
	}
	else if(!emailPattern.test(email))
	{
		 cogoToast.error('Invalid Email Address!')
	}
	else if(new_pass=='')
	{
		 cogoToast.error('New Password is Required!')
	}
	else if(new_pass.length < 3)
	{
		 cogoToast.error('New Password is to Short!')
	}
	else if(confirm_pass=='')
	{
		 cogoToast.error('Confirm Password is Required!')
	}
	else if(new_pass!==confirm_pass)
	{
		 cogoToast.error('Both Password does not Match!')
	}
	else{
		let MyForm = new FormData();
		MyForm.append('email', email);
		MyForm.append('password', new_pass);
		Axios.post('https://api.coderanwar.com/api/RecoverPassword', MyForm)
                 .then(response=>{
                   if(response.status===200 && response.data===1)
                   {
                   		
                   		cogoToast.success('Password Recover Successfully');
                   		setTimeout(()=>{
						Router.push('/login');
                   		},2000);
                   }
                   else if(response.status===200 && response.data===0)
                   {
                   		cogoToast.error('Email does not Exists!');
                   }
                 })
                 .catch(error=>{
                   cogoToast.error('Something went wrong!');
                 })
	}
}
 render(){
 	return(
 		<Fragment>
 			<Container className="m-4">
 				<Row>
 					<Col lg={5} md={{span:4, offset:4}} sm={12}>
 						<Form onSubmit={this.recoverPassword}>
 						<h2 className="text-center text-danger">Password Recover</h2>
 								<h2 className="text-center text-danger">Password Recover</h2>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Enter Email</Form.Label>
						    <Form.Control onChange={(e)=>{this.setState({email:e.target.value})}} type="text" placeholder="Enter email" />
						    <Form.Text className="text-muted">
						    </Form.Text>
						  </Form.Group>
						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Enter New Password</Form.Label>
						    <Form.Control onChange={(e)=>{this.setState({new_pass:e.target.value})}} type="password" placeholder="Enter new password" />
						  </Form.Group>
						  <Form.Group controlId="formPassword">
						  <Form.Label>Enter Confirm New Password</Form.Label>
						    <Form.Control onChange={(e)=>{this.setState({confirm_pass:e.target.value})}} type="password" placeholder="Re-type new password" />
						  </Form.Group>
						  <Button variant="info" className="btn-block" type="submit">
						    UPDATE	
						  </Button><br/>
						    <Link href="/login">
						    <p className="forget-pass">Back to Login</p> 
						    </Link>
						</Form>
 					</Col>
 				</Row>
 			</Container>
 		</Fragment>
 		)
 	
 }
}
export default RecoverPass;
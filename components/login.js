import React, {Component, Fragment} from 'react';
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import {Redirect} from 'react-router-dom';
import Link from 'next/link';
import Router , {useRouter}  from 'next/router';
import Axios from 'axios';

class Login extends React.Component{
	constructor(){
		super()
		this.state = {
			username : '',
			password : '',
			isChecked : true,
		}
	}
componentDidMount(){
	let user = localStorage.getItem('user');
	let pass = localStorage.getItem('pass')
	if(user!==null && pass!==null)
	{
		this.setState({username : user, password : pass, isChecked : true});
	}
}
RememberOnChange=()=>{
	if(this.state.isChecked==false)
	{
		this.setState({isChecked : true});
	}
	else
	{
		this.setState({isChecked : false});
	}
}

Login=(e)=>{
	e.preventDefault();
	let username = this.state.username;
	let password = this.state.password;
	if(username=='')
	{
		 cogoToast.warn('Username Field is Required!')
	}
	else if(password=='')
	{
		 cogoToast.warn('Password Field is Required!')
	}
	else{
		Axios.post('https://api.coderanwar.com/api/login', {username:username, password:password})
                 .then(response=>{
                    if(response.status==200 && response.data[0]==='admin')
                    {
                         localStorage.setItem('login', true);
                         localStorage.setItem('seller', response.data[1]);
                         localStorage.setItem('admin', true);
                         if(this.state.isChecked==true)
                         {
                         	localStorage.setItem('user', this.state.username);
                         	localStorage.setItem('pass', this.state.password);
                         }
                         else
                         {
                         	let user = localStorage.getItem('user');
						let pass = localStorage.getItem('pass');
						if(user!==null && pass!==null)
						{
							localStorage.removeItem('user');
							localStorage.removeItem('pass');	
						}
                         }
                         Router.push('/');	
                    }
                    else if (response.status==200 && response.data[0]==='worker')
                    {
                    	localStorage.setItem('login', true);
                    	localStorage.setItem('seller', response.data[1]);
                         localStorage.setItem('worker', true);
                         if(this.state.isChecked==true)
                         {
                         	localStorage.setItem('user', this.state.username);
                         	localStorage.setItem('pass', this.state.password);
                         }
                         else
                         {
                         	let user = localStorage.getItem('user');
						let pass = localStorage.getItem('pass');
						if(user!==null && pass!==null)
						{
							localStorage.removeItem('user');
							localStorage.removeItem('pass');	
						}
                         }
                         Router.push('/');	
                    }
                    else{
                         cogoToast.error(response.data);
                    }
                 })
                 .catch(error=>{
                    cogoToast.error('Something went wrong!');
                 })
	}
}
passwordShowHide=()=>{
	let input = document.getElementById("password");
	let btnText = document.getElementById("showHideBtn");
	if(input.type=="password")
	{
		input.type = "text";
		btnText.innerHTML = '<i class="fa fa-eye-slash"/> Hide Password';
	}
	else
	{
		input.type = "password";
		btnText.innerHTML = '<i class="fa fa-eye"/> Show Password';
	}
}
 render(){

 	return(
 		<Fragment>
 			<Container className="m-4">
 				<Row>
 					<Col lg={5} md={{span:4, offset:4}} sm={12}>
 						<Form onSubmit={this.Login}>
 							<h2 className="text-center text-danger">Login</h2>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Enter Username</Form.Label>
						    <Form.Control value={this.state.username} onChange={(e)=>{this.setState({username:e.target.value})}} type="text" placeholder="Enter username" />
						    <Form.Text className="text-muted">
						    </Form.Text>
						  </Form.Group>
						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Enter Password</Form.Label>
						    <Form.Control value={this.state.password} onChange={(e)=>{this.setState({password:e.target.value})}} type="password" placeholder="Enter password" id="password"/>
						    <button id="showHideBtn" onClick={this.passwordShowHide} type="button" className="btn mt-0"><i class="fa fa-eye"/> Show Password</button>
						  </Form.Group>

						  <Button variant="success" className="btn-block mb-2" type="submit">
						    Login	
						  </Button>
						  <Form.Group>
						   	<Form.Label className="remember-me">
						   		<input onChange={this.RememberOnChange} type="checkbox" defaultChecked={this.state.isChecked}/> <span className="text-primary">Remember me </span>
						   	</Form.Label> 
						   	<Link href="/pass_rec">
						    		<p className="forget-pass">Forgotten Password?</p> 
						    </Link>
						  </Form.Group>
						   
					</Form>
 					</Col>
 				</Row>
 			</Container>
 		</Fragment>
 		)
 	
 }
}
export default Login;
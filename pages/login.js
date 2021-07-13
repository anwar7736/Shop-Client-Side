import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import SiteLogin from '../components/login';
import Footer from '../components/Footer';
import Head from 'next/head';
import Router , {useRouter}  from 'next/router';

class Login extends React.Component{
	componentDidMount(){
		   if(localStorage.getItem('login')!=null)
            {
                Router.push('/');
            }
	}
 render(){
 	return(
 		<Fragment>
 			<Head>
 				<title>Login</title>
 			</Head>
 			<NavBar/>
 			<SiteLogin/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default Login;
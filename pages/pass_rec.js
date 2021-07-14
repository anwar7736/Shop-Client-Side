import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import RecoverPass from '../components/RecoverPass';
import Footer from '../components/footer';
import Head from 'next/head';
import Router , {useRouter}  from 'next/router';

class PasswordRecover extends React.Component{
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
 				<title>Password Recover</title>
 			</Head>
 			<NavBar/>
 			<RecoverPass/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default PasswordRecover;
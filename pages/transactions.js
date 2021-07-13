import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import TrasactionList from '../components/transactionlist';
import Footer from '../components/Footer';
import Head from 'next/head';
import Router , {useRouter}  from 'next/router';

class Transactions extends React.Component{
        componentDidMount(){
            if(localStorage.getItem('login')==null)
            {
                 Router.push('/login');
            }
        }
 render(){
 	return(
 		<Fragment>
			<Head>
 				<title>Transactions</title>
 			</Head>
 			<NavBar/>
 			<TrasactionList/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default Transactions;
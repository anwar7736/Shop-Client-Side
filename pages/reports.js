import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import ReportList from '../components/reportlist';
import Footer from '../components/footer';
import Head from 'next/head';
import Router , {useRouter}  from 'next/router';

class Reports extends React.Component{
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
 				<title>Reports</title>
 			</Head>
 			<NavBar/>
 			<ReportList/>
 			<div className="no-print">
                <Footer/>
            </div>
 		</Fragment>
 		)
 }
}
export default Reports;
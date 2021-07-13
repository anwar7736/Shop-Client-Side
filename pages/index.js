import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import DashboardList from '../components/dashboardlist';
import Footer from '../components/Footer';
import Head from 'next/head';
import Axios from 'axios';
import Router , {useRouter}  from 'next/router';

class Index extends React.Component{
    constructor(){
        super();
        this.state = {
            transactions : '',
            categories : '',
            products: '',
            earnings : '',
            dataTable : '',
            dataChart : '',
        }
    }
    componentDidMount(){
            if(localStorage.getItem('login')==null)
            {
                 Router.push('/login');
            }
         Axios.get('https://api.coderanwar.com/api/CountSummary')
         .then(response=>{
             this.setState({
                transactions: response.data['transactions'].length,
                categories: response.data['categories'],
                products: response.data['products'],
                earnings: response.data['earnings'],
            });
         })
         .catch(error=>{

         }) 
         Axios.get('https://api.coderanwar.com/api/RecentTransactionList')
         .then(response=>{
             this.setState({dataTable : response.data});
         })
         .catch(error=>{

         })
         Axios.get('https://api.coderanwar.com/api/IncomeLast7Days')
         .then(response=>{
             this.setState({dataChart : response.data});
         })
         .catch(error=>{

         })
    }
 render(){

 	return(
 		<Fragment>
 			<Head>
 				<title>Home</title>
 			</Head>
 			<NavBar/>
 			<DashboardList
 			   TotalTransaction={this.state.transactions}
 			   TotalIncome={this.state.earnings}
			   TotalCategory={this.state.categories}
			   TotalProduct={this.state.products}
			   dataChart={this.state.dataChart}
			   dataTable={this.state.dataTable}
 			/>
            <Footer/>
 		</Fragment>
 		)
    
 }
}
export default Index;
import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import ReceivedList from '../components/stockReceivedReport';
import Footer from '../components/footer';
import Head from 'next/head';
import Router , {useRouter}  from 'next/router';

class StockIncrease extends React.Component{
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
                <title>Stock Received Report</title>
            </Head>
            <NavBar/>
            <ReceivedList/>
           <div className="no-print">
                <Footer/>
            </div>
        </Fragment>
        )
 }
}
export default StockIncrease;
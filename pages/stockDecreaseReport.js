import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import DecreaseList from '../components/stockDecreaseReport';
import Footer from '../components/footer';
import Head from 'next/head';
import Router , {useRouter}  from 'next/router';

class StockDecrease extends React.Component{
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
                <title>Stock Decrease Report</title>
            </Head>
            <NavBar/>
            <DecreaseList/>
           <div className="no-print">
                <Footer/>
            </div>
        </Fragment>
        )
 }
}
export default StockDecrease;
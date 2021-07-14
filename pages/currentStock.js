import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import CurrentStockList from '../components/currentstocklist';
import Footer from '../components/footer';
import Head from 'next/head';
import Router , {useRouter}  from 'next/router';

class CurrentStock extends React.Component{
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
                <title>Current Stock</title>
            </Head>
            <NavBar/>
            <CurrentStockList/>
           <div className="no-print">
                <Footer/>
            </div>
        </Fragment>
        )
 }
}
export default CurrentStock;
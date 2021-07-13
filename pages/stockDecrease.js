import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import Decrease from '../components/stockDecrease';
import Footer from '../components/Footer';
import Head from 'next/head';
import Router , {useRouter}  from 'next/router';

class StockIncrease extends React.Component{
        componentDidMount(){
        if(localStorage.getItem('admin')==null)
        {
             Router.push('/');
        }
    }
 render(){
    return(
        <Fragment>
            <Head>
                <title>Current Stock Decrease</title>
            </Head>
            <NavBar/>
            <Decrease/>
            <Footer/>
        </Fragment>
        )
 }
}
export default StockIncrease;
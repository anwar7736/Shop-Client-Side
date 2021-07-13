import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import PrdouctList from '../components/productlist';
import Footer from '../components/Footer';
import Head from 'next/head';
import Router , {useRouter}  from 'next/router';
class Products extends React.Component{

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
 				<title>Products</title>
 			</Head>
 			<NavBar/>
 			<PrdouctList/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default Products;
import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import CategoryList from '../components/categorylist';
import Footer from '../components/footer';
import Head from 'next/head';
import Router , {useRouter}  from 'next/router';

class Categories extends React.Component{
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
 				<title>Categories</title>
 			</Head>
 			<NavBar/>
 			<CategoryList/>
 			<Footer/>
 		</Fragment>
 		)
 }
}
export default Categories;
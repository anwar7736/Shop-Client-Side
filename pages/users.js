import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import UserList from '../components/userlist';
import Footer from '../components/footer';
import Head from 'next/head';
import Axios from 'axios';
import Router , {useRouter}  from 'next/router';

class Users extends React.Component{
      constructor(){
        super();
        this.state = {
            dataTable : [],
        }
    }
    componentDidMount(){
        if(localStorage.getItem('admin')==null)
        {
             Router.push('/');
        }
         Axios.get('https://api.coderanwar.com/api/SelectUser')
         .then(response=>{
             this.setState({dataTable : response.data});
         })
         .catch(error=>{

         })
         
     }
    render(){
 	return(
 		<Fragment>
 			<Head>
 				<title>Users</title>
 			</Head>
 			<NavBar/>
 			<UserList
 			  dataTable={this.state.dataTable}
 			/>
            <Footer/>
 		</Fragment>
 		);
 }
}
export default Users;
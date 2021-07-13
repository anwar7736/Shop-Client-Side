import React, {Component, Fragment} from 'react';
import NavBar from '../components/desktop';
import UserList from '../components/userlist';
import Footer from '../components/Footer';
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
<<<<<<< HEAD
         Axios.get('https://api.coderanwar.com/api/SelectUser')
         .then(response=>{
             this.setState({dataTable : response.data});
         })
         .catch(error=>{

         })
=======
         
>>>>>>> c0131935539899118889895929b84eb7b82133c9
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
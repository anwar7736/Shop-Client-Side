import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Axios from 'axios';
import cogoToast from 'cogo-toast';

class UserList extends React.Component{
 constructor() {
        super();
        this.state={
            dataTable : [],
            show:false,
            showEdit:false,
            deleteID:"",
            editID:"",
            fname : '',
            uname : '',
            email : '',
            uroll : 'Worker',
            upass : '',
            roll1 : 'Admin',
            roll2 : 'Worker',
        }
    }
    componentDidMount(){
         Axios.get('https://api.coderanwar.com/api/SelectUser')
         .then(response=>{
             this.setState({dataTable : response.data});
         })
         .catch(error=>{

         })
     }
    onChangeHandler=(event)=>
    {
        this.setState({[event.target.name] : event.target.value});
        this.setState({selected : event.target.value['uroll']});
    }
    onSubmitHandler=()=>
    {
        let emailPattern = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;

        if(this.state.fname=='')
        {
            cogoToast.warn('Full Name Field is Required!')
        }
        else if(this.state.uname=='')
        {
            cogoToast.warn('Username Field is Required!')
        }
        else if(this.state.email=='')
        {
            cogoToast.warn('Email Address Field is Required!')
        }
        else if (!emailPattern.test(this.state.email))
        {
             cogoToast.warn('Invalid Email Address!')
        }
        else if(this.state.upass=='')
        {
            cogoToast.warn('Password Field is Required!')
        }
        else if(this.state.editID==''){
           Axios.post('https://api.coderanwar.com/api/AddUser', 
            {
                name:this.state.fname,
                username:this.state.uname,
                email:this.state.email,
                password:this.state.upass,
                roll:this.state.uroll
            }
            )
                 .then(response=>{
                    if(response.status==200 && response.data==1)
                    {
                         this.resetForm();
                         this.handleClose();
                         cogoToast.success('New User added successfully');
                         this.componentDidMount();

                    }
                    else{
                         cogoToast.error(response.data);
                    }
                 })
                 .catch(error=>{
                    cogoToast.error('Something went wrong!');
                 })
        }
        else
        {
             Axios.post('https://api.coderanwar.com/api/UpdateUser', {
                id:this.state.editID,
                name:this.state.fname,
                username:this.state.uname,
                email:this.state.email,
                roll:this.state.uroll })
                 .then(response=>{
                    if(response.status==200 && response.data==1)
                    {
                         this.resetForm();
                         this.handleCloseEdit();
                         cogoToast.success('User data updated successfully');
                         this.componentDidMount();

                    }
                    else{
                        this.handleCloseEdit();
                         cogoToast.info('Nothing to Changes');
                    }
                 })
                 .catch(error=>{

                      cogoToast.error('Something went wrong!');
                 })
        }
    }
    resetForm=()=>{
        this.setState({ fname : '',uname : '', email : '', upass : '', uroll : 'Worker'})
    }

    handleClose=()=>{
        this.setState({ show:false})
    }

    handleOpen=()=>{
        this.setState({ show:true})
    }

    handleCloseEdit=()=>{
        this.setState({ showEdit:false, editID : ''})
        this.resetForm();
    }

    handleOpenEdit=()=>{
        this.setState({ showEdit:true})
    }

    deleteIconOnClick=(id)=>{
            if(confirm('Do you want to delete this user?'))
            {
                 Axios.get('https://api.coderanwar.com/api/DeleteUser/'+id)
                 .then(response=>{
                     cogoToast.success('User has been deleted');
                     this.componentDidMount();
                 })
                 .catch(error=>{

                 })
            }
          
    }

    editIconOnClick=(id)=>{
       this.handleOpenEdit();
       this.setState({editID:id})
       Axios.get('https://api.coderanwar.com/api/getUser/'+id)
                 .then(response=>{
                         this.setState({
                            fname: response.data.fullname,
                            uname: response.data.username,
                            email: response.data.email,
                            upass: response.data.password,
                            uroll: response.data.roll,
                        })
                 })
                 .catch(error=>{
                    cogoToast.error('Something went wrong!');
                 })

    }
 render(){
 	const columns = [
            {
                name: 'Full Name',
                selector: 'fullname',
                sortable: true,

            },
            {
                name: 'User Name',
                selector: 'username',
                sortable: true,
            },
            {
                name: 'Roll',
                selector: 'roll',
                sortable: true,
            },
            {
                name: 'Email',
                selector: 'email',
                sortable: true,
            },
            {
                name: 'Delete',
                selector: 'id',
                sortable: false,
                cell: row => <button onClick={this.deleteIconOnClick.bind(this,row.id)}  className="btn btn-sm text-danger"><i className="fa fa-trash-alt"/></button>
            },
            {
                name: 'Edit',
                selector: 'id',
                sortable: false,
                cell: row => <button onClick={this.editIconOnClick.bind(this,row.id)}  className="btn btn-sm text-success"><i className="fa fa-edit"/></button>
            },
        ];
 	return(
 		<Fragment>
 			 <Container className="animated zoomIn">
                    <Row className="mt-2">
                        <Col sm={12} xs={12} md={12} lg={12}>
                            <Card className="bg-secondary">
                                <Card.Body>
                                    <Container fluid={true}>
                                        <Row>
                                            <Col><h4 className="table-title text-light">User List</h4></Col>
                                            <Col><button onClick={this.handleOpen} className="float-right circular-btn"><i className="fa fa-plus"/></button></Col>
                                        </Row>
                                    </Container>
                                    <hr className="bg-secondary"/>
                                    <Container fluid={true}>
                                        <Row>
                                            <Col sm={12} xs={12} md={12} lg={12}>
                                                <DataTable
                                                    noHeader={true}
                                                    paginationPerPage={5}
                                                    pagination={true}
                                                    columns={columns}
                                                    data={this.state.dataTable}
                                                />
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                 <Modal animation={false} className="animated zoomIn" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <h6>Add New User</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="form-label">Full Name</label>
                        <input onChange={this.onChangeHandler} name="fname" className="form-control form-control-sm" type="text"/>
                        <label className="form-label">User Name</label>
                        <input onChange={this.onChangeHandler} name="uname" className="form-control form-control-sm" type="text"/> 
                        <label className="form-label">User Email</label>
                        <input onChange={this.onChangeHandler} name="email" className="form-control form-control-sm" type="text"/>
                        <label className="form-label">Password</label>
                        <input onChange={this.onChangeHandler} name="upass" className="form-control form-control-sm" type="password"/>
                        <label className="form-label">User Roll</label>
                        <select onChange={this.onChangeHandler} name="uroll" value={this.state.uroll} className="form-control form-control-sm form-select">
                            <option>{this.state.roll1}</option>
                            <option>{this.state.roll2}</option>
                        </select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn btn-sm btn-danger" variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <button onClick={this.onSubmitHandler} className="btn btn-sm btn-success">
                            Save Changes
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal animation={false} className="animated zoomIn" show={this.state.showEdit} onHide={this.handleCloseEdit}>
                    <Modal.Header>
                        <h6>Edit User</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="form-label">Full Name</label>
                        <input onChange={this.onChangeHandler} name="fname" value={this.state.fname} className="form-control form-control-sm" type="text"/> 
                        <label className="form-label ">User Name</label>
                        <input onChange={this.onChangeHandler} name="uname" value={this.state.uname}className="form-control form-control-sm" type="text"/>
                         <label className="form-label">User Email</label>
                        <input onChange={this.onChangeHandler} name="email" value={this.state.email} className="form-control form-control-sm" type="text"/>
                        <label className="form-label">User Roll</label>
                        <select onChange={this.onChangeHandler} name="uroll" value={this.state.uroll} className="form-control form-control-sm form-select">
                            <option>{this.state.roll1}</option>
                            <option>{this.state.roll2}</option>
                        </select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="btn-sm btn-danger" variant="secondary" onClick={this.handleCloseEdit}>
                            Close
                        </Button>
                        <button  className="btn btn-sm btn-info"  onClick={this.onSubmitHandler}>
                            Save Changes
                        </button>
                    </Modal.Footer>
                </Modal>
 		</Fragment>
 		)
 }
}
export default UserList;
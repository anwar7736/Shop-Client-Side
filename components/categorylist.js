import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Axios from 'axios';
import cogoToast from 'cogo-toast';

class CategoryList extends Component {
    constructor() {
        super();
        this.state={
            dataTable : [],
            show:false,
            showEdit:false,
            deleteID:"",
            editID:"",
            cat_name : '',
            cat_img : '',
        }
    }
    componentDidMount(){
         Axios.get('https://api.coderanwar.com/api/SelectCategory')
         .then(response=>{
             this.setState({dataTable : response.data});
         })
         .catch(error=>{

         })
     }
    onCategoryName=(event)=>
    {
        this.setState({cat_name : event.target.value});
    }
    onCategoryImg=(event)=>
    {
        this.setState({cat_img : event.target.files[0]});
    }
    onSubmitHandler=()=>
    {
        if(this.state.cat_name=='')
        {
            cogoToast.warn('Category Name Field is Required!')
        }
        else if(this.state.cat_img=='')
        {
            cogoToast.warn('Category Image Field is Required!')
        }
        else{
            var myData = new FormData;
            myData.append('name', this.state.cat_name);
            myData.append('image', this.state.cat_img);
           Axios.post('https://api.coderanwar.com/api/AddCategory',myData)
                 .then(response=>{
                    if(response.status==200 && response.data==1)
                    {
                         this.resetForm();
                         this.handleClose();
                         cogoToast.success('New Category added successfully');
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
      
    }
    onUpdateHandler=()=>{
        if(this.state.cat_name=='')
        {
            cogoToast.warn('Category Name Field is Required!')
        }
        else{
            var myData = new FormData;
            myData.append('name', this.state.cat_name);
            myData.append('image', this.state.cat_img);
            myData.append('cat_code', this.state.editID);
            Axios.post('https://api.coderanwar.com/api/UpdateCategory',myData)
                 .then(response=>{
                    if(response.status==200 && response.data==1)
                    {
                         this.resetForm();
                         this.handleCloseEdit();
                         cogoToast.success('Category updated successfully');
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
    }
    resetForm=()=>{
        this.setState({ cat_name : '',cat_img : ''})
    }
    handleClose=()=>{
        this.setState({ show:false})
    }
    handleOpen=()=>{
        this.setState({ show:true})
    }

    handleCloseEdit=()=>{
        this.setState({ showEdit:false})
    }
    handleOpenEdit=()=>{
        this.setState({ showEdit:true})
    }

    deleteIconOnClick=(id)=>{
       if(confirm('Do you want to delete this user?'))
        {
             Axios.get('https://api.coderanwar.com/api/DeleteCategory/'+id)
             .then(response=>{
                 cogoToast.success('Category has been deleted');
                 this.componentDidMount();
             })
             .catch(error=>{

             })
        }
    }


    editIconOnClick=(id)=>{
        this.handleOpenEdit();
        this.setState({editID:id})
         Axios.get('https://api.coderanwar.com/api/getCategory/'+id)
                 .then(response=>{
                         this.setState({cat_name: response.data.cat_name,cat_img: response.data.cat_icon
                        })
                 })
                 .catch(error=>{
                    cogoToast.error('Something went wrong!');
                 })

    }

    render() {

        const columns = [
            {
                name: 'Category Icon',
                selector: 'cat_icon',
                sortable: true,
                cell: row => <img src={row.cat_icon} className="cat-icon"/>


            },
            {
                name: 'Category Name',
                selector: 'cat_name',
                sortable: true,

            },
            {
                name: 'Category Code',
                selector: 'cat_code',
                sortable: true,
            },
            {
                name: 'Delete',
                selector: 'id',
                sortable: false,
                cell: row => <button onClick={this.deleteIconOnClick.bind(this,row.id)}  className="btn text-danger"><i className="fa fa-trash-alt"/></button>
            },
            {
                name: 'Edit',
                selector: 'id',
                sortable: false,
                cell: row => <button onClick={this.editIconOnClick.bind(this,row.cat_code)}  className="btn text-info"><i className="fa fa-edit"/></button>
            },
        ];

        return (
            <Fragment>
                <Container className="animated zoomIn">

                    <Row className="mt-2">
                        <Col sm={12} xs={12} md={12} lg={12}>
                            <Card>
                                <Card.Body>
                                    <Container fluid={true}>
                                        <Row>
                                            <Col><h4 className="table-title">Category List</h4></Col>
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
                        <h6>Add New Category</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="form-label">Category Name</label>
                        <input onChange={this.onCategoryName} name="cat_name" className="form-control form-control-sm" type="text"/>
                        <label className="form-label">Category Icon</label>
                        <input onChange={this.onCategoryImg} name="cat_img" className="form-control form-control-sm form-control-file" type="file"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button  className="btn btn-sm btn-site" onClick={this.handleClose}>
                            Close
                        </button>
                        <button onClick={this.onSubmitHandler} className="btn btn-sm btn-dark">
                            Save Changes
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal animation={false} className="animated zoomIn" show={this.state.showEdit} onHide={this.handleCloseEdit}>
                    <Modal.Header>
                        <h6> Edit Category </h6>
                    </Modal.Header>
                    <Modal.Body>
                        <label className="form-label">Category Name</label>
                        <input onChange={this.onCategoryName} value={this.state.cat_name} className="form-control form-control-sm" type="text"/>
                        <label className="form-label">Category Icon</label>
                        <input onChange={this.onCategoryImg} className="form-control form-control-sm form-control-file" type="file"/>

                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-sm btn-danger" onClick={this.handleCloseEdit}>
                            Close
                        </button>
                        <button className="btn btn-sm btn-success"  onClick={this.onUpdateHandler}>
                            Save Changes
                        </button>
                    </Modal.Footer>
                </Modal>

            </Fragment>
        );
    }
}
export default CategoryList;
import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Axios from 'axios';
import cogoToast from 'cogo-toast';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';  

class CurrentStockList extends React.Component{
	constructor() {
        super();
        this.state={
            dataTable : [],
            editID:"",
            product_qty : 0,
            total : '',
        }
    }
        componentDidMount(){
         Axios.get('https://api.coderanwar.com/api/CurrentStockReport')
         .then(response=>{
             this.setState({dataTable : response.data[0], total: response.data[1]});
         })
         .catch(error=>{

         })
     }

        print=()=>{
            
           window.print();
         }
 render(){

 	return(
 		<Fragment>
 			  <Container className="animated zoomIn transaction-preview">

                    <Row className="mt-2">
                        <Col sm={12} xs={12} md={12} lg={12}>
                            <Card>
                                <Card.Body>
                                    <Container fluid={true}>
                                        <Row>
                                            
                                            <Col><h4 className="heading-title text-danger">Current Stock</h4></Col>
                                        <div className="no-print">  
                                        <ReactHTMLTableToExcel  
                                                className="btn btn-success btn-sm"  
                                                table="export-excel"  
                                                filename="Current Stock"  
                                                sheet="Sheet"  
                                                buttonText="Save As Excel" />  
                                            <button onClick={this.print} className="btn btn-danger ml-3 btn-sm">Print</button>
                                        </div>  

                                        </Row>


                                    </Container>
                                    <hr className="bg-secondary"/>
                                    <Container fluid={true}>
                                        <Row>
                                            <Col sm={12} xs={12} md={12} lg={12}> 
                                               <table className="table table-borderd table-striped" id="export-excel">
                                                   <thead className="bg-light">
                                                        <h5 className="text-success heading-subtitle">Total Stock : {this.state.total}TK</h5>
                                                        <tr>
                                                            <th>Image</th>
                                                            <th>Product Code</th>
                                                            <th>Product Name</th>
                                                            <th>Category</th>
                                                            <th>Unit Price</th>
                                                            <th>Available Qty</th>
                                                            <th>Total Price</th>
                                                        </tr>
                                                   </thead>
                                                   <tbody>
                                                       {
                                                        this.state.dataTable.map((List, i)=>{
                                                            return  <tr>
                                                                        <td><img className="cat-icon" src={List.product_icon}/></td>
                                                                        <td>{List.product_code}</td>
                                                                        <td>{List.product_name}</td>
                                                                        <td>{List.product_category}</td>
                                                                        <td>{List.product_price}</td>
                                                                        <td>{List.product_qty}</td>
                                                                        <td>{List.total_price}</td>
                                                                    </tr>
                                                        })
                                                       }
                                                   </tbody>
                                                 
                                               </table>  

                                            </Col>
                                        </Row>

                                    </Container>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
 		</Fragment>
 		)
 }
}
export default CurrentStockList;
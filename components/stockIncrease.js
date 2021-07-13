import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Axios from 'axios';
import cogoToast from 'cogo-toast';

class StockIncrease extends React.Component{
    constructor() {
        super();
        this.state={
            dataTable : [],
            editID:"",
            product_qty : 0,
            invoiceNo : '',
        }
    }
        componentDidMount(){
         Axios.get('https://api.coderanwar.com/api/CurrentStockReport')
         .then(response=>{
             this.setState({dataTable : response.data[0]});
         })
         .catch(error=>{

         })
     }
     onQtyChange=(event)=>{
        this.setState({product_qty:event.target.value})
     }
     onReceivedHandler=(product_name,product_code,product_category,product_price,product_icon)=>{
        if(this.state.invoiceNo=='')
        {
            cogoToast.warn('Invoice No Field is Required!');
        }
        else{
                var myData = new FormData;
                myData.append('invoice_no', this.state.invoiceNo);
                myData.append('product_name', product_name);
                myData.append('product_code', product_code);
                myData.append('product_category', product_category);
                myData.append('product_unit_price', product_price);
                myData.append('product_qty', this.state.product_qty);
                myData.append('product_icon', product_icon);
             Axios.post('https://api.coderanwar.com/api/StockReceived',myData)
            .then(response=>{
              if(response.status===200)
                    {
                         this.setState({product_qty:0});
                         cogoToast.success('Stock Received Successfully');
                         this.componentDidMount();

                    }
                    else {
                          cogoToast.error('Please change stock quantity!');
                    }
         })
         .catch(error=>{
            cogoToast.error('Something went wrong!');
         })
        }
        
     }
 render(){
    const columns = [
            {
                name: 'Product Icon',
                selector: 'product_icon',
                sortable: true,
                cell: row => <img src={row.product_icon} className="cat-icon"/>
            },
            {
                name: 'Product Code',
                selector: 'product_code',
                sortable: true,
            },
            {
                name: 'Product Name',
                selector: 'product_name',
                sortable: true,

            },
            {
                name: 'Product Category',
                selector: 'product_category',
                sortable: true,
            },
            {
                name: 'Unit Price',
                selector: 'product_price',
                sortable: true,
            },

            {
                name: 'Current Qty',
                selector: 'product_qty',
                sortable: false,
               
            },
            {
                name: 'Receive Qty',
                sortable: false,
                cell: row => (<div><input id="input" onChange={this.onQtyChange} type="number" min="0" className="w-100" value={this.state.product_qty}/></div>)
               
            },
            {
                name: 'Total Price',
                selector: 'total_price',
                sortable: false,
               
            },
            {
                name: 'Action',
                selector: 'id',
                sortable: false,
                cell: row => <button onClick={this.onReceivedHandler.bind(this,row.product_name, row.product_code, row.product_category, row.product_price, row.product_icon)} className="btn btn-sm btn-success">Save</button>
            },
        ];

    return(
        <Fragment>
              <Container className="animated zoomIn">

                    <Row className="mt-2">
                        <Col sm={12} xs={12} md={12} lg={12}>
                            <Card>
                                <Card.Body>
                                    <Container fluid={true}>
                                        <Row>
                                            <Col>
                                                <h4 className="table-title text-danger">Receive Physical Stock</h4>
                                            </Col>
                                            <Col>
                                                <h6 className="table-title text-danger"> Invoice No : <input className="bg-light" onChange={(e)=>this.setState({invoiceNo: e.target.value})} type="text"/></h6>
                                            </Col>
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
        </Fragment>
        )
 }
}
export default StockIncrease;
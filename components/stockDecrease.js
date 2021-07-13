import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Axios from 'axios';
import cogoToast from 'cogo-toast';

class StockDecrease extends React.Component{
    constructor() {
        super();
        this.state={
            dataTable : [],
            editID:"",
            product_qty : 0,
            dec_reason : '',
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
        if(this.state.dec_reason=='')
        {
            cogoToast.warn('Decrease Reason Field is Required!');
        }
        else{
                var myData = new FormData;
                myData.append('decrease_reason', this.state.dec_reason);
                myData.append('product_name', product_name);
                myData.append('product_code', product_code);
                myData.append('product_category', product_category);
                myData.append('product_unit_price', product_price);
                myData.append('product_qty', this.state.product_qty);
                myData.append('product_icon', product_icon);
             Axios.post('https://api.coderanwar.com/api/StockDecrease',myData)
            .then(response=>{
              if(response.status==200)
                    {
                         this.setState({product_qty:0});
                         cogoToast.success('Stock Decrease Successfully');
                         this.componentDidMount();

                    }
                    else{
                          cogoToast.error('Please change stock quantity!');
                    }
         })
         .catch(error=>{
            cogoToast.error('Please change stock quantity!');
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
                name: 'Dec Qty',
                sortable: false,
                cell: row => (<div><input id="input" onChange={this.onQtyChange} type="number" min="0" max={row.product_qty} className="w-100" value={this.state.product_qty}/></div>)
               
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
                                                <h4 className="table-title text-danger">Current Stock Decrease</h4>
                                            </Col>
                                            <Col>
                                                <h6 className="table-title text-danger"> Decrease Reason : <input className="w-50 bg-light" onChange={(e)=>this.setState({dec_reason: e.target.value})} type="text"/></h6>
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
export default StockDecrease;
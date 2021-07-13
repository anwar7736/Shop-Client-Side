import React, {Component, Fragment} from 'react';
import {Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import Axios from 'axios';
import cogoToast from 'cogo-toast';
import TransactionList  from './transactionlist';

class ReportList extends React.Component{
    constructor() {
            super();
            this.state={
                dataTable : [],
                selectedMemo : '',
                MemoList : [],
                total : '',
                }
        }

            componentDidMount=()=>{
             Axios.get('https://api.coderanwar.com/api/TransactionList')
             .then(response=>{
                 this.setState({dataTable : response.data[0], total : response.data[1]});
             })
             .catch(error=>{

             })

             Axios.get('https://api.coderanwar.com/api/GetInvoiceList')
             .then(response=>{
                 this.setState({MemoList : response.data});
             })
             .catch(error=>{

             })
         }
         
        resetForm=()=>{
            let from = document.getElementById('from_date').value = '';
            let to = document.getElementById('to_date').value = '';
            this.componentDidMount();
        }
        GetOrderDetails=(e)=>{
            let memo_no = e.target.value;
            Axios.get('https://api.coderanwar.com/api/GetOrderDetails/'+memo_no)
             .then(response=>{
                 this.setState({dataTable : response.data[0], total : response.data[1]});
             })
             .catch(error=>{

             })
         }
         filterByDate=()=>{
           let from_date =  document.getElementById('from_date').value;
           let to_date =  document.getElementById('to_date').value;
           if(from_date=='' || to_date=='')
           {
             cogoToast.warn('Both dates are required!');
           }
           else{
              Axios.post('https://api.coderanwar.com/api/TransactionListByDate', {from_date:from_date, to_date:to_date})
             .then(response=>{
                this.setState({dataTable : response.data[0], total : response.data[1]});
             })
             .catch(error=>{

             })
           }
         } 


         print=()=>{
            
           window.print();
         }

    render(){
            const dataTable = this.state.dataTable;
 	 const columns = [
            {
                name: 'Invoice No',
                selector: 'invoice_no',
                sortable: true,

            },
            {
                name: 'Memo No',
                selector: 'memo_no',
                sortable: true,

            },
            {
                name: 'Invoice Date',
                selector: 'invoice_date',
                sortable: true,
            },
            {
                name: 'Product Name',
                selector: 'product_name',
                sortable: true,
            },
            {
                name: 'Unit Price',
                selector: 'product_unit_price',
                sortable: true,
            }, 
            {
                name: 'Quantity',
                selector: 'product_qty',
                sortable: true,
            },
            {
                name: 'Total Price',
                selector: 'product_total_price',
                sortable: true,
            },


        ];

 	return(
 		<Fragment>
 			 <Container className="animated zoomIn transaction-preview">

                    <Row className="mt-2">
                        <Col sm={12} xs={12} md={12} lg={12}>
                            <Card>
                                <Card.Body>
                                    <Container fluid={true}>
                                        <Row>
                                            <Col md={6}>
                                                <div className="input-group">
                                                    <h4 className=" mr-2 text-danger heading-title">Sales Report</h4>
                                                    <div className="offset-md-1 no-print">
                                                        <span className="table-title">Memo No : </span>
                                                        <select onChange={this.GetOrderDetails}>
                                                            <option value="" selected disabled>Choose Memo No</option>
                                                            {
                                                                this.state.MemoList.map((List, i)=>{
                                                                    return <option value={List.memo_no} >{List.memo_no}</option>
                                                                })
                                                            }
                                                        </select>
                                                          <button onClick={this.print} className="btn btn-info btn-sm ml-3">Print Memo</button>
                                                    </div>
                                                  
                                                </div>
                                            </Col>

                                            <Col md={6} className="no-print">
                                                <div className="input-group" id="form">
                                                    <input id="from_date" className="form-control form-control-sm mx-2" type="date"/>
                                                    <input id="to_date" className="form-control form-control-sm mx-2" type="date"/>
                                                    <button onClick={this.filterByDate} className="btn btn-sm btn-success mx-2">Filter</button>
                                                    <button onClick={this.resetForm} className="btn btn-sm btn-danger mx-2">Refresh</button>
                                                </div>
                                            </Col>


                                        </Row>
                                    </Container>
                                    <hr className="bg-secondary"/>
                                    <Container fluid={true}>
                                        <Row>
                                            <Col sm={12} xs={12} md={12} lg={12}>
                                                <h5 className="mb-3"><span className="text-danger">Total Sales Value : </span><span className="text-success">{this.state.total}TK</span></h5>
                                                <DataTable
                                                    noHeader={true}
                                                    paginationPerPage={5}
                                                    pagination={true}
                                                    columns={columns}
                                                    data={dataTable}
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
export default ReportList;
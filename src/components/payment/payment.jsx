import { Link } from 'react-router-dom'
import Footer from '../home/Footer'
import Header from '../home/Header'
import React, { useEffect, useState,useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import _ from 'lodash'
import { DownloadTableExcel } from 'react-export-table-to-excel';

const pageSize = 10
const Payment = () => {

  const tableRef = useRef(null);

  const baseURL = process.env.REACT_APP_API_BASE_URL

  const navigate = useNavigate()

  const [payment, setPayment] = useState([])
  const [searchItem, setSearchItem] = useState('')
  const [paginatedPayment, setpaginatedPayment] = useState([])
  const [currentPage, setcurrentPage] = useState(1)

  const [order, setOrder] = useState('ASC')
  // sorting tables
  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...paginatedPayment].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1,
      )
      setpaginatedPayment(sorted)
      setOrder('DSC')
    }
    if (order === 'DSC') {
      const sorted = [...paginatedPayment].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1,
      )
      setpaginatedPayment(sorted)
      setOrder('ASC')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('bike_token')
    if (token === null) {
      navigate('/login')
    }
    const options = {
      headers: {
        token: token,
      },
    }

    axios.get(`${baseURL}/payment/getall`, options).then((response) => {
      // console.log(response.data.data);
      setPayment(response.data.data)
      setpaginatedPayment(_(response.data.data).slice(0).take(pageSize).value())
    })
  }, [])

  const pageCount = payment ? Math.ceil(payment.length / pageSize) : 0
  // if(pageCount==1)return null;
  const pages = _.range(1, pageCount + 1)

  const Paginations = (pageNo) => {
    setcurrentPage(pageNo)
    const startIndex = (pageNo - 1) * pageSize
    const paginatedPayments = _(payment)
      .slice(startIndex)
      .take(pageSize)
      .value()
    setpaginatedPayment(paginatedPayments)
  }

  return (
    <>
      <div class="main-content">
        <Header />
        <div
          class="header pt-7"
          Style="background-image: url(images/bg.jpg); background-size: cover; background-position: center center;"
        >
          <span class="mask bg-gradient-dark opacity-7"></span>
          <div class="container-fluid">
            <div class="header-body">
              <div class="row align-items-center py-4 pb-7">
                <div class="col-lg-6 col-7">
                  <h6 class="h2 text-white d-inline-block mb-0">Payments</h6>
                  <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                    <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                      <li class="breadcrumb-item text-white">
                        <Link to="/dashboard">
                          <i class="fa fa-home text-primary"></i>
                        </Link>
                      </li>
                      <li class="breadcrumb-item active text-white">
                        Payments
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Page content --> */}
        <div
          class="container-fluid mt--6 mrgn"
          Style="background-image: url(images/bg.jpg); background-size: cover; background-position: center center;"
        >
          <div class="row" style={{ 'padding-bottom': '2rem' }}>
            <div class="col">
              <div class="card">
                <div class="card-header algn">
                  <h3 class="mb-0">Payments Table</h3>
                  <div style={{ "width": "50%", "display": "inline-flex", "align-items": "center", "justify-content": "space-evenly" }} className="algn">
                  <input
                    type="text"
                    placeholder="search..."
                    className="form-control"
                    style={{ width: '70%' }}
                    onChange={(e) => setSearchItem(e.target.value)}
                  />
                  <div style={{ "margin-left": "5px" }}>
                    <DownloadTableExcel
                      filename="Payments_table"
                      sheet="Payments"
                      currentTableRef={tableRef.current}
                    >
                     <button style={{"color": "black","background": "#9e9e9e"}}> Export excel </button>
                    </DownloadTableExcel>
                  </div>
                  </div>

                  {/* <Link to="/createnew" class="btn btn-sm btn-primary float-right mt--4"><i class="fa fa-plus mr-1"></i> New</Link> */}
                </div>

                <div class="table-responsive">
                  <table
                    class="table dataTable align-items-center table-flush"
                    id="dataTableReport"
                    ref={tableRef}
                  >
                    <thead class="thead-light">
                      <tr>
                        <th class="sort" scope="col">
                          #
                        </th>
                        <th class="sort" scope="col">
                          id
                        </th>
                        <th
                          class="sorting_asc"
                          scope="col"
                          onClick={() => sorting('orderId')}
                        >
                          Order_ID
                        </th>
                        <th
                          class="sorting_asc"
                          scope="col"
                          onClick={() => sorting('booking_id')}
                        >
                          Booking_ID
                        </th>
                        <th
                          class="sorting_asc"
                          scope="col"
                          onClick={() => sorting('user_id')}
                        >
                          User_ID
                        </th>
                        <th
                          class="sorting_asc"
                          scope="col"
                          onClick={() => sorting('service_provider_id')}
                        >
                          Dealer_ID
                        </th>
                        <th class="sort" scope="col">
                          Order Amount
                        </th>
                        <th
                          class="sorting_asc"
                          scope="col"
                          onClick={() => sorting('payment_type')}
                        >
                          Payment Type
                        </th>
                        <th
                          class="sorting_asc"
                          scope="col"
                          onClick={() => sorting('order_status')}
                        >
                          Order Status
                        </th>
                        <th class="sort" scope="col">
                          CashFree Order_id
                        </th>
                        <th class="sort" scope="col">
                          CashFree Order Token
                        </th>
                        {/* <th class="sort" scope="col">Action</th> */}
                        <th></th>
                      </tr>
                    </thead>
                    <tbody class="list">
                      {paginatedPayment
                        .filter((val) => {
                          if (searchItem === '') {
                            return val
                          } else if (
                            val._id.includes(searchItem) ||
                            val.order_status
                              .toLowerCase()
                              .includes(searchItem.toLowerCase()) ||
                            val.payment_type
                              .toLowerCase()
                              .includes(searchItem.toLowerCase()) ||
                            val.orderId.includes(searchItem) ||
                            val.booking_id.includes(searchItem) ||
                            val.dealer_id.includes(searchItem) ||
                            val.user_id.includes(searchItem)
                          ) {
                            return val
                          }
                        })
                        .map((data, i) => (
                          <tr>
                            <th>
                              {parseInt((currentPage - 1) * 10) + (i + 1)}
                            </th>
                            <td>{data._id}</td>
                            <td>{data.orderId}</td>
                            <td>{data.booking_id}</td>
                            <td>{data.user_id}</td>
                            <td>{data.dealer_id}</td>
                            <td>{data.orderAmount}</td>
                            <td style={{ 'text-transform': 'uppercase' }}>
                              {data.payment_type}
                            </td>
                            <td>
                              <span
                                class="badge badge-success"
                                style={
                                  data.order_status == 'PAID'
                                    ? { color: 'green' }
                                    : data.order_status == 'ACTIVE'
                                    ? {
                                        color: 'blue',
                                        'background-color': 'rgb(163 160 243)',
                                      }
                                    : {
                                        color: 'yellow',
                                        'background-color': 'red',
                                      }
                                }
                              >
                                {data.order_status}
                              </span>
                            </td>
                            {/* <td>
                            <span class="badge badge-success" style={data.payment_type=="cash"?{"color":"green"}:data.payment_type=="card"?{"color":"#57006c","background-color":"rgb(255 149 254 / 90%)"}:{"color":"#c75300","background-color":"rgb(0 237 255 / 40%)"}}>
                            {data.payment_type}
                            </span>
                          </td> */}
                            <td>{data?.cf_order_id}</td>
                            <td>{data.order_token}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <nav className="d-flex justify-content-center">
                    <ul class="pagination">
                      {pages.map((page) => (
                        <li
                          className={
                            page === currentPage
                              ? 'page-item active'
                              : 'page-item'
                          }
                          Style={
                            pageCount == 1 ? 'display:none' : 'display:flex'
                          }
                        >
                          <p
                            className="page-link"
                            onClick={() => Paginations(page)}
                          >
                            {page}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Payment

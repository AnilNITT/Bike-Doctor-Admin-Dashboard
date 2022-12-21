import { Link } from "react-router-dom";
import Footer from "../home/Footer";
import Header from "../home/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import _ from "lodash"

const pageSize = 10;
const Vendor = () => {

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  const navigate = useNavigate();

  const [vendor, setVendor] = useState([]);
  const [paginatedVendors,setpaginatedVendors] = useState([]);
  const [currentPage,setcurrentPage] = useState(1);
  const [searchItem, setSearchItem] = useState("");

  const [order,setOrder] = useState("ASC");
  // sorting tables
  const sorting = (col) =>{
    if(order === "ASC"){
      const sorted = [...paginatedVendors].sort((a,b)=>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1:-1
      )
      setpaginatedVendors(sorted);
      setOrder("DSC")
    }
    if(order === "DSC"){
      const sorted = [...paginatedVendors].sort((a,b)=>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1:-1
      )
      setpaginatedVendors(sorted);
      setOrder("ASC")
    }
  }


  useEffect(() => {
    const token = localStorage.getItem("bike_token");
    if (token === null) {
      navigate("/login");
    }
    const options = {
      headers: {
        token: token,
      },
    };

    axios.get(`${baseURL}/vendor/getAllVendors`, options).then((response) => {
      // console.log(response.data.data);
      setVendor(response.data.data);
      setpaginatedVendors(_(response.data.data).slice(0).take(pageSize).value());
    });
  }, []);


  const pageCount = vendor? Math.ceil(vendor.length/pageSize):0;
  // if(pageCount==1)return null;
  const pages = _.range(1,pageCount+1)

  const Paginations = (pageNo) =>{
    setcurrentPage(pageNo);
    const startIndex = (pageNo - 1 )* pageSize;
    const paginatedVendorss = _(vendor).slice(startIndex).take(pageSize).value();
    setpaginatedVendors(paginatedVendorss);
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
                  <h6 class="h2 text-white d-inline-block mb-0">Vendors</h6>
                  <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
                    <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                      <li class="breadcrumb-item text-white">
                        <Link to="/dashboard">
                          <i class="fa fa-home text-primary"></i>
                        </Link>
                      </li>
                      <li class="breadcrumb-item active text-white">Vendors</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Page content --> */}
        <div class="container-fluid mt--6 mrgn" Style="background-image: url(images/bg.jpg); background-size: cover; background-position: center center;">
          <div class="row" style={{"padding-bottom": "2rem"}}>
            <div class="col">
              <div class="card">
                <div class="card-header algn">
                  <h3 class="mb-0">Vendors Table</h3>
                  <input type="text" 
                  placeholder="search..." 
                  className="form-control" 
                  style={{"width":"40%"}}
                  onChange={(e)=>setSearchItem(e.target.value)}
                  />
                  {/* <Link to="/createnew" class="btn btn-sm btn-primary float-right mt--4"><i class="fa fa-plus mr-1"></i> New</Link> */}
                </div>

                <div class="table-responsive">
                  <table
                    class="table dataTable align-items-center table-flush"
                    id="dataTableReport"
                  >
                    <thead class="thead-light">
                      <tr>
                        <th class="sort" scope="col">
                          #
                        </th>
                        {/* <th class="sort" scope="col">
                          id
                        </th> */}
                        <th class="sort" scope="col">
                          Vendor ID
                        </th>
                        <th class="sorting_asc" scope="col" onClick={()=>sorting("name")}>
                          Name
                        </th>
                        <th class="sorting_asc" scope="col" onClick={()=>sorting("email")}>
                          Email
                        </th>
                        <th class="sort" scope="col">
                          Role
                        </th>
                        <th class="sort" scope="col">
                          Phone
                        </th>
                        <th class="sorting_asc" scope="col" onClick={()=>sorting("city")}>
                          City
                        </th>
                        <th class="sorting_asc" scope="col" onClick={()=>sorting("state")}>
                          State
                        </th>
                        <th class="sorting_asc" scope="col" onClick={()=>sorting("address")}>
                          Address
                        </th>
                        {/* <th class="sort" scope="col">Action</th> */}
                        <th></th>
                      </tr>
                    </thead>
                    <tbody class="list">
                      {paginatedVendors.filter((val)=>{
                          if(searchItem === ""){
                            return val;
                          } else if(
                            val.user_id.includes(searchItem) ||
                            val.name.toLowerCase().includes(searchItem.toLowerCase()) ||
                            val.email.includes(searchItem) ||
                            val.phone.toString().includes(searchItem.toString()) ||
                            val.city.toLowerCase().includes(searchItem.toLowerCase()) ||
                            val.state.toLowerCase().includes(searchItem.toLowerCase()) ||
                            val.address.toLowerCase().includes(searchItem.toLowerCase())
                          ){
                            return val;
                          }
                        }).map((data, i) => (
                        <tr>
                          <th>{parseInt((currentPage-1)*10)+(i+1)}</th>
                          {/* <td>{data._id}</td> */}
                          <td>{data.user_id}</td>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>
                            <span class="badge badge-success">
                              {data.user_type === 3 ? "dealer" : "employee"}
                            </span>
                          </td>
                          <td>{data.phone}</td>
                          <td>{data.city}</td>
                          <td>{data.state}</td>
                          <td>{data.address}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <nav className="d-flex justify-content-center">
                    <ul class="pagination">
                      {
                        pages.map((page)=>(
                          <li className={
                            page === currentPage ? "page-item active": "page-item"
                          }
                          Style={pageCount == 1 ? "display:none":"display:flex"}
                          >
                          <p className="page-link" onClick={()=>Paginations(page)}>{page}</p>
                          </li>
                        ))
                      }
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
  );
};

export default Vendor;

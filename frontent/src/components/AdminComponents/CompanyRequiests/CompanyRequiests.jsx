import React, { useEffect, useState, useMemo } from 'react';
import "./CompanyRequiests.css"
import axios from 'axios';
import collections from '../../../configurations/collections';

function CompanyRequiests() {
  const [companyRequiests, setCompanyReqiuests] = useState([]);
  const headers = useMemo(() => {
    return {
      'Authorization': window.localStorage.getItem("token")
    }
  }, [])
  useEffect(() => {
    axios.get(collections.server_base + "/admin", { headers }).then((res) => {
      setCompanyReqiuests(res.data.requests)
    })
  }, [headers])
  const handleAccept = (allow, email) => {
    axios.get(collections.server_base + "/admin/permission-company/" + email + "/" + allow, { headers })
    setCompanyReqiuests((products) => products.filter((request) => request.email !== email));
  }
  return (
    <div className='admin'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 adminhome-table-div'>
            <table className=" table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Mail</th>
                  <th scope="col">Website</th>
                  <th scope="col">location</th>
                  <th scope="col">categories</th>
                  <th scope="col">Options</th>
                </tr>
              </thead>
              <tbody>
                {
                  companyRequiests.map((request, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{request.companyName}</td>
                      <td>{request.email}</td>
                      <td>{request.website}</td>
                      <td>{request.location}</td>
                      <td>{request.categories}</td>
                      <td>
                        <svg onClick={() => { handleAccept(false, request.email) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="admin-compony-request-table-cross-svg bi bi-x-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                        </svg>
                        <svg onClick={() => { handleAccept(true, request.email) }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="admin-compony-request-table-tick-svg bi bi-check-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                      </td>
                    </tr>

                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRequiests;

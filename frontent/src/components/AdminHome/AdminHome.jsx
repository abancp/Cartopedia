import React from 'react';
import axios from 'axios';
import collections from '../../config/collections';

function AdminHome() {
    const headers = { 'Authorization': window.localStorage.getItem("token") }
    axios.get(collections.server_base+"/admin", { headers })
  return (
    <div>
      <h1>Admin Panel</h1>
    </div>
  );
};

export default AdminHome;

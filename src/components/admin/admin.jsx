import React, { Component } from 'react'
import './css/admin.css';
import AdminNavbar from './adminNavbar';

const Admin =()=> {
    return (
      <div>
        <AdminNavbar />
        <div className="container" id='admin-container'>
            <div className="row">
                <h1>Admin Paneline Hoşgeldiniz</h1>
            </div>
        </div>
      </div>
    )
  }



export default Admin;
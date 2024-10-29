import React, { useState, useEffect } from 'react';
import '../css/navbar.css';
import { Link } from 'react-router-dom';

const AdminNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token'); 
      setIsLoggedIn(false); 
      window.location.href = '/'; 
    } catch (error) {
      console.error('Çıkış yapılırken bir hata oluştu:', error);
    }
  };

  return (
    <div className='container-fluid' id='navbar'>
      <div className="row" id='nav-row'>
        <div className="col-lg-2 col-md-6 col-sm-6 col-8">
          <Link to="/" id='logo-a'>
            <img id='logo-nav' className='img-fluid' src="https://thumbs.dreamstime.com/b/perfume-logo-design-can-be-used-as-sign-icon-symbol-full-layered-vector-easy-to-edit-customize-size-color-compatible-224273861.jpg" alt="" />
            <span>Parfumes</span>
          </Link>
        </div>
        <div className="col-lg-8 lg-nav-item">
          <div className="row link-row">
            <div className="col"><Link className='nav-link-a' to="/admin">Anasayfa</Link></div>
            <div className="col"><Link className='nav-link-a' to="/admin/parfumler">Parfümler</Link></div>
            <div className="col"><Link className='nav-link-a' to="/admin/bloglar">Bloglar</Link></div>
            <div className="col"><Link className='nav-link-a' to="/admin/kullanicilar">Kullanıcılar</Link></div>
          </div>
        </div>
        <div className="col-lg-2 lg-nav-item">

          <button className='cikis-btn' onClick={handleLogout}>Çıkış Yap</button>
        </div>
        <div className="col-md-6 col-sm-6 col-4" id='btn-hidden'>
          <button className="btn btn-outline-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            <i className='fa-solid fa-bars'></i>
          </button>

          <div className="offcanvas offcanvas-end" data-bs-scroll="true" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <img className='img-fluid' id='sidebar-img' src="https://images.pexels.com/photos/12563411/pexels-photo-12563411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="sidebar" />
            <div className="offcanvas-header" id='sidebar-header'>
              <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Menü</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body sidebar-body" style={{ padding: '0' }}>
              <div className="item1"><Link className='sidebar-link-a' to="/admin">Anasayfa</Link></div>
              <div className="item1"><Link className='sidebar-link-a' to="/admin/parfumler">Parfümler</Link></div>
              <div className="item1"><Link className='sidebar-link-a' to="/admin/bloglar">Bloglar</Link></div>
              <div className="item1"><Link className='sidebar-link-a' to="/admin/kullanicilar">Kullanıcılar</Link></div>
              <div className="item1"><button className='cikis-btn sidebar-link-a' onClick={handleLogout}>Çıkış Yap</button></div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNavbar;

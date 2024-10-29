import React, { Component, useState } from 'react'
import AdminNavbar from './adminNavbar';
import './css/admin-parfumler.css';  

const adminkullanicilar=()=>{
  const [showAlert, setShowAlert] = useState(false);


  const alertGoster = () => {
    setShowAlert(true);
    document.body.style.overflow = 'hidden';
  };

  const alertKapat = async () => {
    try {
      const response = await fetch('http://46.31.77.157:8080/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verify: alertInput }),
      });

      if (response.ok) {
        console.log('Verification successful');
      } else {
        console.log('Verification failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setShowAlert(false);
    document.body.style.overflow = 'visible';
  };

    return (
      <div>
        <AdminNavbar />
        <div className="container" id='admin-parfumler-container'>
        <h2>Kullanıcılar</h2>
        <div className="row">
            <div className="col-12">
              <button id='parfum-ekle-btn' onClick={alertGoster} >Kullanıcı Ekle</button>
              <div className="admin-urun-card">
                <div className="row admin-urun-card-row">
                  <div className="col-lg-3 col-md-12 col-sm-12">
                    <p className='urun-ismi'>İsim Soyisim</p>
                  </div>
                  <div className="col-lg-4 col-md-12 col-sm-12">
                  <p className='urun-ismi'>Kullanıcı Adı</p>
                  </div>
                  <div className="col-lg-3 col-md-12 col-sm-12">
                  <p className='urun-ismi'>Mail</p>
                  </div>
                  <div className="col-lg-2 col-md-12 col-sm-12 btn-flex">
                    <button className='delete-btn'>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      {showAlert && (
        <div id="alertKutusu" className="alert-visible">
          <div className="alertIcerik">
            <span className="kapatButonu" onClick={() => setShowAlert(false)}>&times;</span>

            <form className="container-fluid" id='admin-alert-flex'>
              



              <button type='submit'>Onayla</button>


            </form>



          </div>
        </div>
      )}
      </div>
    )
  }


export default adminkullanicilar;
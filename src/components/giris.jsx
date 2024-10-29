import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import './css/giris.css';

const Giris = () => {
  const [formData, setFormData] = useState({
    userFirstName: '',
    userLastName: '',
    email: '',
    userPassword: '',
    userName: '',
    role: 'user',
  });
  const [formData2, setFormData2] = useState({
    email: '',
    userPassword: '',
  });
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertInput, setAlertInput] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
    console.log('Token:', token);
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChange2 = (e) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://46.31.77.157:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log('User registered successfully');
        setFormData({
          userFirstName: '',
          userLastName: '',
          email: '',
          userPassword: '',
          userName: '',
          role: 'user',
        });
        setIsLoginForm(true); // Switch to login form after successful registration
        setShowAlert(true); // Show alert after successful registration
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://46.31.77.157:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData2),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log('User logged in successfully');
        console.log(data.token);
        setFormData2({
          email: '',
          userPassword: '',
        });
        navigate('/'); // Redirect to home after successful login
        window.location.reload();

      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
      <Navbar />
      <div className='giris-bg'>
        <div className="container" id="container-giris">
          <div className="row" id='giris-row'>
            <div className="col-lg-6" id='giris-col-1'>
              {isLoginForm ? (
                <form id="form-1" onSubmit={handleLoginSubmit}>
                  <div className='button-row'>
                    <button type="button" className={isLoginForm ? 'active-button' : ''} onClick={() => setIsLoginForm(true)}>Giriş Yap</button>
                    <button type="button" id='kayit-btn-gecis' onClick={() => setIsLoginForm(false)}>Kayıt Ol</button>
                  </div>
                  <div className="form-grup">
                    <label htmlFor="email2">Email</label>
                    <input type="text" id="email2" name="email" onChange={handleChange2} value={formData2.email} />
                  </div>
                  <div className="form-grup">
                    <label htmlFor="userPassword2">Parola</label>
                    <input type="password" id="userPassword2" name="userPassword" onChange={handleChange2} value={formData2.userPassword} />
                  </div>
                  <button type="submit" className="form-btn">Giriş Yap</button>
                </form>
              ) : (
                <form id="form-2" onSubmit={handleRegisterSubmit}>
                  <div className='button-row'>
                    <button type="button" id='giris-btn-gecis' onClick={() => setIsLoginForm(true)}>Giriş Yap</button>
                    <button type="button" className={!isLoginForm ? 'active-button' : ''} onClick={() => setIsLoginForm(false)}>Kayıt Ol</button>
                  </div>
                  <div className="form-group2">
                    <div className="form-grup3">
                      <label htmlFor="userFirstName">Adı</label>
                      <input type="text" id="userFirstName" name="userFirstName" onChange={handleChange} value={formData.userFirstName} />
                    </div>
                    <div className="form-grup3">
                      <label htmlFor="userLastName">Soyadı</label>
                      <input type="text" id="userLastName" name="userLastName" onChange={handleChange} value={formData.userLastName} />
                    </div>
                  </div>
                  <div className="form-grup">
                    <label htmlFor="userName">Kullanıcı Adı</label>
                    <input type="text" id="userName" name="userName" onChange={handleChange} value={formData.userName} />
                  </div>
                  <div className="form-grup">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" onChange={handleChange} value={formData.email} />
                  </div>
                  <div className="form-grup">
                    <label htmlFor="userPassword">Parola</label>
                    <input type="password" id="userPassword" name="userPassword" onChange={handleChange} value={formData.userPassword} />
                  </div>
                  <button type="submit" className="form-btn">Kayıt Ol</button>
                </form>
              )}
            </div>
            <div className="col-lg-6" id='giris-col-2'>
              <img
                src="https://img.freepik.com/free-photo/closeup-shot-beautifully-shaped-glass-bottles-filled-with-perfume_181624-28370.jpg?t=st=1716717286~exp=1716720886~hmac=54f8040e1bc4d920eafe98755d520213f184071480ab03bf2a0a5a1e3c71daad&w=1380"
                id="giris-bg"
                className="img-fluid w-100 giris-img"
                alt="bg"
              />
            </div>
          </div>
        </div>
        {showAlert && (
          <div id="alertKutusu" className="alert-visible">
            <div className="alertIcerik">
              <span className="kapatButonu" onClick={() => setShowAlert(false)}>&times;</span>
              <h2>Mail Adresinize İlettiğimiz Kodu Onaylayın</h2>
              <input
                id='alert-input'
                type="text"
                placeholder='Doğrulama Kodu'
                value={alertInput}
                onChange={(e) => setAlertInput(e.target.value)}
              />
              <button onClick={alertKapat}>Onayla</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Giris;

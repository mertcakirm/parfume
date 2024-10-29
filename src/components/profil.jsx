import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import './css/profil.css';

const Profil = () => {
  const [userData, setUserData] = useState({
    username: '',
    userFirstName: '',
    userLastName: '',
    email: '',
  });

  const [favoritePerfumes, setFavoritePerfumes] = useState([]);
  const [favoriteBlogs, setFavoriteBlogs] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://46.31.77.157:8080/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUserData({
          username: response.data.username,
          userFirstName: response.data.userFirstName,
          userLastName: response.data.userLastName,
          email: response.data.email
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchFavoritePerfumes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://46.31.77.157:8080/user/all-favorite-perfume', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFavoritePerfumes(response.data);
      } catch (error) {
        console.error('Error fetching favorite perfumes:', error);
      }
    };

    const fetchFavoriteBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://46.31.77.157:8080/user/all-favorite-blog', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFavoriteBlogs(response.data);
      } catch (error) {
        console.error('Error fetching favorite blogs:', error);
      }
    };

    fetchUserData();
    fetchFavoritePerfumes();
    fetchFavoriteBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container profil-container">
        <div className="row">
          <div className="col-12">
            <div className='row' id='profil-bilgiler-row'>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <h2>Kullanıcı Bilgileri</h2><br />
                <p>Adı: {userData.userFirstName}</p>
                <p>Soyadı: {userData.userLastName}</p>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <h2>İletişim Bilgileri</h2><br />
                <p>Email: {userData.email}</p>
                <p>Kullanıcı Adı: {userData.username}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row" id='accordion-row'>
          <div className="col-12">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Bilgileri Düzenle
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <form action="/" className='bilgileri-duzenle-form'>
                      <div className='bilgileri-duzenle-parent'>
                        <div className='bilgileri-duzenle-child'>
                          <label htmlFor="isim">Adı</label>
                          <input type="text" id='isim' defaultValue={userData.userFirstName} />
                        </div>
                        <div className='bilgileri-duzenle-child'>
                          <label htmlFor="soyisim">Soyadı</label>
                          <input type="text" id='soyisim' defaultValue={userData.userLastName} />
                        </div>
                        <div className='bilgileri-duzenle-child'>
                          <label htmlFor="email">E-mail</label>
                          <input type="text" id='email' defaultValue={userData.email} />
                        </div>
                        <div className='bilgileri-duzenle-child'>
                          <label htmlFor="kullaniciadi">Kullanıcı Adı</label>
                          <input type="text" id='kullaniciadi' defaultValue={userData.username} />
                        </div>
                      </div>
                      <button className='detayli-incele-btn2' type='submit'>Güncelle</button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Yapılan Yorumlar
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <div className="row">
                      <div className="col-lg-3">
                        <div className='yorum-yapan-card-profil'>
                        <div className="yorum-yapan-derece-profil"></div>
                        <div className="yorum-yapan-comment-profil"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Favorilerim
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <h3>Favori Parfümler</h3><br />
                    {favoritePerfumes.length === 0 ? (
                      <p>Favori listeniz boş.</p>
                    ) : (
                      <div className="row">
                        {favoritePerfumes.map((perfume, index) => (
                          <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                            <div className='urunler-cards-parent'>
                              <div className="urun-card">
                                <img
                                  src={`data:${perfume.perfumeImages.type};base64,${perfume.perfumeImages.imageByte}`}
                                  className="img-fluid w-100 slick-img"
                                  alt={perfume.perfumeName}
                                />
                                <p style={{ width: '100%', textAlign: 'center' }}>{perfume.perfumeBrand.perfumeBrand}</p>
                                <h5 style={{ width: '100%', textAlign: 'center' }}>{perfume.perfumeName}</h5>
                                <button className='detayli-incele-btn'>
                                  <Link className='detayli-incele-btn-a' to={`/parfumler/${perfume.id}`}>
                                    Detaylı İncele
                                  </Link>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <br /><h3>Favori Bloglar</h3><br />
                    {favoriteBlogs.length === 0 ? (
                      <p>Favori blog listeniz boş.</p>
                    ) : (
                      <div className="row">
                        {favoriteBlogs.map((blog, index) => (
                          // <div className="col-lg-6 col-md-12 col-sm-12" key={index}>
                          //   <div className='urunler-cards-parent'>
                          //     <div className="urun-card">
                          //       <img
                          //         src={`data:${blog.blogImage.type};base64,${blog.blogImage.imageByte}`}
                          //         className="img-fluid w-100 slick-img"
                          //         alt={blog.blogTitle}
                          //       />
                          //       <h5 style={{ width: '100%', textAlign: 'center' }}>{blog.blogTitle}</h5>
                          //       <button className='detayli-incele-btn'>
                          //         <Link className='detayli-incele-btn-a' to={`/bloglar/${blog.id}`}>
                          //           Detaylı İncele
                          //         </Link>
                          //       </button>
                          //     </div>
                          //   </div>
                          // </div>



                          <div key={index} className='col-lg-3 col-md-4 col-sm-6 col-12'>
                          <div className="blog-card">
                            <img 
                              src={`data:${blog.blogImages.type};base64,${blog.blogImages.imageByte}`} 
                              className="img-fluid w-100 blog-img" 
                              alt=""
                            />
                            <div className='blog-card-content'>
                              <h5>{blog.caption}</h5>
                              <button className='detayli-incele-btn'>
                                <Link className='detayli-incele-btn-a' to={`/blog/${blog.id}`}>
                                  Detaylı İncele
                                </Link>
                              </button>
                            </div>
                          </div>  
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profil;

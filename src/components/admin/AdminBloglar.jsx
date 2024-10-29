import React, { useState } from 'react';
import AdminNavbar from './adminNavbar';
import './css/admin-parfumler.css';  
import axios from 'axios';

const AdminBloglar = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setBlogData({
      ...blogData,
      image: e.target.files[0],
    });
  };

  const alertGoster = () => {
    setShowAlert(true);
    document.body.style.overflow = 'hidden';
  };

  const alertKapat = () => {
    setShowAlert(false);
    document.body.style.overflow = 'visible';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('content', blogData.content);
    formData.append('image', blogData.image);

    try {
      const response = await axios.post('http://46.31.77.157:8080/blog/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('Blog posted successfully');
        // Reset the form data
        setBlogData({ title: '', content: '', image: null });
        alertKapat();
      } else {
        console.log('Failed to post blog');
      }
    } catch (error) {
      console.error('Error posting blog:', error);
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container" id='admin-parfumler-container'>
        <h2>Bloglar</h2>
        <div className="row">
          <div className="col-12">
            <button id='parfum-ekle-btn' onClick={alertGoster}>Blog Ekle</button>
            <div className="admin-urun-card">
              <div className="row admin-urun-card-row">
                <div className="col-lg-5 col-md-12 col-sm-12">
                  <img src="" alt="Blog resmi" />
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12">
                  <p className='urun-ismi'>Başlık</p>
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
            <span className="kapatButonu" onClick={alertKapat}>&times;</span>
            <form className="container-fluid" id='admin-alert-flex' onSubmit={handleSubmit}>
              <label htmlFor="admin-blog-baslik">Başlık</label>
              <input 
                type="text" 
                id='admin-blog-baslik' 
                name="title" 
                value={blogData.title} 
                onChange={handleInputChange} 
              />
              <label htmlFor="admin-blog-content">Metin</label>
              <textarea 
                name="content" 
                id="admin-blog-content" 
                value={blogData.content} 
                onChange={handleInputChange}
              ></textarea>
              <label htmlFor="resim">Resim</label>
              <input 
                type="file" 
                id='resim' 
                name="image" 
                onChange={handleImageChange} 
              />
              <button type='submit'>Onayla</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBloglar;

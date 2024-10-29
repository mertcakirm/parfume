import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import './css/blog-detay.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Blog_detay = () => {
  const [item, setItem] = useState(null);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://46.31.77.157:8080/blog/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching the blog data', error);
      }
    };

    const fetchFeaturedBlogs = async () => {
      try {
        const response = await axios.get('http://46.31.77.157:8080/blog/all');
        const blogs = response.data;
        const filteredBlogs = blogs.filter(blog => blog.inMenu === true);
        setFeaturedBlogs(filteredBlogs);
      } catch (error) {
        console.error('Error fetching featured blogs', error);
      }
    };

    fetchData();
    fetchFeaturedBlogs();
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container" id="blog-detay-container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12" id='blog-col-1'>
            <img src={`data:${item.blogImages.type};base64,${item.blogImages.imageByte}`} alt={item.caption} className="img-fluid w-100" />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12" id='blog-col-2'>
            <div className="blog-content-sticky">
              <div className="blog-datetime">{item.dateTime}</div>
              <div className='flex-between'>
                <p id="blog-brand">{item.caption}</p>
              </div>
              <p id="blog-content">{item.text}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" id='one-cikan-blog'>
        <h2>Öne Çıkan Bloglar</h2>
        <div className="row blog-row">
          {featuredBlogs.map(blog => (
            <div key={blog.id} className="col-lg-3 col-md-6 col-sm-12">
              <div className="blog-card-en">
                <img id='blog-img-en' src={`data:${blog.blogImages.type};base64,${blog.blogImages.imageByte}`} alt={blog.caption} className="img-fluid w-100" />
                <div className="blog-card-content-en">
                  <h5 className="card-title">{blog.caption}</h5>
                  <button className='detayli-incele-btn-en'>
                    <Link className='detayli-incele-btn-a-en' to={`/blog/${blog.id}`}>Detaylı İncele</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog_detay;




  // const addFavorite = async () => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     alert('Favorilere eklemek için lütfen giriş yapın.');
  //     return;
  //   }
    
  //   try {
  //     await axios.post('http://192.168.1.184:8080/blog/favorite', 
  //       { perfumeId: Number(id) },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     alert('Favorilere eklendi!');
  //   } catch (error) {
  //     console.error('Favori ekleme hatası:', error);
  //     alert('Favori ekleme işlemi başarısız oldu.');
  //   }
  // };

                {/* <button id='fav-ekle-blog' onClick={addFavorite}><i className="fa-solid fa-heart"></i></button> */}

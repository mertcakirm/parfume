import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import './css/blog.css';
import Header from './img/blog-header2.jpg';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Assuming you want 8 blogs per page

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://46.31.77.157:8080/blog/all');
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          console.error('Failed to fetch blogs');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBlogs();
  }, []);

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = blogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  // Handle page change
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar />

      <div className='container-fluid' id='header'>
        <img id='header-img' className='img-fluid w-100' src={Header} alt="deneme" />
      </div>

      <div className="container" id='blog-container' style={{ marginTop: '50px' }}>
        <p className='blog-baslik'>Bloglarımız</p>
        <div className="row blog-row">
          {currentItems.map((item, index) => (
            <div key={index} className='col-lg-3 col-md-4 col-sm-6 col-12'>
              <div className="blog-card">
                <img 
                  src={`data:${item.blogImages.type};base64,${item.blogImages.imageByte}`} 
                  className="img-fluid w-100 blog-img" 
                  alt=""
                />
                <div className='blog-card-content'>
                  <h5>{item.caption}</h5>
                  <button className='detayli-incele-btn'>
                    <Link className='detayli-incele-btn-a' to={`/blog/${item.id}`}>
                      Detaylı İncele
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <nav aria-label="Page navigation example" id='page-flex'>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <Link className="page-link" to="#" aria-label="Previous" onClick={() => handleClick(currentPage - 1)}>
                <span aria-hidden="true">&laquo;</span>
              </Link>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <Link className="page-link" to="#" onClick={() => handleClick(index + 1)}>{index + 1}</Link>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <Link className="page-link" to="#" aria-label="Next" onClick={() => handleClick(currentPage + 1)}>
                <span aria-hidden="true">&raquo;</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;

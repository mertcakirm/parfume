import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './css/urun-detay.css';
import Navbar from './navbar';
import Footer from './footer';

const Urun_detay = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 6;
  const [text, setText] = useState('');
  const [point, setPoint] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://46.31.77.157:8080/perfume/${id}`);
        setItem(response.data);
        setComments(response.data.perfumeComment);
      } catch (error) {
        console.error('Error fetching the perfume data', error);
      }
    };
    fetchData();
  }, [id]);

  const addFavorite = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Favorilere eklemek için lütfen giriş yapın.');
      return;
    }

    try {
      await axios.post('http://46.31.77.157:8080/perfume/favorite', 
        { perfumeId: Number(id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Favorilere eklendi!');
    } catch (error) {
      console.error('Favori ekleme hatası:', error);
      alert('Favori ekleme işlemi başarısız oldu.');
    }
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(comments.length / commentsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Yorum yapabilmek için lütfen giriş yapın.');
      return;
    }

    const newComment = {
      text,
      point,
      perfumeId: id
    };

    try {
      await axios.post('http://46.31.77.157:8080/comment/add', newComment, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Yorum başarıyla eklendi!');
      setComments([...comments, newComment]); 
      setText('');  
      setPoint(1);  
      window.location.reload();
    } catch (error) {
      console.error('Yorum ekleme hatası:', error);
      alert('Yorum ekleme işlemi başarısız oldu.');
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="container" id="urun-detay-container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12" id='urun-col-1'>
            <img src={`data:${item.perfumeImages.type};base64,${item.perfumeImages.imageByte}`} alt={item.perfumeName} className="img-fluid w-100 urun-detay-img" />
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="urun-content-sticky">
              <p id="parfume-name">{item.perfumeName}</p>
              <div className='flex-between'>
                <p id="parfume-brand">{item.perfumeBrand.perfumeBrand}</p>
                <button id='fav-ekle' onClick={addFavorite}><i className="fa-solid fa-heart"></i></button>
              </div>
              <p id="parfume-content">{item.metin}</p>
              <div className='nota-bolumu'>
                <div id="parfume-notalar-flex">
                  <div className="parfume-nota-item">
                    <h3 className='nota-item-baslik'>Üst Notalar</h3>
                    {item.productContentHigh.map((nota) => (
                      <div key={nota.id}>
                        <img className='nota-img' src={`data:${nota.contentImages.type};base64,${nota.contentImages.imageByte}`} alt={nota.content} />
                        <p className='nota-isim'>{nota.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="parfume-nota-item">
                    <h3 className='nota-item-baslik'>Orta Notalar</h3>
                    {item.productContentMid.map((nota) => (
                      <div key={nota.id}>
                        <img className='nota-img' src={`data:${nota.contentImages.type};base64,${nota.contentImages.imageByte}`} alt={nota.content} />
                        <p className='nota-isim'>{nota.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="parfume-nota-item">
                    <h3 className='nota-item-baslik'>Alt Notalar</h3>
                    {item.productContentLow.map((nota) => (
                      <div key={nota.id}>
                        <img className='nota-img' src={`data:${nota.contentImages.type};base64,${nota.contentImages.imageByte}`} alt={nota.content} />
                        <p className='nota-isim'>{nota.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='total-star-flex'>
                <i className='fa-solid fa-star stars'></i>
                <i className='fa-solid fa-star stars'></i>
                <i className='fa-solid fa-star stars'></i>
                <i className='fa-solid fa-star stars'></i>
                <i className='fa-solid fa-star stars'></i>
              </div>
              <div className='total-puan'>
                <p>{item.perfumeRating}/10</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row" id='yorumlar-row'>
          <div className="col-lg-4 col-md-12 col-sm-12" id='yorumlar-col-1'>
            <form id='yorumlar-form' onSubmit={handleSubmit}>
              <p>Sen de parfüm hakkındaki görüşlerini paylaş</p>
              <div className='puanlama-yap'>
                <select
                  name="puann"
                  id="puan"
                  value={point}
                  onChange={(e) => setPoint(Number(e.target.value))}
                >
                  {[...Array(10).keys()].map(i => (
                    <option key={i+1} value={i+1}>{i+1}</option>
                  ))}
                </select>
                <p className='puan-ver-sag'>/10</p>
              </div>
              <textarea
                name="yorum"
                id="yorum-txta"
                placeholder='Görüşleriniz...'
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button type="submit">Paylaş</button>
            </form>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div className="row" id='yapilan-yorumlar-row'>
              {currentComments.map((comment, index) => (
                <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                  <div className="yorum-card">
                    <p className='yorum-yapan-isim'>{comment.userName}</p>
                    <p className="verilen-puan">{comment.point}/10</p>
                    <p className='yazilan-gorus'>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <nav aria-label="Page navigation example" id='pagi-nav'>
              <ul className="pagination">
                <li className="page-item">
                  <button className="page-link" onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                {pageNumbers.map(number => (
                  <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                    <button onClick={() => handleClick(number)} className="page-link">
                      {number}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button className="page-link" onClick={() => handleClick(currentPage + 1)} disabled={currentPage === pageNumbers.length} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Urun_detay;

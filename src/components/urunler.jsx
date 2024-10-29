import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import './css/urunler.css';
import Header from './img/urun-header3.jpg';
import { Link } from 'react-router-dom';

const Urunler = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [urunlerItem, setUrunlerItem] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [markaList, setMarkaList] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [selectedMarkalar, setSelectedMarkalar] = useState([]);
  const [selectedNotalar, setSelectedNotalar] = useState([]);
  const [selectedSex, setSelectedSex] = useState(''); 
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://46.31.77.157:8080/perfume/all');
        const data = await response.json();
        setUrunlerItem(data);
        setFilteredItems(data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await fetch('http://46.31.77.157:8080/brand/all');
        const data = await response.json();
        setMarkaList(data);
      } catch (error) {
        console.error('Error fetching brands', error);
      }
    };

    const fetchContent = async () => {
      try {
        const response = await fetch('http://46.31.77.157:8080/content/all');
        const data = await response.json();
        setContentList(data);
      } catch (error) {
        console.error('Error fetching content', error);
      }
    };

    fetchData();
    fetchBrands();
    fetchContent();
  }, []);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleClick = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
  };

  const handleMarkaChange = (marka) => {
    const index = selectedMarkalar.indexOf(marka);
    if (index > -1) {
      setSelectedMarkalar(selectedMarkalar.filter((item) => item !== marka));
    } else {
      setSelectedMarkalar([...selectedMarkalar, marka]);
    }
  };

  const handleContentChange = (content) => {
    const index = selectedNotalar.indexOf(content);
    if (index > -1) {
      setSelectedNotalar(selectedNotalar.filter((item) => item !== content));
    } else {
      setSelectedNotalar([...selectedNotalar, content]);
    }
  };

  const handleSexChange = (sex) => {
    setSelectedSex(sex);
  };

  const handleFilterApply = () => {
    let filtered = [...urunlerItem];

    if (selectedMarkalar.length > 0) {
      filtered = filtered.filter((item) => selectedMarkalar.includes(item.perfumeBrand.perfumeBrand));
    }

    if (selectedNotalar.length > 0) {
      filtered = filtered.filter((item) => {
        return item.perfumeContent && item.perfumeContent.some((content) => selectedNotalar.includes(content.content));
      });
    }

    if (selectedSex !== '') {
      filtered = filtered.filter((item) => item.sex === selectedSex);
    }

    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    handleFilterApply(); 
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  if (searchTerm.trim() !== '') {
    currentItems = currentItems.filter((item) => {
      return (
        item.perfumeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.perfumeBrand.perfumeBrand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  return (
    <div>
      <Navbar />
      <div className='container-fluid' id='header'>
        <img id='header-img' className='img-fluid w-100' src={Header} alt="deneme" />
      </div>

      <div className="container" id='urunler-buttons-container'>
        <div className="row" id='kategori-flex-row'>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <button className="btn" id='kategori-btn' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">Kategoriler</button>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Kategoriler</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div className="offcanvas-body">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        Cinsiyet
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <div className='form-flex'>
                          <input
                            type="checkbox"
                            id='erkek'
                            onChange={() => handleSexChange('Erkek')}
                            checked={selectedSex === 'Erkek'}
                          />
                          <label htmlFor="erkek">Erkek</label>
                        </div>
                        <div className='form-flex'>
                          <input
                            type="checkbox"
                            id='kadin'
                            onChange={() => handleSexChange('Kadın')}
                            checked={selectedSex === 'Kadın'}
                          />
                          <label htmlFor="kadin">Kadın</label>
                        </div>
                        <div className='form-flex'>
                          <input
                            type="checkbox"
                            id='ikisi'
                            onChange={() => handleSexChange('Unisex')}
                            checked={selectedSex === 'Unisex'}
                          />
                          <label htmlFor="ikisi">Unisex</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Marka
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        {markaList.map((item, index) => (
                          <div className='form-flex' key={index}>
                            <input
                              type="checkbox"
                              id={`marka-${index}`}
                              onChange={() => handleMarkaChange(item.perfumeBrand)}
                              checked={selectedMarkalar.includes(item.perfumeBrand)}
                            />
                            <label htmlFor={`marka-${index}`}>{item.perfumeBrand}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        Notalar
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        {contentList.map((content, index) => (
                          <div className="form-flex" key={index}>
                            <input
                              type="checkbox"
                              id={content.content}
                              onChange={() => handleContentChange(content.content)}
                              checked={selectedNotalar.includes(content.content)}
                            />
                            <label htmlFor={content.content}>{content.content}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <button id='filtre-btn' type='button' onClick={handleFilterApply}>
                  Filtreyi Uygula
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-4 col-sm-12">
            <form className="form-inline" onSubmit={handleSearchSubmit}>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Parfüm Ara"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />

            </form>
          </div>
        </div>
      </div>

      <div className="container" id='urunler-containers'>
        <div className="row" id='urunler-cards-row'>
          <h2>Parfümler</h2>
          {currentItems.length === 0 ? (
            <p style={{ textAlign: 'center', width: '100%' }}>Arama kriterinize uygun parfüm bulunamadı.</p>
          ) : (
            currentItems.map((item, index) => (
              <div className="col-lg-3 col-md-6 col-sm-12" key={index}>
                <div className='urunler-cards-parent'>
                  <div className="urun-card">
                    <img
                      src={`data:${item.perfumeImages.type};base64,${item.perfumeImages.imageByte}`}
                      className="img-fluid w-100 slick-img"
                      alt={item.perfumeName}
                    />
                    <p style={{ width: '100%', textAlign: 'center' }}>{item.perfumeBrand.perfumeBrand}</p>

                    <h5 style={{ width: '100%', textAlign: 'center' }}>{item.perfumeName}</h5>
                    <button className='detayli-incele-btn'>
                      <Link className='detayli-incele-btn-a' to={`/parfumler/${item.id}`}>
                        Detaylı İncele
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          <nav aria-label="Page navigation example" id='page-flex'>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <Link className="page-link" to="#" aria-label="Previous" onClick={(e) => handleClick(e, currentPage - 1)}>
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <Link className="page-link" to="#" onClick={(e) => handleClick(e, index + 1)}>
                    {index + 1}
                  </Link>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <Link className="page-link" to="#" aria-label="Next" onClick={(e) => handleClick(e, currentPage + 1)}>
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Urunler;

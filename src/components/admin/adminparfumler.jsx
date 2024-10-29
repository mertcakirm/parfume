import React, { useEffect, useState } from 'react';
import AdminNavbar from './adminNavbar';
import './css/admin-parfumler.css';

const AdminParfumler = () => {
  const [urunlerItem, setUrunlerItem] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [notalar, setNotalar] = useState([]);
  const [selectedUstNotalar, setSelectedUstNotalar] = useState([]);
  const [selectedOrtaNotalar, setSelectedOrtaNotalar] = useState([]);
  const [selectedAltNotalar, setSelectedAltNotalar] = useState([]);

  const [formData, setFormData] = useState({
    perfumeName: '',
    perfumeBrand: '',
    sex: 'Unisex',
    perfumeImages: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://46.31.77.157:8080/perfume/all');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUrunlerItem(data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    const fetchNotalar = async () => {
      try {
        const response = await fetch('http://46.31.77.157:8080/content/all');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNotalar(data);
      } catch (error) {
        console.error('Error fetching notalar', error);
      }
    };

    fetchData();
    fetchNotalar();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData({ ...formData, [id]: files[0] });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    switch (name) {
      case 'ustNota':
        setSelectedUstNotalar(prevState => {
          if (checked) {
            return [...prevState, value];
          } else {
            return prevState.filter(nota => nota !== value);
          }
        });
        break;
      case 'ortaNota':
        setSelectedOrtaNotalar(prevState => {
          if (checked) {
            return [...prevState, value];
          } else {
            return prevState.filter(nota => nota !== value);
          }
        });
        break;
      case 'altNota':
        setSelectedAltNotalar(prevState => {
          if (checked) {
            return [...prevState, value];
          } else {
            return prevState.filter(nota => nota !== value);
          }
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('perfumeName', formData.perfumeName);
    formDataToSend.append('perfumeBrand', formData.perfumeBrand);
    formDataToSend.append('sex', formData.sex);
    formDataToSend.append('perfumeImages', formData.perfumeImages);

    selectedUstNotalar.forEach(nota => formDataToSend.append('ustNotalar', nota));
    selectedOrtaNotalar.forEach(nota => formDataToSend.append('ortaNotalar', nota));
    selectedAltNotalar.forEach(nota => formDataToSend.append('altNotalar', nota));

    try {
      const response = await fetch('http://46.31.77.157:8080/perfume/add', {
        method: 'POST',
        body: formDataToSend
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Handle success (e.g., show success message, update state, etc.)
      setFormData({
        perfumeName: '',
        perfumeBrand: '',
        sex: 'Unisex',
        perfumeImages: null
      });
      setSelectedUstNotalar([]);
      setSelectedOrtaNotalar([]);
      setSelectedAltNotalar([]);
      alertKapat();
      fetchData(); // Optional: Fetch updated data after successful submission
    } catch (error) {
      console.error('Error adding perfume:', error);
      // Handle error (e.g., show error message)
    }
  };

  const alertGoster = () => {
    setShowAlert(true);
    document.body.style.overflow = 'hidden';
  };

  const alertKapat = () => {
    setShowAlert(false);
    document.body.style.overflow = 'visible';
  };

  return (
    <div>
      <AdminNavbar />
      <div className="container" id='admin-parfumler-container'>
        <h2>Parfümler</h2>
        <div className="row">
          <div className="col-12">
            <button id='parfum-ekle-btn' onClick={alertGoster}>Parfüm Ekle</button>
            {urunlerItem.map((item, index) => (
              <div className="admin-urun-card" key={index}>
                <div className="row admin-urun-card-row">
                  <div className="col-lg-5 col-md-12 col-sm-12">
                    <img className='img-fluid w-100' style={{ height: '100px', objectFit: 'contain' }} src={`data:${item.perfumeImages.type};base64,${item.perfumeImages.imageByte}`} alt="parfüm resmi" />
                  </div>
                  <div className="col-lg-5 col-md-12 col-sm-12">
                    <p className='urun-ismi'>{item.perfumeBrand.perfumeBrand} , {item.perfumeName}</p>
                  </div>
                  <div className="col-lg-2 col-md-12 col-sm-12 btn-flex">
                    <button className='delete-btn'>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAlert && (
        <div id="alertKutusu" className="alert-visible">
          <div className="alertIcerik">
            <span className="kapatButonu" onClick={alertKapat}>&times;</span>
            <form className="container-fluid" id='admin-alert-flex' onSubmit={handleSubmit}>
              <div className='admin-alert-flex-isim'>
                <label htmlFor="perfumeName">Parfüm Adı</label>
                <input type="text" id='perfumeName' value={formData.perfumeName} onChange={handleInputChange} required />
                <label htmlFor="perfumeBrand">Marka</label>
                <input type="text" id='perfumeBrand' value={formData.perfumeBrand} onChange={handleInputChange} required />
              </div>
              <br />

              <label htmlFor="sex">Cinsiyet</label>
              <select id="sex" value={formData.sex} onChange={handleInputChange} required>
                <option value="Unisex">Unisex</option>
                <option value="Erkek">Erkek</option>
                <option value="Kadın">Kadın</option>
              </select>

              <label htmlFor="perfumeImages">Resim</label>
              <input type="file" id='perfumeImages' onChange={handleFileChange} required />

              <div className="notalar-container">
                <div className="notalar-section-parent">
                  <div className="notalar-section">
                    <h4>Üst Nota</h4>
                    {notalar.map(nota => (
                      <div key={nota.id}>
                        <input
                          type="checkbox"
                          id={`ustNota-${nota.id}`}
                          name="ustNota"
                          value={nota.content}
                          checked={selectedUstNotalar.includes(nota.content)}
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor={`ustNota-${nota.id}`}>{nota.content}</label>
                      </div>
                    ))}
                  </div>

                  <div className="notalar-section">
                    <h4>Orta Nota</h4>
                    {notalar.map(nota => (
                      <div key={nota.id}>
                        <input
                          type="checkbox"
                          id={`ortaNota-${nota.id}`}
                          name="ortaNota"
                          value={nota.content}
                          checked={selectedOrtaNotalar.includes(nota.content)}
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor={`ortaNota-${nota.id}`}>{nota.content}</label>
                      </div>
                    ))}
                  </div>

                  <div className="notalar-section">
                    <h4>Alt Nota</h4>
                    {notalar.map(nota => (
                      <div key={nota.id}>
                        <input
                          type="checkbox"
                          id={`altNota-${nota.id}`}
                          name="altNota"
                          value={nota.content}
                          checked={selectedAltNotalar.includes(nota.content)}
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor={`altNota-${nota.id}`}>{nota.content}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button type='submit'>Onayla</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminParfumler;

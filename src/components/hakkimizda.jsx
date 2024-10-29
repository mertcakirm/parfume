import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import './css/hakkimizda.css';
import girisImage from './img/giris3.jpg';
import hakkimizda_img from './img/bottle-perfume-with-gold-cap-front.jpg';

const Hakkimizda = () => {
    return (
        <div>
            <Navbar />
            <div className='container-fluid' id='header'>
                <img id='header-img' className='img-fluid w-100' src={girisImage} alt="deneme" /> 
            </div>

            <div className="container" id='cards-container'>
              <div className="row" id='cards-row'>
                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="card">
                    <div className="card-img">
                      <i className="fa-regular fa-user"></i>
                    </div>
                    <div className="card-content">Kullanıcıları Bilgiledirici İçerik</div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="card">
                    <div className="card-img">
                      <i className="fa-regular fa-comment"></i>
                    </div>
                    <div className="card-content">Anlaşılır Puanlama ve Değerlendirme</div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="card">
                    <div className="card-img">
                      <i className="fa-regular fa-folder-closed"></i>
                    </div>
                    <div className="card-content">Doğru ve Anlaşılır Bilgiler</div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6 col-sm-12">
                  <div className="card">
                    <div className="card-img">
                      <i className="fa-solid fa-lock"></i>
                    </div>
                    <div className="card-content">Güvenilir Hesap Koruması</div>
                  </div>
                </div>
              </div>
            </div>



            <div className="container" id='hakkimizda-container'>
              <div className="row">
              <div className="col-lg-6 col-md-12">
                <img src={hakkimizda_img} className='img-fluid w-100' alt="hakkimizda" />
              </div>
              <div className="col-lg-6 col-md-12">
                <div className="metin-card">
                    <div className='hakkimizda-baslik'>
                        <p>|</p><p>Biz Kimiz?</p>
                    </div>
                    <p className='hakkimizda-p'>Biz, parfüm tutkunlarını bir araya getiren, kaliteli ve özgün parfümleri erişilebilir kılan bir aileyiz. Misyonumuz, herkesin kişisel tarzını ve benliğini yansıtan, unutulmaz bir koku deneyimi sunmaktır. Müşterilerimize sadece parfüm satmakla kalmıyor, onlara özel hissettiren bir deneyim sunuyoruz.</p>
                    <p className='hakkimizda-p'>Yılların verdiği deneyim ve tutkuyla, parfüm dünyasının derinliklerine iniyor, en seçkin markaların en iyi ürünlerini sizin için bir araya getiriyoruz. İçtenlikle, dürüstlükle ve müşteri memnuniyeti odaklı bir yaklaşımla hareket ediyoruz. Siz değerli müşterilerimize, bizimle birlikte bu koku yolculuğunda eşlik ettiğiniz için minnettarız.</p>
                
                </div>
              </div>
              </div>
            </div>
            <Footer />
        </div>
    );
}

export default Hakkimizda;
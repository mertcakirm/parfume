import React, { useEffect, useState } from 'react';
import './css/anasayfa.css';
import Navbar from './navbar';
import Footer from './footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Anasayfa = () => {
  const [urunlerItem, setUrunlerItem] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const { id } = useParams();

  const carouselItems = [
    {
      imgUrl: 'https://images.pexels.com/photos/932577/pexels-photo-932577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Kokunla Tanın',
      description: 'Parfümler, kendine özgü ve çekici bir kokuya sahip. Esansındaki notalar, ferah ve etkileyici bir his verir.'
    },
    {
      imgUrl: 'https://images.pexels.com/photos/4248713/pexels-photo-4248713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Kokunla Tanın',
      description: 'Parfümler, kendine özgü ve çekici bir kokuya sahip. Esansındaki notalar, ferah ve etkileyici bir his verir.'
    },
    {
      imgUrl: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Kokunla Tanın',
      description: 'Parfümler, kendine özgü ve çekici bir kokuya sahip. Esansındaki notalar, ferah ve etkileyici bir his verir.'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://46.31.77.157:8080/perfume/all');
        const data = await response.json();
        setUrunlerItem(data);
      } catch (error) {
        console.error('Error fetching the data', error);
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

  const sliderSettings = {
    dots: false,
    className: "center",
    centerMode: true,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div>
      <Navbar />
      <div className="container-fluid" id='sayfa'>
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            {carouselItems.map((item, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to={index}
                className={index === 0 ? 'active' : ''}
                aria-current={index === 0 ? 'true' : 'false'}
                aria-label={`Slide ${index + 1}`}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {carouselItems.map((item, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={item.imgUrl} className="img-fluid w-100" alt={item.title} />
                <div className="carousel-caption d-none d-md-block" id='carousel-card'>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* urunler */}
      <div className="container" id='urunler-container'>
        <p className='urunler-baslik'>Ürünlerimiz</p>
        <div className="slider-container">
          <Slider {...sliderSettings}>
            {urunlerItem.map((item, index) => (
              <div key={index} className='urunler-card-parent'>
                <div className="urunler-card">
                  <img
                    src={`data:${item.perfumeImages.type};base64,${item.perfumeImages.imageByte}`}
                    className="img-fluid w-100 slick-img"
                    alt={item.perfumeName}
                  />
                  <h5>{item.perfumeName}</h5>
                  <button className='detayli-incele-btn'>
                    <Link className='detayli-incele-btn-a' to="#">Detaylı İncele</Link>
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <button className='urunler-btn'>
          <Link to="/parfumler" className='urunler-btn-a'>Tümünü Gör</Link>
        </button>
      </div>

      {/* hakkimizda */}
      <div id='hakkimizda-bg'>
        <div className="container-fluid" id="hakkimizda">
          <p className='urunler-baslik'>Hakkımızda</p>
          <div id="hakkimizda-child">
            <img src="https://images.pexels.com/photos/258244/pexels-photo-258244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <div id="hakkimizda-card">
              <p>Biz Kimiz?</p>
              <p>
                Biz, parfüm tutkunlarını bir araya getiren, kaliteli ve özgün parfümleri erişilebilir kılan bir aileyiz. Misyonumuz, herkesin kişisel tarzını ve benliğini yansıtan, unutulmaz bir koku deneyimi sunmaktır. Müşterilerimize sadece parfüm satmakla kalmıyor, 
                onlara özel hissettiren bir deneyim sunuyoruz. Yılların verdiği deneyim ve tutkuyla, parfüm dünyasının derinliklerine iniyor, en seçkin markaların en iyi ürünlerini sizin için bir araya getiriyoruz. İçtenlikle, dürüstlükle ve müşteri memnuniyeti odaklı bir yaklaşımla hareket ediyoruz. Siz değerli
                müşterilerimize, bizimle birlikte bu koku yolculuğunda eşlik ettiğiniz için minnettarız.
              </p>
              <button className='hakkimizda-btn'>
                <Link to="/hakkimizda" className='hakkimizda-btn-a'>Bizi Tanıyın <i className="fa-solid fa-arrow-right"></i></Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* blog */}
      <div className="container" id='one-cikan-blog'>
        <h2 className='urunler-baslik'>Blog</h2>
        <div className="row">
          {featuredBlogs.map(blog => (
            <div key={blog.id} className="col-lg-3 col-md-3 col-sm-12">
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
        <button className='urunler-btn'>
          <Link to="/blog" className='urunler-btn-a'>Tümünü Gör</Link>
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Anasayfa;

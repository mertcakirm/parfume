import React, { Component } from 'react';
import './css/footer.css';
import { Link } from 'react-router-dom';
const Footer=()=>{
    return (
      <div>
        <div className="container-fluid" id="footer">
        <div className="row">
        <div className="col-lg-4" id="footer-col4">
            <img src="https://thumbs.dreamstime.com/b/perfume-logo-design-can-be-used-as-sign-icon-symbol-full-layered-vector-easy-to-edit-customize-size-color-compatible-224273861.jpg" alt="" />
            <p >Kokunuzla Tanının!</p>
        </div>
        <div className="col-lg-8 ">
            <div className="row">
            <div className="col-lg-4">
                <div id="sosyal-row">
                    <p className='basliklar'>Sosyal Medya</p>
                    <div className="footer-sosyal">
                        <i className="fab fa-instagram" ></i><span>İnstagram</span>
                    </div>
                    <div className="footer-sosyal">
                        <i className="fab fa-facebook-f" ></i><span>Facebook</span>
                    </div>
                    <div className="footer-sosyal"> 
                        <i className="fab fa-twitter" ></i><span>Twitter</span>
                    </div>
                    <div className="footer-sosyal">
                        <i className="fab fa-linkedin-in" ></i><span>LinkedIn</span>
                    </div>
                    <div className="footer-sosyal">
                        <i className="fa-brands fa-youtube" ></i><span>Youtube</span>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="sayfalar-footer">
                    <p className='basliklar'>Sayfalar</p>
                    <li><Link to="/">Anasayfa</Link></li>
                    <li><Link to="/parfumler">Parfümler</Link></li>
                    <li><Link to="/hakkimizda">Hakkımızda</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="sayfalar-footer">
                    <p className='basliklar'>Bilgilendirmeler</p>
                    <li><Link to="#">Üyelik Sözleşmelesi</Link></li>
                    <li><Link to="#">KVKK Aydınlatma Metni</Link></li>
                    <li><Link to="#">Çerezler</Link></li>
                </div>
            </div>
        </div>
        </div>
        </div>
      </div>
      </div>
    )
  }


export default Footer;
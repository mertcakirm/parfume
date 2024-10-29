import { useState } from 'react';
import './components/css/app.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Anasayfa from './components/anasayfa';
import Hakkimizda from './components/hakkimizda';
import Urunler from './components/urunler';
import Blog from './components/blog';
import Giris from './components/giris';
import Urun_detay from './components/urun-detay';
import Blog_detay from './components/blog-detay';
import Profil from './components/profil';
import Admin from './components/admin/admin';
import AdminParfumler from './components/admin/adminparfumler';
import AdminBloglar from './components/admin/AdminBloglar';
import AdminKullanicilar from './components/admin/adminkullanicilar';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Anasayfa />} />
          <Route path='/hakkimizda' element={<Hakkimizda />} />
          <Route path='/parfumler' element={<Urunler />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/girisyap' element={<Giris />} />
          <Route path='/parfumler/:id' element={<Urun_detay />} />
          <Route path='/blog/:id' element={<Blog_detay />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/parfumler' element={<AdminParfumler />} />
          <Route path='/admin/bloglar' element={<AdminBloglar />} />
          <Route path='/admin/kullanicilar' element={<AdminKullanicilar />} />
          <Route
            path='/profil'
            element={
              localStorage.getItem('token') ? <Profil /> : <Navigate to="/girisyap" />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

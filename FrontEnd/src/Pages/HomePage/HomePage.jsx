import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './HomePage.css'

import Banner from '../../Components/Banner/Banner'
import Promo from '../../Components/Promo/Promo'
import Services from '../../Components/Services/Services'
import Brands from '../../Components/Brands/Brands'
import Footer from '../../Components/Footer/Footer'
import PopularProducts from '../../Components/PopularProducts/PopularProducts'
import MostFeatured from '../../Components/MostFeatured/MostFeatured'
import Hero from '../../Components/Hero/Hero'
import NewArrivals from '../../Components/NewArrivels/NewArrivals'
import BrandStory from '../../Components/BrandStory/BrandStory'
import Editorial from '../../Components/Editorial/Editorial'
import VeloraStandard from '../../Components/VeloraStandard/VeloraStandard'

const HomePage = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('https://velora-ki1r.onrender.com/api/products')
      .then((res) => {
        setProducts(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <Hero />

<div className='home-top'>
  <Banner />
  <Promo />
</div>

<NewArrivals products={products} />

<Brands />

<BrandStory />



<MostFeatured products={products}/>

<PopularProducts products={products}/>

<Editorial />

<VeloraStandard/>

<Services/>


<Footer />
    </>
  )
}

export default HomePage;
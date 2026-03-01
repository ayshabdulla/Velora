import React from 'react'
import Marquee from 'react-fast-marquee'
import './Brands.css'

const fakeBranddata = [
    {
        id: 1,
        image:'Louis Vuitton.jpeg'
    },

    {
        id: 2,
        image:'fendi.jpeg'
    },

    {
        id: 3,
        image:'dior.jpeg'
    },

    {
        id: 4,
        image:'chanel.jpeg'
    },

    {
        id: 5,
        image:'Yves saint Laurent.jpeg'
    },

    {
        id: 6,
        image:'download (31).jpeg'
    },

    {
        id: 7,
        image:'Allen Solly.jpeg'
    },

    {
        id: 8,
        image:'download (44).jpeg'
    }

    
]

const Brands = () => {
  return (
   <div className='brands-container'>
  <h2 className="brands-title">TRUSTED BY ICONIC HOUSES</h2>

  <Marquee pauseOnHover speed={50} gradient={false}>
    {fakeBranddata.map((Brand) => {
      return (
        <img
          src={`/${Brand.image}`}
          key={Brand.id}
          className="marquee-image"
          alt="brand"
        />
      )
    })}
  </Marquee>
</div>
  )
}

export default Brands

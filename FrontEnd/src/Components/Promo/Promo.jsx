import React from 'react'
import './Promo.css'

const Promo = () => {
  return (
    <section className='promo-section'>
      <div className='promo-container'>

        <div className='promo-card'>
          <img src="Chanel 'Trendy CC' _ pinterest_ @Blancazh.jpeg" alt="Luxury Bag" />
          <div className='promo-overlay'>
            <h3>Timeless Elegance</h3>
          </div>
        </div>

        <div className='promo-card'>
          <img src="download (15).jpeg" alt="Luxury Bag" />
          <div className='promo-overlay'>
            <h3>Modern Classic</h3>
          </div>
        </div>

        <div className='promo-card'>
          <img src="download (17).jpeg" alt="Luxury Bag" />
          <div className='promo-overlay'>
            <h3>Statement Piece</h3>
          </div>
        </div>

        <div className='promo-card'>
          <img src="download (19).jpeg" alt="Luxury Bag" />
          <div className='promo-overlay'>
            <h3>Refined Luxury</h3>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Promo
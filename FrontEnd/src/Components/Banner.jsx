import HeroBanner from '../assets/Banner/banner.png';

function Banner() {
  return (
    <div>
      <div className="banner">
        <img src={HeroBanner} alt="Banner" className='banner-img' />
      </div>
    </div>
  )
}

export default Banner

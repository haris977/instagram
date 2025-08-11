import React from 'react'
import Profile from './Profile'
import NewsandInformation from './NewsandInformation'
import Feed from './Feed'
import Footer from './Footer'
const Home = () => {
  return (
    <div className='flex items-start justify-around  pt-8 '>
      <div className='bg-gray-700'>
        <Profile/>
      </div>
      <div className='bg-gray-700'>
        <Feed/>
      </div>
      <div className='bg-gray-700'>
        <NewsandInformation/>
      </div>
    </div >
  )
}

export default Home

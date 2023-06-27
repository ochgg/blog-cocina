import React from 'react'

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="container-fluid bg-secondary text-center text-light fixed-bottom mt-5">
      <span className='h7'>Desde MI Cocina &copy; {currentYear}</span>
    </footer>
  )
}

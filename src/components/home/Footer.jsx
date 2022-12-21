import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer class="footer">
        <div class="bottom_content">
          <section>
            <a href="https://www.linkedin.com/" target="blank">
              <i class="fa fa-linkedin"></i>
            </a>
            <a href="https://www.github.com/" target="blank">
              <i class="fa fa-github"></i>
            </a>
            <a href="https://instagram.com/" target="blank">
              <i class="fa fa-instagram"></i>
            </a>
            <a href="https://twitter.com/" target="blank">
              <i class="fa fa-twitter"></i>
            </a>
          </section>
        </div>
        <div class="copyright">Copyright © 2023 Bike_Doctor - All rights reserved</div>
      </footer>
    </>
  )
}

export default Footer

import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className='py-5 mt-5' style={{ backgroundColor: 'rgba(10, 25, 47, 0.95)', borderTop: '1px solid var(--glass-border)' }}>
      <Container>
        <Row>
          <Col md={6} className='mb-4'>
            <span className='h3' style={{ fontFamily: 'Orbitron, sans-serif', color: 'var(--accent-color)' }}>
              PRO<span style={{ color: 'var(--text-color)' }}>SHOP</span>
            </span>
            <p className='mt-3 text-muted' style={{ maxWidth: '300px' }}>
              Experience the best in modern eCommerce. Premium products, seamless shopping, and professional service.
            </p>
          </Col>
          <Col md={3} className='mb-4'>
            <h5 className='text-uppercase mb-3' style={{ color: 'var(--text-color)' }}>Customer Service</h5>
            <ul className='list-unstyled'>
              <li><a href='#' className='text-muted hover-accent'>Shipping Policy</a></li>
              <li><a href='#' className='text-muted hover-accent'>Return & Refund</a></li>
              <li><a href='#' className='text-muted hover-accent'>Privacy Policy</a></li>
            </ul>
          </Col>
          <Col md={3} className='mb-4'>
            <h5 className='text-uppercase mb-3' style={{ color: 'var(--text-color)' }}>Contact</h5>
            <ul className='list-unstyled text-muted'>
              <li>support@proshop.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </Col>
        </Row>
        <Row className='mt-4 pt-4 border-top border-secondary'>
          <Col className='text-center text-muted'>
            &copy; {new Date().getFullYear()} ProShop. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

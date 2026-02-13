import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='hero-section'>
            <div className='hero-overlay'></div>
            <Container className='h-100'>
                <Row className='h-100 align-items-center justify-content-center text-center'>
                    <Col md={10} lg={8} className='hero-content'>
                        <h1 className='hero-title'>
                            Welcome to <span className='text-accent'>ProShop</span>
                        </h1>
                        <p className='hero-text my-4'>
                            Discover the latest in technology and innovation.
                            We provide top-tier electronics for professionals and enthusiasts.
                        </p>
                        <div className='hero-buttons'>
                            <Button
                                variant='primary'
                                className='btn-hero me-3'
                                onClick={() => document.getElementById('products-grid').scrollIntoView({ behavior: 'smooth' })}
                            >
                                Shop Now
                            </Button>
                            <Button
                                variant='outline-light'
                                className='btn-hero-secondary'
                                as={Link}
                                to='/about'
                            >
                                Learn More
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Hero

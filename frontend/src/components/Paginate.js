import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  if (pages <= 1) return null

  const getPageUrl = (p) => {
    if (!isAdmin) {
      return keyword ? `/search/${keyword}/page/${p}` : `/page/${p}`
    } else {
      return `/admin/productlist/${p}`
    }
  }

  return (
    <Pagination className='justify-content-center my-4'>
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={getPageUrl(x + 1)}
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  )
}

export default Paginate

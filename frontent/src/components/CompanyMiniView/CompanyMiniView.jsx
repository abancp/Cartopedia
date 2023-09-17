import React from 'react'
import './CompanyMiniView.css'
import collections from '../../configurations/collections'
function CompanyMiniView(company) {
  return (
    <div className='CompanyMiniView'>
      <div className="companyMiniView-main">
        <div className="companyMiniView-profile">
          <img className='companyMiniview-profile-img' src={`${collections.server_base}/user-profiles/${company.comapanyId}.jpg`} alt='Company' />
        </div>
        <div className="companyMiniView-details">
          <h5 className='company-name'>{company.companyName}</h5>
          <h6 className='indreste-product-description'>{company.companySIte}</h6>
          </div>
        </div>
      </div>
      )
}

      export default CompanyMiniView

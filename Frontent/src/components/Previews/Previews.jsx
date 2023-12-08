import React from 'react'
import Preview from "../Preview/Preview"
import Button from '../Button/Button'
import { Link } from 'react-router-dom';
import collections from '../../configurations/collections';
import "./Previews.css"

function Previews(props) {
  return (
    <div className='Previews'>
      <Preview />
      <Preview />
      <Preview />
      <Preview />
    </div>
  )
}

export default Previews

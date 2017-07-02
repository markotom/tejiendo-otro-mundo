import React from 'react'
import { render } from 'react-dom'
import Gallery from './components/gallery'

import Rellax from 'rellax'
window.parallax = new Rellax('.parallax')

render(<Gallery />, document.getElementById('gallery'))

import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import Rellax from 'rellax'

/**
 * Gallery Component
 *
 * @class Gallery
 * @extends {Component}
 */
class Gallery extends Component {
  constructor (props) {
    super(props)

    this.state = {
      slides: [
        'http://www.guiamandalas.com.ar/wp-content/uploads/2016/02/6a00d8341bfb1653ef01b8d0f54737970c.png',
        'https://tejiendomalasana.files.wordpress.com/2013/12/tejiendo-malasac3b1a1.jpg',
        'http://oi64.tinypic.com/30vizc0.jpg'
      ],
      counter: 0
    }
  }

  componentDidMount () {
    let parallax = new Rellax('.gallery-content', { center: true, speed: -5 })

    let timer = setInterval(this.timer.bind(this), 10000)
    this.setState({ timer, parallax })
  }

  componentWillUnmount () {
    clearInterval(this.state.timer)
  }

  timer () {
    let counter = this.state.counter + 1
    counter = counter > this.state.slides.length - 1 ? 0 : counter
    this.setState({ counter })
  }

  render () {
    return (
      <div ref='parallax' className='gallery-content'>
        <CSSTransitionGroup
          transitionName='slide'
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
          transitionAppearTimeout={1500}
          transitionAppear>
          <div
            className='gallery-item'
            key={this.state.counter}>
            <img src={this.state.slides[this.state.counter]} alt='' />
          </div>
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default Gallery

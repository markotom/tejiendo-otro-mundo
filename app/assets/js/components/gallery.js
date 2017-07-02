import React, { Component } from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

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
        'http://oi64.tinypic.com/30vizc0.jpg'
      ],
      counter: 0
    }
  }

  componentDidMount () {
    let timer = setInterval(this.timer.bind(this), 10000)
    this.setState({ timer })
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
      <div className='gallery-content'>
        <CSSTransitionGroup
          transitionName='slide'
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
          transitionAppearTimeout={1500}
          transitionAppear>
          <div
            className='gallery-item'
            key={this.state.counter}
            style={{ backgroundImage: `url(${this.state.slides[this.state.counter]})` }}
          />
        </CSSTransitionGroup>
      </div>
    )
  }
}

export default Gallery

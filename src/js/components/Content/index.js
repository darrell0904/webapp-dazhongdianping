'use strict'

import React from 'react'
import styles from './index.scss'

class Content extends React.Component {
  render () {
    return (
      <div className={styles.root}>
        <h1>我是Content</h1>
      </div>
    )
  }
}

export default Content;
import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from "components/ui"

export default class MainLayout extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="content">
          <Outlet />
        </div>
      </>
    )
  }
}

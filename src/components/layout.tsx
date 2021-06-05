import React from "react"

const Layout = ({ children }) => {
    const windowAvailable = typeof window !== 'undefined';
    return (
    <>
        <main>{children}</main>
        {
            windowAvailable ? alert(window.location.pathname) : null
        }
    </>
  )
}

export default Layout

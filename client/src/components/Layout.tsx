 
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
    <NavBar />
    <Outlet />
    <Footer />
    </>
  )
}

import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import SignInPage from "./components/SignInPage/SignInPage"
import SignUpPage from "./components/SignUpPage/SignUpPage"
import HomePage from "./components/HomePage"

 

function App() {
   

  return (
    <>
    <NavBar/>
       <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />


       </Routes>
      
    </>
  )
}

export default App

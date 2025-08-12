import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import About from './components/about/About.jsx'
import Contact from './components/contact/Contact.jsx'
import Home from './components/home/Home.jsx'
import Details from './components/details/Details.jsx'
import Match from './components/match/Match.jsx'
import Chat from './components/chat/Chat.jsx'
import Talk from './components/Talk/Talk.jsx'
import Login from './components/login/Login.jsx'
import PersonalityCheck from './components/personalitycheck/personalitycheck.jsx'
import Error404 from './components/Error404/Error404.jsx'
import Cursor from './components/Cursor/Cursor.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout/>}>
        <Route path='' element={<Home />} />
        <Route path='details' element={<Details />} />
        <Route path='match' element={<Match/>}/>
        <Route path='chat' element={<Chat/>}/>
        <Route path='about' element={<About />} />
        <Route path='contact' element={<Contact />} />
        <Route path='Talk' element={<Talk />} />
        <Route path='login' element={<Login />} />
        <Route path='personality' element={<PersonalityCheck />} />
      </Route>
      <Route path='*' element={
        <>
          <Cursor />
          <Error404 />
        </>
      } />
    </>
  )
)

createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />
 
)

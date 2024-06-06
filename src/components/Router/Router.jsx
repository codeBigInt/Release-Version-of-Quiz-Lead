import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Routes, BrowserRouter } from 'react-router-dom'
import { navigation } from './navigation'
import Layout from '../../pages/Layout/Layout'
import NotFound from '../../pages/NotFound'
import QuizLayout from '../../pages/Layout/QuizLayout'
import AuthenticationField from '../../pages/AuthenticationField'
import { useSelector } from 'react-redux'
import Submission from '../../pages/Submission'
import SelectCourse from '../../pages/SelectCourse'
import Home from '../../pages/Home'


const BrowserRoutes = () => {
  const user = useSelector(state => state.user)
  const AppRoutes = navigation.map( r => {
    if(user.isAuthenticated && r.isPrivate){
      // if(r.isPrivate === true){
          return <Route path='/app' element = {<QuizLayout />}>
              <Route path={r.path} element = {r.element} />
            </Route>
      // }
    }else if(!r.isPrivate){
      // if(r.path !== '/'){
       return <Route path={r.path} element = {r.element} />
        
      // }
    }else return false
  })

  const routes = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element = {<Layout />}>
      {AppRoutes}

      <Route path='*' element = {<NotFound />} />
    </Route>
  ))

  return <RouterProvider router={routes} />
}

const Router = () => {
 return <BrowserRoutes />
}

export default Router

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { ThemeProvider } from '@/theme/ThemeProvider'
import { AuthProvider } from '@/auth/AuthProvider'
import RootLayout from '@/layouts/RootLayout'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import NotFound from '@/pages/NotFound'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Board from '@/pages/Board'
import PostNew from '@/pages/PostNew'
import PostDetail from '@/pages/PostDetail'
import PostEdit from '@/pages/PostEdit'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'services', element: <Services /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <Signup /> },
        { path: 'board', element: <Board /> },
        { path: 'board/new', element: <PostNew /> },
        { path: 'board/:id', element: <PostDetail /> },
        { path: 'board/:id/edit', element: <PostEdit /> },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  // Must match Vite `base` so routing works on GitHub Pages project path.
  { basename: '/company' },
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)

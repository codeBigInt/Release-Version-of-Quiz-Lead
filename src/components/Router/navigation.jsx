import Home from '../../pages/Home'
import AuthenticationField from '../../pages/AuthenticationField'
import Submission from '../../pages/Submission'
import ResetPassword from '../../pages/ResetPassword'
import SelectCourse from '../../pages/SelectCourse'
import AdminLogin from '../../pages/Admin/AdminLogin'
import AdminDashboard from '../../pages/Admin/AdminDashboard'

export const navigation = [
    {path: '/', element: <AuthenticationField />, isPrivate: false },
    {path: '/admin/login', element: <AdminLogin />, isPrivate: false },
    {path: '/admin/dashboard', element: <AdminDashboard />, isPrivate: false },
    {path: '/', element: <AuthenticationField />, isPrivate: false },
    {path: 'password-reset', element: <ResetPassword />, isPrivate: false },
    {path: 'select-course', element: <SelectCourse />, isPrivate: true },
    {path: 'quiz', element: <Home />, isPrivate: true },
    {path: 'submission', element: <Submission />, isPrivate: true }
]

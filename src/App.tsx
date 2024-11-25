// App.js
import { Routes, Route } from 'react-router-dom'
import Home from './pages/ResignationUserList'
import Layout from './Layout'
import HRQueriesCreate from './pages/hr/HRQueriesCreate'
import InitialOffBoarding from './pages/hr/InitialOffBoarding'
import NotFound from './components/NotFound'
import Dashboard from './pages/Dashboard'

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/hr/queries/create"
                    element={<HRQueriesCreate />}
                />
                <Route
                    path="/hr/offboarding"
                    element={<InitialOffBoarding />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    )
}

export default App

import Navbar from './components/ui/Navbar'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Navbar />
            <main>{children}</main>
        </div>
    )
}

export default Layout

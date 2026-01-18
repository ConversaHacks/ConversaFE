import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';

const Layout = () => {
    const location = useLocation();

    // Show bottom nav only on main screens (not detail pages)
    const showBottomNav = location.pathname === '/' ||
                          location.pathname === '/conversations' ||
                          location.pathname === '/people';

    return (
        <>
            <Outlet />
            {showBottomNav && <BottomNav />}
        </>
    );
};

export default Layout;

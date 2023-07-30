import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Outlet, redirect, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import SearchForm from '../components/SearchForm';
import Footer from '../components/siteInfo/Footer';

export async function searchAction({ request }) {
    const data = await request.formData();
    const { semester, branch } = Object.fromEntries(data);
    return redirect(`/search/${semester}/${branch}`);
}

const Search = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const sideNav = useRef();

    const [showNav, setShowNav] = useState(false);

    const handleNav = () => {
        setShowNav(!showNav);
        sideNav.current.animate([{ right: `${!showNav ? '0' : '-100vw'}` }], {
            fill: 'forwards',
            duration: 100,
        });
    };

    const handleRedirect = () => {
        navigate('/');
    };

    useEffect(() => {
        setShowNav(false);
        sideNav.current.animate([{ right: '-100vw' }], {
            fill: 'forwards',
            duration: 100,
        });
    }, [location, setShowNav]);

    return (
        <main>
            <nav>
                <div onClick={handleRedirect}>
                    <Logo type="navLogo" />
                </div>
                <div className="navIcon" onClick={handleNav}>
                    <Menu width={32} height={32} />
                </div>
            </nav>
            {!showNav && <Outlet />}
            <aside className="side-nav" ref={sideNav}>
                <nav>
                    <Logo type="navLogo" />
                    <div className="navIcon" onClick={handleNav}>
                        <X width={32} height={32} />
                    </div>
                </nav>
                <div className="search-wrapper">
                    <SearchForm />
                </div>
                <Footer />
            </aside>
        </main>
    );
};

export default Search;

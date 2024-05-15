import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import Busqueda from '@/Components/Busqueda';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import useCarritoStore from '../carritoStore';
import { useEffect } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


export default function Layout({ user, header, children, categorias }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const { cantidadArticulos } = useCarritoStore();
    const { actualizarCantidadArticulos } = useCarritoStore((state) => state);
    const { actualizarCantidadArticulosCookies } = useCarritoStore((state) => state);



    useEffect(() => {
        if(user){
            actualizarCantidadArticulos();
        }else{
            actualizarCantidadArticulosCookies();
        }
    }, [user]);

    return (
        <div className=" bg-white >">
            <nav className="bg-black fixed w-screen top-0 z-50">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex w-">
                            <div className="shrink-0 flex items-center pr-5">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 " />
                                </Link>
                            </div>
                            <div className="hidden xl:block">
                                <Busqueda categorias = {categorias}></Busqueda>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex hover:bg-gray-800">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    <p className="text-white" >Ranking</p>
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex hover:bg-gray-800">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    <p className="text-white">Configurador</p>
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex hover:bg-gray-800">
                                <NavLink href={route('articulo.index')} active={route().current('articulo.index')}>
                                    <p className="text-white">Tienda</p>
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex hover:bg-gray-800">
                                <NavLink href={route('carrito.index')} active={route().current('carrito.index')}>
                                <ShoppingCartIcon className='text-white'/>
                                   <p className='text-white'>{cantidadArticulos}</p>
                                </NavLink>
                            </div>
                            <div className="ms-3 relative">
                                {user ? (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                                >
                                                    {user.name}

                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('profile.show')}>Perfil</Dropdown.Link>
                                            <Dropdown.Link  href={route('logout')} method="post" as="button">
                                                Cerrar sesion
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                ) :
                                    <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex bg-white rounded-md hover:bg-gray-200 min-w-32 justify-center">
                                        <NavLink href={route('login')} active={route().current('login')}>
                                            <p className="text-black px-2 py-1" >Iniciar sesión</p>
                                        </NavLink>
                                    </div>
                                }
                            </div>

                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' md:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Ranking
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
                            Configurador
                        </ResponsiveNavLink>
                    </div>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('articulo.index')} active={route().current('articulo.index')}>
                            Tienda
                        </ResponsiveNavLink>
                    </div>

                    {user ? (

                        <div className="pt-4 pb-1 border-t border-gray-200">

                            <div className="px-4">
                                <div className="font-medium text-base text-gray-800">{user.name}</div>
                                <div className="font-medium text-sm text-gray-500">{user.email}</div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('carrito.index')}>Carrito</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('profile.show')}>Perfil</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Cerrar sesion
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    ) :
                        <div className="pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink href={route('login')} active={route().current('login')}>
                                Iniciar sesión
                            </ResponsiveNavLink>
                        </div>
                    }
                </div>
            </nav>
            <div className="xl:hidden pt-20">
                <Busqueda categorias = {categorias}></Busqueda>
            </div>


            {header && (
                <header className="bg-white ">
                    <div className="max-w-screen-2xl xl:pt-20  mx-auto py-6 px-4 sm:px-6 lg:px-8" >{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}

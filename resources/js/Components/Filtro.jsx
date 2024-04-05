import { Link } from '@inertiajs/react';

export default function Filtro({ active = false, classNameName = '', children, ...props }) {
    return (
        <>

            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="bg-black inline-flex items-center p-2  ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 fixed mt-60  top-0 left-0">
                <span className="sr-only">Filtros</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" className="pt-40 fixed top-0 left-0 z-50 w-64 h-50 transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <h2 className="font-bold text-2xl">Categorias</h2>
                    <fieldset>
                    <ul className="space-y-2 font-medium">
                        <li>
                            <spam htmlFor="" className=" items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">Componente</spam>
                            <input name="componente" type="radio" />
                        </li>
                        <li>
                            <label htmlFor="" className=" items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">Componente</label>
                            <input name="componente" type="radio" />

                        </li>
                        <li>
                            <label htmlFor="" className=" items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">Componente</label>
                            <input name="componente" type="radio" />

                        </li>
                        <li>
                            <label htmlFor="" className=" items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">Componente</label>
                            <input name="componente" type="radio" />

                        </li>
                        <li>
                            <label htmlFor="" className=" items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">Componente</label>
                            <input name="componente" type="radio" />

                        </li>
                        <li>
                            <label htmlFor="" className=" items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">Componente</label>
                            <input name="componente" type="radio" />

                        </li>
                        <li>
                            <label htmlFor="" className=" items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">Componente</label>
                            <input name="componente" type="radio" />


                        </li>
                    </ul>

                    </fieldset>
                </div>
            </aside>
        </>
    );
}

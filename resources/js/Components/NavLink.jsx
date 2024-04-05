import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-b-4 text-gray-900  rajdhani-medium '
                    : 'text-gray-900 rajdhani-medium') +
                className
            }
        >
            {children}
        </Link>
    );
}

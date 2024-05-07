import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from '../Pages/Profile/Partials/DeleteUserForm';
import UpdateAvatarForm from '../Pages/Profile/Partials/UpdateAvatarForm';
import UpdatePasswordForm from '../Pages/Profile/Partials/UpdatePasswordForm';
import LayoutLogueado from '@/Layouts/LayoutLogueado';
import Footer from '@/Layouts/Footer';
import UpdateProfileInformationForm from '../Pages/Profile/Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status, avatar, categorias }) {
    return (
        <>
            <Head title="Editar Usuario" />
            <div className="py-16 max-w-2xl xl:max-w-6xl">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="p-4 sm:p-8"
                        />
                    </div>
                    <div className="bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="p-4 sm:p-8" />
                    </div>
                    <div className="bg-white shadow sm:rounded-lg">
                        <UpdateAvatarForm
                            avatar={avatar}
                            status={status}
                            className="p-4 sm:p-8"
                            />
                    </div>

                    <div className="bg-white shadow sm:rounded-lg">
                        <DeleteUserForm className="p-4 sm:p-8" />
                    </div>
                </div>
            </div>
        </>
    );
}

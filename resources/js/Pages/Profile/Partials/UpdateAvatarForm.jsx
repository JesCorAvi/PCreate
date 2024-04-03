import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function UpdatePasswordForm({ className = '' }) {
    const fileInput = useRef();

    const { errors, post, processing, recentlySuccessful } = useForm();

    const updateAvatar = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('avatar', fileInput.current.files[0]);

        post(route('avatar.update'), {
            data: formData,
            preserveScroll: true,
            onSuccess: () => fileInput.current.value = '', // Clear the file input after successful upload
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Update Avatar</h2>
            </header>

            <form onSubmit={updateAvatar} className="mt-6 space-y-6">

                <div>
                    <InputLabel htmlFor="avatar" value="Select Avatar" />

                    <input
                        id="avatar"
                        name="avatar"
                        ref={fileInput}
                        type="file"
                        className="mt-1 block w-full"
                        accept="image/*"
                    />

                    <InputError message={errors.avatar} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Upload</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Avatar uploaded successfully.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}











/*
import { useRef } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';


export default function UpdateAvatarForm({ className = '' }) {
    const avatarInput = useRef();

    const {errors, put, reset, processing, recentlySuccessful } = useForm();

    const updateAvatar = (e) => {
        e.preventDefault();

        const file = avatarInput.current.files[0];
        console.log(file)
        if (file) {
            var formData = new FormData();
            formData.append('avatar', file);

            if (formData.has('avatar')) {
                console.log('El objeto FormData contiene el campo "avatar".');
            } else {
                console.log('El objeto FormData no contiene el campo "avatar".');
            }

            put(route('avatar.update'),{
                onSuccess: () => reset(),
            });
        } else {
            console.error('No file selected.');
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Cambiar avatar</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Añada una imagen con los siguentes formatos de no mas de 400kb: JPG, JPEG, PNG
                </p>
            </header>
            <form onSubmit={updateAvatar} className="mt-6 space-y-6" encType="multipart/form-data">
                <div>
                    <InputLabel htmlFor="avatar" value="Nuevo Avatar" />
                    <input
                        id="avatar"
                        name="avatar"
                        type="file"
                        className="mt-1 block w-full"
                        autoComplete="avatar"
                    />

                    <InputError message={errors.avatar} className="mt-2" />
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Guardar</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Guardado.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
*/

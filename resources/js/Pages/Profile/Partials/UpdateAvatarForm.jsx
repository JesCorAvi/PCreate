import React, { useState } from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react'

function UploadAvatar(avatar, className = '') {
    const { data, setData, post, progress, errors } = useForm({
        avatar: null
    })
    const [info, setInfo] = useState(<p className=" py-2 min-h-10"></p>)

    const [avatarUrl, setAvatarUrl] = useState(`/storage/uploads/avatar/${avatar.avatar}`);

    function handleFileChange(e) {
        const file = e.target.files[0];
        setAvatarUrl(URL.createObjectURL(file));
        setData('avatar', file);
        setInfo(<p className=" py-2 min-h-10"></p>);

    }

    function submit(e) {
        e.preventDefault()
        if (!data.avatar) {
            setInfo(<p className="text-orange-400 py-2 ">Este es su avatar actual, por favor seleccione una nueva imagen</p>);
            return;
        }
        post(`/avatar`, {
            _method: 'put',
            avatar: data.avatar,
        })
        setInfo(<p className="text-green-600 pt-2">Avatar cambiado con exito</p>);
    }

    return (

        <section className={className}>
            <div className='p-5'>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Cambiar Imagen de perfil</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Asegurate de que el archivo subido sea una imagen
                </p>
            </header>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className="mr-2 w-52 h-52">
                    <label htmlFor="avatar" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen de perfil</label>
                    <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="avatar" className="cursor-pointer block bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:hover:bg-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        {avatarUrl ? <img src={avatarUrl} alt="Imagen de perfil" className="w-full h-auto" /> : "Seleccionar imagen"}
                    </label>
                </div>
                {info}
                <InputError message={errors.avatar} className="mt-2" />
                <PrimaryButton type="submit">cambiar</PrimaryButton>
            </form>
            </div>
        </section>
    )
}

export default UploadAvatar;

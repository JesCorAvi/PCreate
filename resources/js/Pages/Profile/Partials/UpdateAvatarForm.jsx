import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react'


function UploadAvatar(avatar) {

    const { data, setData, post, progress, errors } = useForm({
        avatar: null
    })
    function handleFileChange(e) {
        setData('avatar', e.target.files[0])
    }

    function submit(e) {
        e.preventDefault()
        post(`/avatar`, {
            _method: 'put',
            avatar: data.avatar,
        })
    }

    return (
        <section>
            <h2 className="text-lg font-medium text-gray-900">Cambiar Imagen de perfil</h2>
            <br></br>
            <p className="mt-1 text-sm text-gray-600">
                Asegurate de que el archivo subido sea una imagen
            </p>
            <br></br>
            <form onSubmit={submit}>
                <img width="200px" height="200px" src={"http://127.0.0.1:8000/storage/uploads/avatar/" + avatar.avatar}></img>
                <br></br>
                <TextInput id="avatar" type="file" onChange={handleFileChange} ></TextInput>
                <InputError message={errors.avatar} className="mt-2" />
                <br></br>
                {progress && (
                    <progress value={progress.percentage} max="100">
                        {progress.percentage}%
                    </progress>
                )}
                <br></br>
                <PrimaryButton type="submit">cambiar</PrimaryButton>
            </form>
        </section>
    )
}
export default UploadAvatar;

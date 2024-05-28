import { useEffect, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [showPasswordHint, setShowPasswordHint] = useState(false);
    const togglePasswordHint = () => {
        setShowPasswordHint(!showPasswordHint);
    };

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const validateField = (name, value) => {
        let error;
        switch (name) {
            case 'password':
                error = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
                    ? ''
                    : 'La contraseña debe tener al menos una mayúscula, una minúscula, un número, un carácter especial y 8 caracteres';
                break;
            case 'password_confirmation':
                error = value === data.password
                    ? ''
                    : 'Las contraseñas no coinciden';
                break;
            default:
                error = '';
        }
        setValidationErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
        validateField(name, value);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (Object.values(validationErrors).some(error => error)) {
            return;
        }
        post(route('password.store'));
    };

    return (
        <GuestLayout>
            <Head title="Restablecer Contraseña" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        readOnly={true}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 relative flex items-center">
                <InputLabel htmlFor="password" value="Contraseña" />

                <Tooltip title="Al menos una mayúscula, un número, un carácter especial y 8 carácteres">
                        <HelpOutlineIcon
                            className={`text-gray-400 h-5 w-5 cursor-pointer ml-1 ${showPasswordHint ? 'text-gray-600' : ''}`}
                            onMouseEnter={togglePasswordHint}
                            onMouseLeave={togglePasswordHint}
                        />
                    </Tooltip>
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        isFocused={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <InputError message={errors.password || validationErrors.password} className="mt-2" />

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña" />

                    <TextInput
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />

                    <InputError message={errors.password_confirmation || validationErrors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Restablecer Contraseña
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

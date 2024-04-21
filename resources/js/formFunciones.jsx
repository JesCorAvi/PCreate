
    export const handleImagenChange = (event, key) => {
        const file = event.target.files[0];
        setImagenes({
            ...imagenes,
            [key]: URL.createObjectURL(file)
        });
        setData(key, file);
    };


    export const submit = (e) => {
        e.preventDefault();
        post(route('articulo.store', data))
    };
    export function validar(target)    {
        if (target.validity.valid) {
            target.classList.remove('border-red-500');

        } else {
            target.classList.add('border-red-500');
        }
    }

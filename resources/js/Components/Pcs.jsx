import Pc from "./Pc";
import { Head } from '@inertiajs/react';

export default function Pcs({ pcs }) {
    return (
        <>
            <div className=" min-h-screen w-11/12  xl:w-7/12">
                <Head title="Mis PC" />
                {pcs && pcs.length ? (
                    pcs.map((pc) => (
                        <div key={pc.id}>
                            <Pc
                                pc={pc}
                            />
                        </div>
                    ))
                ) : (
                    <h1 className='text-2xl font-semibold pt-40 p-10 text-center'>No hay Configuraciones</h1>
                )}
            </div>
        </>
    );
}

import { useForm } from 'react-hook-form';
import { Mail, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { toast } from 'sonner';
import { useAuthStore } from '../context/AuthContext';

function Login(){
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        //ativar alguma coisa para loading no button de submit

        api.post('/auth/login', data).then((res: any) => {

            const tokenJwt: string = res.data.accessToken;
            const refreshToken: string = res.data.refreshToken;
            const email: string = res.data.email;
            const userExternalId: string = res.data.userExternalId;

            useAuthStore.getState().login({
                token: tokenJwt,
                refreshToken: refreshToken,
                email: email,
                userExternalId: userExternalId
            })

            navigate("/home");
        }).catch((err: any) => {
            if(err.response.status === 404) toast.error(err.response.data.message);

            if(err.response.status === 401) toast.error(err.response.data.message);
        });
    };

    return(
        <div className="min-h-screen bg-[#252525] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#383838] rounded-xl shadow-2xl border border-[#4A4A4A] p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Bem-vindo</h1>
                    <p className="text-gray-400">Entre para gerenciar seus processos</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-2 mb-2">
                        <label className="text-sm font-medium text-gray-300 block">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input 
                            {...register('email', { 
                                required: 'Email é obrigatório',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Endereço de email inválido"
                                }
                            })}
                            type="email"
                            className="w-full pl-10 pr-4 py-3 bg-[#252525] border border-[#4A4A4A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                            placeholder="seu@email.com"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-400 text-xs mt-1">{errors.email.message as string}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 block">Senha</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input 
                            {...register('password', { required: 'Senha é obrigatória' })}
                            type="password"
                            className="w-full pl-10 pr-4 py-3 bg-[#252525] border border-[#4A4A4A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                            placeholder="........"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-400 text-xs mt-1">{errors.password.message as string}</p>
                        )}
                    </div>

                    <div className="pt-4">
                        <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'Entrar'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Não tem uma conta?{' '}
                
                    <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline">
                        Registre-se
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Login;
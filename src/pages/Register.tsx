import { Mail, Lock, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { toast } from 'sonner';

function Register(){
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
    
    const navigate = useNavigate();

    const password = watch('password');
    const email = watch('email');

    const onSubmit = async (data: any) => {

        //ativar alguma coisa para loading no button de submit

        api.post("/auth/register", data).then((res: any) => {
            const tokenJwt: string = res.data.accessToken;
            const refreshToken: string = res.data.refreshToken;
            const email: string = res.data.email;
            const userExternalId: string = res.data.userExternalId;

            localStorage.setItem("token", tokenJwt);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("email", email);
            localStorage.setItem("userExternalId", userExternalId);

            navigate("/home");

        }).catch((err: any) => {
            if(err.response.status === 409) toast.error(err.response.data.message);

            if(err.response.status === 401) toast.error(err.response.data.message);
        });
        
    };

    return(
        <div className="min-h-screen bg-[#252525] flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[#383838] rounded-xl shadow-2xl border border-[#4A4A4A] p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Criar Conta</h1>
                    <p className="text-gray-400">Junte-se para mapear seus processos</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 block">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input 
                                {...register("email", {
                                    required: "Email é obrigatório",
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
                            <label className="text-sm font-medium text-gray-300 block">Confirmar Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input 
                                {...register("confirmEmail", {
                                    required: "Confirmação é obrigatória",
                                    validate: (val: string) => val === email || 'Os emails não coincidem',
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
                            {errors.confirmEmail && (
                                <p className="text-red-400 text-xs mt-1">{errors.confirmEmail.message as string}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 block">Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input 
                                    {...register("password", {
                                        required: "Senha é obrigatória",
                                    })}
                                    type="password"
                                    className="w-full pl-9 pr-3 py-2.5 bg-[#252525] border border-[#4A4A4A] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                    placeholder="........"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-red-400 text-xs mt-1">{errors.password.message as string}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 block">Confirmar Senha</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <input 
                                    {...register("confirmPassword", {
                                        required: "Confirmação de senha é obrigatória",
                                        validate: (val: string) => val === password || 'As senhas não coincidem'
                                    })}
                                    type="password"
                                    className="w-full pl-9 pr-3 py-2.5 bg-[#252525] border border-[#4A4A4A] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                                    placeholder="........"
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message as string}</p>
                            )}
                        </div>
                    </div>
                    
                    <div className="pt-4">
                        <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'Criar Conta'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                    Já tem uma conta?{' '}
                    
                    <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline">
                        Faça login
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
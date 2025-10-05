import TabelaOfertas from '../components/TabelaOfertas';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { buscarOfertas, OfertaAPI } from '../services/ofertasService';

export default function ListaOfertas() {
    const navigate = useNavigate();
    const [ofertas, setOfertas] = useState<OfertaAPI[]>([]);
    const [carregando, setCarregando] = useState(true);


    useEffect(() => {
        const carregarOfertas = async () => {
            try {
                setCarregando(true);
                const dados = await buscarOfertas();
                setOfertas(dados);
            } catch (error) {
                console.error('Erro ao carregar ofertas:', error);
            } finally {
                setCarregando(false);
            }
        };

        carregarOfertas();
    }, []);
    return (
        <main className="w-full h-full bg-white">
            <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Minhas ofertas</h1>
                    <button
                        className="bg-[#1E90FF] text-white w-[133px] h-[40px] px-[16px] py-[8px] rounded-[20px] flex items-center justify-center gap-1 hover:bg-[#1E90FF] transition-colors"
                        onClick={() => navigate('/')}
                    >
                        <span className="w-4 h-4 flex items-center justify-center text-[16px] leading-none" aria-hidden>+</span>
                        <span className="text-[14px] leading-[100%] font-semibold text-white whitespace-nowrap">Nova oferta</span>
                    </button>
                </div>

                {/* Barra de busca e filtros - Responsiva */}
                <div className="flex flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Login de acesso..."
                            className="w-full h-[40px] pl-4 pr-10 rounded-full border border-[#E2E2E2] text-[#2E3D50] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-0"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <svg className="w-5 h-5 text-primary-02" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                    <button className="h-[40px] px-4 border border-[#E2E2E2] rounded-full flex items-center gap-2 bg-white w-auto justify-center text-[#6B7280]">
                        Filtros
                        <svg className="w-4 h-4 text-primary-02" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>


                <div className="md:bg-white md:rounded-lg md:shadow-sm md:border md:border-gray-200 md:p-6 p-0">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-[#2E3D50] hidden md:block">Todas ofertas</h2>
                    </div>

                    {carregando ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Carregando ofertas...</p>
                        </div>
                    ) : (
                        <TabelaOfertas ofertas={ofertas} />
                    )}
                </div>
            </div>
        </main>
    )
}

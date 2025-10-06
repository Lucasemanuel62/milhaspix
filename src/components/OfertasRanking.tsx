import { useState, useEffect } from 'react';
import { buscarRanking, RankingItem } from '../services/ofertasService';

interface PropsOfertasRanking {
    etapaAtual: number;
    mileValue?: number;
}

export default function OfertasRanking({ etapaAtual, mileValue = 16.50 }: PropsOfertasRanking) {
    const [rankingData, setRankingData] = useState<RankingItem[]>([]);
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState<string | null>(null);

    const MIN_VALUE = 14.00;
    const MAX_VALUE = 16.56;

    const isValidValue = (value: number) => {
        return value >= MIN_VALUE && value <= MAX_VALUE;
    };

    useEffect(() => {
        const carregarRanking = async () => {
            try {
                setCarregando(true);
                setErro(null);

                if (!isValidValue(mileValue)) {
                    setErro('-');
                    setRankingData([]);
                    return;
                }

                const dados = await buscarRanking(mileValue);
                setRankingData(dados);
            } catch (error) {
                console.error('Erro ao carregar ranking:', error);
                setErro('Insira um valor válido no campo "Valor a cada 1.000 milhas"');
            } finally {
                setCarregando(false);
            }
        };

        if (etapaAtual === 2) {
            carregarRanking();
        }
    }, [etapaAtual, mileValue]);

    return (
        <div className={`${etapaAtual === 2 ? 'block' : 'hidden'}`}>
            {/* Mobile: chips abaixo do campo de valor */}
            <div className="lg:hidden w-full">
                {carregando ? (
                    <div className="flex items-center gap-2 py-2">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-blue-600 font-medium text-sm">Carregando ranking...</p>
                    </div>
                ) : erro ? (
                    <div className="w-full flex items-center justify-center py-1">
                        <span className="px-4 py-2 rounded-lg border border-[#E2E2E2] text-sm font-medium text-gray-600 min-w-[56px] text-center bg-white">
                            {erro}
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {rankingData.map((item, index) => {
                            const isUser = item.description === 'essa será sua posição';
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    className={`inline-flex items-center h-[24px] px-[9px] rounded-[44px] border transition-colors ${isUser ? 'bg-teal-100 border-teal-400' : 'bg-white border-[#E2E2E2]'}`}
                                >
                                    {isUser && (
                                        <span className="font-dmsans font-medium text-[12px] leading-7 text-teal-700 mr-1">
                                            Você
                                        </span>
                                    )}
                                    <span className={`font-dmsans font-medium text-[12px] leading-7 ${isUser ? 'text-teal-700' : 'text-primary-02'}`}>{item.position}°</span>
                                    <span className={`ml-1 font-dmsans font-medium text-[12px] leading-7 ${isUser ? 'text-teal-700' : 'text-primary-02'}`}>
                                        R$ {item.mile_value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Desktop: lista lateral */}
            <div className={`hidden lg:block w-full lg:w-[248px] h-auto p-2`}>
                <h2 className="text-[#2E3D50] font-dmsans font-medium text-base leading-7 mb-4">Ranking das ofertas</h2>
                <div className="space-y-0 rounded-lg border border-[#E2E2E2]">
                    {carregando ? (
                        <div className="text-center py-6">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-blue-600 font-medium text-sm">Carregando ranking...</p>
                            </div>
                        </div>
                    ) : erro ? (
                        <div className="w-full h-[38.4px] border-b border-[#E2E2E2] last:border-b-0 pl-2 pr-4">
                            <div className="flex items-center justify-center h-full">
                                <p className="text-primary-02 font-medium text-sm">{erro}</p>
                            </div>
                        </div>
                    ) : (
                        rankingData.map((item, index) => {
                            const isUser = item.description === 'essa será sua posição';
                            return (
                                <div key={index} className="w-full h-[38.4px] border-b border-[#E2E2E2] last:border-b-0 pl-2 pr-4">
                                    <div className="flex justify-between items-center h-full">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[#1E90FF] font-dmsans font-medium text-sm leading-7">{item.position}°</span>
                                            <span className={`font-dmsans font-medium text-sm leading-7 ${isUser ? 'text-teal-600' : 'text-[#2E3D50]'}`}>
                                                R$ {item.mile_value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                        {isUser && (
                                            <span className="bg-teal-200 text-white text-xs px-3 py-1 rounded-full font-medium">Você</span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {etapaAtual === 3 && (
                <div className="hidden lg:block mt-4">
                    <p className="text-gray-600 text-sm mb-2">Receba até:</p>
                    <div className="bg-teal-100 rounded-lg p-3 flex items-center justify-between">
                        <span className="text-teal-700 font-medium">R$</span>
                        <span className="text-teal-700 font-semibold text-lg">24.325,23</span>
                    </div>
                </div>
            )}
        </div>
    )
}
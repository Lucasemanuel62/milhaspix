import { OfertaAPI } from '../services/ofertasService';
import azulImage from '../assets/ofertas-azul.png';
import smilesImage from '../assets/ofertas-smiles.png';


interface PropsTabelaOfertas {
    ofertas: OfertaAPI[];
}

export default function TabelaOfertas({ ofertas }: PropsTabelaOfertas) {
    // Garantir que ofertas seja sempre um array
    const ofertasValidas = Array.isArray(ofertas) ? ofertas : [];

    // Função para obter configuração baseada no programa
    const getProgramaConfig = (programa: string) => {
        switch (programa.toLowerCase()) {
            case 'smiles':
            case 'gol':
                return { imagem: smilesImage, alt: 'Smiles/Gol', cor: ' text-orange-500', containerPadding: 'p-1.5' };
            case 'tudo azul':
            case 'azul':
            case 'tudoazul':
            case 'azul linhas aéreas':
            case 'azul linhas aereas':
                return { imagem: azulImage, alt: 'Azul', cor: 'text-blue-500', containerPadding: 'p-0' };
            default:
                return { imagem: null, alt: programa, cor: 'text-gray-500', containerPadding: 'p-0' };
        }
    };

    // Função para obter cores baseadas no status
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'Ativa':
                return { cor: 'text-green-700', bgCor: 'bg-green-100', iconeCor: 'bg-green-500' };
            case 'Inativo':
                return { cor: 'text-red-700', bgCor: 'bg-red-100', iconeCor: 'bg-red-500' };
            case 'Em utilização':
                return { cor: 'text-white', bgCor: 'bg-blue-400', iconeCor: 'bg-blue-500' };
            default:
                return { cor: 'text-gray-700', bgCor: 'bg-gray-100', iconeCor: 'bg-gray-500' };
        }
    };

    // Formatar data
    const formatarData = (dataISO: string) => {
        const data = new Date(dataISO);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    // Formatar quantidade
    const formatarQuantidade = (quantidade: number) => {
        return quantidade.toLocaleString('pt-BR');
    };

    return (
        <>
            {/* Layout Mobile - Cards */}
            <div className="block md:hidden space-y-4">
                {ofertasValidas.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        Nenhuma oferta encontrada
                    </div>
                ) : (
                    ofertasValidas.map((oferta) => {
                        const programaConfig = getProgramaConfig(oferta.loyaltyProgram);
                        const statusConfig = getStatusConfig(oferta.offerStatus);

                        return (
                            <div key={oferta.offerId} className="bg-white rounded-xl shadow-sm border border-[#E2E2E2] p-4">
                                {/* Header do Card */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        {programaConfig.imagem ? (
                                            <div className={`w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center bg-white ${programaConfig.containerPadding}`}>
                                                <img
                                                    src={programaConfig.imagem}
                                                    alt={programaConfig.alt}
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-[40px] h-[40px] bg-orange-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">?</span>
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-1">
                                            <div className="font-medium text-gray-800">{oferta.loyaltyProgram}</div>
                                            <div className="font-medium text-[12px] leading-[100%] text-[#121212] text-center">{oferta.offerType}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className={`inline-flex items-center h-[24px] gap-2 px-3 rounded-full text-[12px] font-medium ${statusConfig.bgCor} ${statusConfig.cor}`}>
                                            <span className={`w-2 h-2 rounded-full ${statusConfig.iconeCor}`}></span>
                                            {oferta.offerStatus}
                                        </span>
                                        <div className="text-[10px] leading-[100%] font-medium text-[#6B7280]">{formatarData(oferta.createdAt)}</div>
                                    </div>
                                </div>

                                {/* Separador */}
                                <div className="border-t border-[#E2E2E2] mb-3"></div>

                                {/* Detalhes da Oferta */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#121212] text-sm font-medium">ID da oferta</span>
                                        <span className="text-[#121212] font-medium text-[12px] leading-[100%] text-right">{oferta.offerId}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#121212] text-sm font-medium">Login</span>
                                        <span className="text-[#121212] font-medium text-[12px] leading-[100%] text-right break-all whitespace-normal">{oferta.accountLogin}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#121212] text-sm font-medium">Milhas ofertadas</span>
                                        <span className="text-[#121212] font-medium text-[12px] leading-[100%] text-right">{formatarQuantidade(oferta.availableQuantity)}</span>
                                    </div>

                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Layout Desktop - Tabela */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-[#2E3D50]">Programa</th>
                            <th className="text-left py-3 px-4 font-semibold text-[#2E3D50]">Status</th>
                            <th className="text-left py-3 px-4 font-semibold text-[#2E3D50]">ID da oferta</th>
                            <th className="text-left py-3 px-4 font-semibold text-[#2E3D50]">Login</th>
                            <th className="text-left py-3 px-4 font-semibold text-[#2E3D50]">Milhas ofertadas</th>
                            <th className="text-left py-3 px-4 font-semibold text-[#2E3D50]">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ofertasValidas.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-500">
                                    Nenhuma oferta encontrada
                                </td>
                            </tr>
                        ) : (
                            ofertasValidas.map((oferta) => {
                                const programaConfig = getProgramaConfig(oferta.loyaltyProgram);
                                const statusConfig = getStatusConfig(oferta.offerStatus);

                                return (
                                    <tr key={oferta.offerId} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                {programaConfig.imagem ? (
                                                    <div className={`w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center bg-white ${programaConfig.containerPadding}`}>
                                                        <img
                                                            src={programaConfig.imagem}
                                                            alt={programaConfig.alt}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-[40px] h-[40px] bg-gray-500 rounded-full flex items-center justify-center">
                                                        <span className="text-white text-xs font-bold">?</span>
                                                    </div>
                                                )}
                                                <div className="w-[77px] flex flex-col gap-1 items-start">
                                                    <div className={`font-medium ${programaConfig.cor} text-center`}>{oferta.loyaltyProgram}</div>
                                                    <div className="font-medium text-[12px] leading-[100%] text-[#121212] text-center">{oferta.offerType}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 ${statusConfig.bgCor} ${statusConfig.cor} rounded-full text-sm`}>
                                                <div className={`w-2 h-2 ${statusConfig.iconeCor} rounded-full`}></div>
                                                {oferta.offerStatus}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-[#2E3D50]">{oferta.offerId}</td>
                                        <td className="py-4 px-4 text-[#2E3D50]">{oferta.accountLogin}</td>
                                        <td className="py-4 px-4 text-[#2E3D50]">{formatarQuantidade(oferta.availableQuantity)}</td>
                                        <td className="py-4 px-4 text-[#2E3D50]">{formatarData(oferta.createdAt)}</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

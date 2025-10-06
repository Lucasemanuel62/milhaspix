import React from 'react';

interface BotaoRankingProps {
    posicao: number;
    valor: number;
    eUsuario?: boolean;
    onClick?: () => void;
    className?: string;
}

export default function BotaoRanking({
    posicao,
    valor,
    eUsuario = false,
    onClick,
    className = ""
}: BotaoRankingProps) {
    const valorFormatado = valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center h-[24px] px-[9px] rounded-[44px] border transition-colors ${eUsuario
                ? 'bg-teal-100 border-teal-400'
                : 'bg-white border-[#E2E2E2]'
                } ${className}`}
        >
            {eUsuario && (
                <span className="font-dmsans font-medium text-[12px] leading-7 text-teal-700 mr-1">
                    Você
                </span>
            )}
            <span className={`font-dmsans font-medium text-[12px] leading-7 ${eUsuario ? 'text-teal-700' : 'text-primary-02'}`}>
                {posicao}°
            </span>
            <span className={`ml-1 font-dmsans font-medium text-[12px] leading-7 ${eUsuario ? 'text-teal-700' : 'text-primary-02'}`}>
                R$ {valorFormatado}
            </span>
        </button>
    );
}

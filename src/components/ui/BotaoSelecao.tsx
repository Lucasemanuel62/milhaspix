import React from 'react';

interface BotaoSelecaoProps {
    texto: string;
    selecionado: boolean;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
}

export default function BotaoSelecao({
    texto,
    selecionado,
    onClick,
    className = "",
    disabled = false
}: BotaoSelecaoProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`w-full py-3 rounded-[56px] border-2 font-medium text-[16px] leading-[28px] text-[#000000] transition-colors ${selecionado
                ? 'border-primary-02 bg-primary-02 text-white'
                : 'border-[#E2E2E2] bg-white hover:border-primary-02'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {texto}
        </button>
    );
}

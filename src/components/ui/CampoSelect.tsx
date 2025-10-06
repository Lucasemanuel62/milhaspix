import React from 'react';

interface OpcaoSelect {
    value: string;
    label: string;
    disabled?: boolean;
}

interface CampoSelectProps {
    id?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    opcoes: OpcaoSelect[];
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export default function CampoSelect({
    id,
    value,
    onChange,
    opcoes,
    placeholder = "Selecione uma opção",
    className = "",
    disabled = false
}: CampoSelectProps) {
    const baseClasses = "w-full h-[44px] rounded-[44px] border py-[10px] px-[16px] pr-[40px] border-[#E2E2E2] bg-white appearance-none cursor-pointer focus:outline-none focus:border-primary-02 text-[#2E3D50] font-dmsans";

    return (
        <div className="relative">
            <select
                id={id}
                value={value}
                onChange={onChange}
                className={`${baseClasses} ${className}`}
                disabled={disabled}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {opcoes.map((opcao) => (
                    <option
                        key={opcao.value}
                        value={opcao.value}
                        disabled={opcao.disabled}
                    >
                        {opcao.label}
                    </option>
                ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-primary-02" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
            </div>
        </div>
    );
}

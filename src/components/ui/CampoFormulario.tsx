import React from 'react';

interface CampoFormularioProps {
    label: string;
    htmlFor: string;
    obrigatorio?: boolean;
    erro?: string;
    children: React.ReactNode;
    className?: string;
}

export default function CampoFormulario({
    label,
    htmlFor,
    obrigatorio = false,
    erro,
    children,
    className = ""
}: CampoFormularioProps) {
    return (
        <div className={`w-full h-auto flex flex-col gap-1 ${className}`}>
            <label
                htmlFor={htmlFor}
                className="font-dmsans font-medium text-[16px] leading-[130%] text-[#2E3D50]"
            >
                {label}
                {obrigatorio && <span className="text-red-500 ml-1">*</span>}
            </label>
            {children}
            {erro && (
                <p className="text-red-500 text-sm font-dmsans mt-1">
                    {erro}
                </p>
            )}
        </div>
    );
}

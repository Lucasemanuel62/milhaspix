import React from 'react';

interface CampoInputProps {
    id?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    readOnly?: boolean;
    maxLength?: number;
    register?: any;
    children?: React.ReactNode;
}

export default function CampoInput({
    id,
    type = "text",
    placeholder,
    value,
    defaultValue,
    onChange,
    className = "",
    readOnly = false,
    maxLength,
    register,
    children
}: CampoInputProps) {
    const baseClasses = "w-full h-[44px] rounded-[44px] border py-[10px] px-[16px] pr-[40px] border-[#E2E2E2] focus:outline-none focus:border-primary-02 text-[#2E3D50] font-dmsans";

    return (
        <div className="relative">
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                className={`${baseClasses} ${className}`}
                readOnly={readOnly}
                maxLength={maxLength}
                {...register}
            />
            {children && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {children}
                </div>
            )}
        </div>
    );
}

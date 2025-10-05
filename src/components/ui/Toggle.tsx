import { useState } from 'react';

interface ToggleProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    label?: string;
    className?: string;
}

export default function Toggle({
    checked = false,
    onChange,
    disabled = false,
    size = 'md',
    label,
    className = ''
}: ToggleProps) {
    const [isChecked, setIsChecked] = useState(checked);

    const handleToggle = () => {
        if (disabled) return;

        const newValue = !isChecked;
        setIsChecked(newValue);
        onChange?.(newValue);
    };

    // Tamanhos responsivos para mobile
    const sizeClasses = {
        sm: {
            track: 'w-10 h-6',
            thumb: 'w-5 h-5',
            thumbOffset: isChecked ? 'translate-x-4' : 'translate-x-0.5'
        },
        md: {
            track: 'w-12 h-7',
            thumb: 'w-6 h-6',
            thumbOffset: isChecked ? 'translate-x-5' : 'translate-x-0.5'
        },
        lg: {
            track: 'w-14 h-8',
            thumb: 'w-7 h-7',
            thumbOffset: isChecked ? 'translate-x-6' : 'translate-x-0.5'
        }
    };

    const currentSize = sizeClasses[size];

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-gray-700 select-none">
                    {label}
                </label>
            )}
            <button
                type="button"
                onClick={handleToggle}
                disabled={disabled}
                className={`
                    ${currentSize.track}
                    relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${isChecked
                        ? 'bg-blue-600'
                        : 'bg-gray-300'
                    }
                    ${disabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer hover:shadow-md active:scale-95'
                    }
                `}
                role="switch"
                aria-checked={isChecked}
                aria-label={label}
            >
                <span
                    className={`
                        ${currentSize.thumb}
                        ${currentSize.thumbOffset}
                        inline-block transform transition-transform duration-200 ease-in-out rounded-full bg-white shadow-lg
                        ${disabled ? '' : 'hover:shadow-xl'}
                    `}
                />
            </button>
        </div>
    );
}

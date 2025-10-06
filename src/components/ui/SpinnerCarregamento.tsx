
interface SpinnerCarregamentoProps {
    tamanho?: 'sm' | 'md' | 'lg';
    cor?: string;
    className?: string;
}

export default function SpinnerCarregamento({
    tamanho = 'md',
    cor = 'border-primary-02',
    className = ""
}: SpinnerCarregamentoProps) {
    const tamanhos = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-6 h-6'
    };

    return (
        <div className={`${tamanhos[tamanho]} border-2 ${cor} border-t-transparent rounded-full animate-spin ${className}`}></div>
    );
}

interface PropsRecebaAte {
    valor: number;
    etapaAtual?: number;
}

export default function RecebaAte({ valor, etapaAtual = 1 }: PropsRecebaAte) {
    // Mobile: aparece nas etapas 2 e 3
    // Desktop: aparece apenas na etapa 2
    if (etapaAtual !== 2 && etapaAtual !== 3) {
        return null;
    }

    // Se o valor for inválido, exibimos "-" em vez de esconder o componente
    const isValorValido = typeof valor === 'number' && !isNaN(valor) && valor > 0;
    const formattedValue = isValorValido
        ? valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : '-';

    return (
        <div className={`relative ${etapaAtual === 3 ? 'lg:hidden' : ''}`}>
            {/* Div branca por trás para evitar mistura de conteúdo */}
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>

            {/* Conteúdo principal */}
            <div className="relative flex items-center justify-between h-[44px] px-[18px] py-2 border-t border-[#E6E6E6] bg-[#12A19A]/10 lg:px-4 lg:rounded-[8px] lg:bg-[#E0F2F1] lg:border-t-0">
                <span className="text-[#2E3D50] font-dmsans font-medium text-[16px]">Receba até</span>
                <span className="text-[#00897B] font-dmsans font-medium text-[16px]">{isValorValido ? `R$ ${formattedValue}` : '-'}</span>
            </div>
        </div>
    );
}

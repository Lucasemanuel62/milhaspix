interface PropsRecebaAte {
    valor: number;
    etapaAtual?: number;
}

export default function RecebaAte({ valor, etapaAtual = 1 }: PropsRecebaAte) {
    if (etapaAtual !== 2 && etapaAtual !== 3) {
        return null;
    }

    const formattedValue = valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return (
        <div className="flex items-center justify-between h-[44px] px-[18px] py-2 border-t border-[#E6E6E6] bg-[#12A19A]/10 lg:px-4 lg:rounded-[8px] lg:bg-[#E0F2F1] lg:border-t-0">
            <span className="text-[#2E3D50] font-dmsans font-medium text-[16px]">Receba até</span>
            <span className="text-[#00897B] font-dmsans font-medium text-[16px]">R$ {formattedValue}</span>
        </div>
    );
}

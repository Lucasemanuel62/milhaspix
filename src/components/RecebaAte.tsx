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
        <div className="flex items-center justify-between h-[44px] px-4 rounded-[8px] bg-[#E0F2F1]">
            <span className="text-[#2E3D50] font-dmsans font-medium text-[16px]">Receba até</span>
            <span className="text-[#00897B] font-dmsans font-medium text-[16px]">R$ {formattedValue}</span>
        </div>
    );
}

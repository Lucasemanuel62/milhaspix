interface PropsCabecalhoEtapa {
    numeroEtapa: string | number
    titulo: string
    tituloMobile?: string
    imagem?: string
    etapaAtual?: number
    isAirPortugal?: boolean
    mileValueFormatted?: string
    isValueValid?: boolean
}

export default function CabecalhoEtapa({ numeroEtapa, titulo, tituloMobile, imagem, etapaAtual, isAirPortugal, mileValueFormatted, isValueValid }: PropsCabecalhoEtapa) {
    // Valores mínimos e máximos sugeridos
    const MIN_VALUE = 14.00
    const MAX_VALUE = 16.56

    return (
        <div className="w-full h-auto flex flex-row rounded-lg border-b border-b-[#E2E2E2] border-b-[1px] p-4 gap-2">
            <span className="w-[29px] h-[28px] text-primary-02 font-dmsans font-medium text-lg leading-7 text-center">
                {numeroEtapa}
            </span>
            <div className="w-full flex items-center justify-between">
                <h3 className="text-[#2E3D50] font-dmsans font-medium text-lg leading-7">
                    <span className="hidden lg:inline">{titulo}</span>
                    <span className="lg:hidden">{tituloMobile || titulo}</span>
                </h3>
                {/* Aviso de faixa de valores - apenas desktop na etapa 2 (no mobile fica abaixo do input) */}
                {etapaAtual === 2 && mileValueFormatted && !isValueValid && (
                    <div className="hidden lg:block bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-red-600 text-sm font-medium">
                        Escolha entre R$ {MIN_VALUE.toFixed(2).replace('.', ',')} e R$ {MAX_VALUE.toFixed(2).replace('.', ',')}
                    </div>
                )}
            </div>
            {imagem && etapaAtual === 3 && (
                <img
                    src={imagem}
                    alt={titulo}
                    className={isAirPortugal
                        ? "w-[110px] h-[26px]"
                        : "w-[61px] h-[26px]"
                    }
                />
            )}
        </div>
    )
}

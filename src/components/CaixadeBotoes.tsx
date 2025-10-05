import NextButton from "./ui/BotaoProximo"
import PreviosButton from "./ui/BotaoAnterior"

interface PropsCaixadeBotoes {
    etapaAtual: number
    aoMudarEtapa: (etapa: number) => void
}

const TOTAL_ETAPAS = 4

export default function CaixadeBotoes({ etapaAtual, aoMudarEtapa }: PropsCaixadeBotoes) {
    // Primeira etapa: apenas avançar
    if (etapaAtual === 1) {
        return (
            <div className="fixed bottom-0 left-0 right-0 z-10 lg:static w-full lg:w-[640px] h-[72px] lg:h-[70px] flex flex-row items-center justify-between lg:justify-end border-t border-[#E2E2E2] lg:border-t-[#FFFFFF] border-t-[1px] gap-4 lg:mt-0 mt-auto bg-white">
                {/* Espaçador para alinhar no mobile */}
                <div className="lg:hidden w-[80px]" />
                <div className="lg:hidden flex items-center justify-center min-w-[72px]">
                    <span className="text-primary-02 font-dmsans font-medium text-lg leading-7 mr-1">{etapaAtual}</span>
                    <span className="text-[#2E3D50] font-dmsans font-medium text-lg leading-7">de {TOTAL_ETAPAS}</span>
                </div>
                <NextButton onNext={() => aoMudarEtapa(etapaAtual + 1)} />
            </div>
        )
    }

    // Última etapa: apenas voltar
    if (etapaAtual === 4) {
        return (
            <div className="fixed bottom-0 left-0 right-0 z-10 lg:static w-full lg:w-[640px] h-[72px] lg:h-[70px] flex flex-row items-center justify-between border-t border-[#E2E2E2] lg:border-t-[#FFFFFF] border-t-[1px] gap-4 lg:mt-0 mt-auto bg-white">
                <PreviosButton onPrevious={() => aoMudarEtapa(etapaAtual - 1)} />
                <div className="lg:hidden flex items-center justify-center min-w-[72px]">
                    <span className="text-primary-02 font-dmsans font-medium text-lg leading-7 mr-1">{etapaAtual}</span>
                    <span className="text-[#2E3D50] font-dmsans font-medium text-lg leading-7">de {TOTAL_ETAPAS}</span>
                </div>
                {/* Espaçador para alinhar no mobile */}
                <div className="lg:hidden w-[80px]" />
            </div>
        )
    }

    // Demais etapas
    return (
        <div className="fixed bottom-0 left-0 right-0 z-10 lg:static w-full lg:w-[640px] h-[72px] lg:h-[70px] flex flex-row items-center justify-between border-t border-[#E2E2E2] lg:border-t-[#FFFFFF] border-t-[1px] gap-4 lg:mt-0 mt-auto bg-white">
            <PreviosButton onPrevious={() => aoMudarEtapa(etapaAtual - 1)} />
            <div className="lg:hidden flex gap-[6px] items-center justify-center min-w-[72px]">
                <span className="text-primary-02 font-dmsans font-medium text-lg leading-7 mr-1">{etapaAtual}</span>
                <span className="text-[#2E3D50] font-dmsans font-medium text-lg leading-7">de {TOTAL_ETAPAS}</span>
            </div>
            {/* Aviso de termos somente no desktop e apenas na etapa 3 */}
            {etapaAtual === 3 && (
                <div className="hidden lg:flex flex-1 items-center justify-center">
                    <span className="text-gray-600 text-sm">Ao prosseguir você concorda com os <a href="#" className="text-primary-02 underline">termos de uso</a></span>
                </div>
            )}
            <NextButton onNext={() => aoMudarEtapa(etapaAtual + 1)} />
        </div>
    )
}

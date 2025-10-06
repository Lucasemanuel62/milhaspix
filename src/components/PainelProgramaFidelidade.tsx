import ItemPrograma from "./ItemPrograma"
import FormularioEtapas from "./FormularioGeral"
import CabecalhoEtapa from "./CabecalhoEtapa"
import { programSteps } from "../data/programSteps"
import { programs } from "../data/programs"
import SecaoMedia from "./SecaoMedia"
import OfertasRanking from "./OfertasRanking"
import CaixadeBotoes from "./CaixadeBotoes"
import Instrucoes from "./Instrucoes"
import { useState } from "react"
import { parseCurrencyValue } from "../utils/currencyMask"
import RecebaAte from "./RecebaAte"

interface PropsPainelProgramaFidelidade {
    etapaAtual: number;
    aoMudarEtapa: (etapa: number) => void;
    programaSelecionado?: number;
    aoSelecionarPrograma?: (programaId: number) => void;
    onMileValueChange?: (value: number) => void;
}

export default function PainelProgramaFidelidade({ etapaAtual, aoMudarEtapa, programaSelecionado, aoSelecionarPrograma, onMileValueChange }: PropsPainelProgramaFidelidade) {
    const [isValueValid, setIsValueValid] = useState(true)
    const [mileValueFormatted, setMileValueFormatted] = useState('')

    const handleMileValueChange = (value: number) => {
        onMileValueChange?.(value)
    }

    const handleValidationChange = (isValid: boolean, formattedValue: string) => {
        setIsValueValid(isValid)
        setMileValueFormatted(formattedValue)
    }

    // Mostrar programa baseado na etapa atual
    const currentProgram = programSteps[etapaAtual - 1] || programSteps[0]

    // Função para buscar a imagem do programa selecionado
    const getImagemPrograma = (programaId?: number) => {
        if (!programaId) return undefined;
        const programa = programs.find(p => p.id === programaId);
        return programa?.img;
    };

    // Função para verificar se é Air Portugal
    const isAirPortugal = (programaId?: number) => {
        if (!programaId) return false;
        const programa = programs.find(p => p.id === programaId);
        return programa?.alt?.toLowerCase().includes('air portugal') || programa?.alt?.toLowerCase().includes('tap') || false;
    };

    return (
        <div className="w-full h-full flex flex-col p-4 pb-[84px] lg:pb-0 lg:p-0">
            <div className="w-full h-auto lg:flex flex-col rounded-[8px] border border-[#E2E2E2] border-[1px]">
                <CabecalhoEtapa
                    numeroEtapa={currentProgram.number}
                    titulo={currentProgram.name}
                    tituloMobile={currentProgram.nameMobile}
                    imagem={getImagemPrograma(programaSelecionado)}
                    etapaAtual={etapaAtual}
                    isAirPortugal={isAirPortugal(programaSelecionado)}
                    mileValueFormatted={mileValueFormatted}
                    isValueValid={isValueValid}
                />
                <div className="flex flex-col w-full h-auto p-4 gap-3 lg:gap-6 ">
                    <ItemPrograma
                        etapaAtual={etapaAtual}
                        programaSelecionado={programaSelecionado}
                        aoSelecionarPrograma={aoSelecionarPrograma}
                    />
                    <FormularioEtapas
                        etapaAtual={etapaAtual}
                        onMileValueChange={handleMileValueChange}
                        onValidationChange={handleValidationChange}
                    />
                    {/* Ranking: exibir apenas no mobile aqui para evitar duplicidade no desktop */}
                    <div className="lg:hidden">
                        {(() => {
                            const mileValueForRanking = mileValueFormatted
                                ? parseCurrencyValue(mileValueFormatted)
                                : 16.5 // fallback inicial para exibir ranking padrão no mobile
                            return (
                                <OfertasRanking etapaAtual={etapaAtual} mileValue={mileValueForRanking} />
                            )
                        })()}
                    </div>
                    <SecaoMedia etapa={etapaAtual} />
                </div>
            </div>

            <div className="lg:hidden pb-[116px]">
                <Instrucoes etapaAtual={etapaAtual} />
            </div>

            <div className="lg:hidden fixed bottom-[72px] left-0 right-0 z-10">
                <RecebaAte etapaAtual={etapaAtual} valor={24325.23} />
            </div>

            <CaixadeBotoes etapaAtual={etapaAtual} aoMudarEtapa={aoMudarEtapa} />
        </div>

    )
}
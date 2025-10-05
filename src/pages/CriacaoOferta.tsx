import { useState } from 'react'
import StepIndicator from "../components/IndicadordeEtapa"
import PainelProgramaFidelidade from "../components/PainelProgramaFidelidade"
import SuccessMessage from "../components/MensagemSucesso"
import OfertasRanking from "../components/OfertasRanking"
import RecebaAte from "../components/RecebaAte"
import Instrucoes from "../components/Instrucoes"

export default function CriacaoOferta() {
    const [etapaAtual, definirEtapaAtual] = useState(1)
    const [programaSelecionado, setProgramaSelecionado] = useState<number>(1)
    const [mileValue, setMileValue] = useState(16.50)

    const handleMileValueChange = (value: number) => {
        setMileValue(value)
    }
    return (
        <main className="w-full h-full flex flex-col lg:pt-[40px] items-center justify-center bg-white">
            <div className="w-full h-auto flex flex-col lg:flex-row gap-[40px] justify-center">
                <StepIndicator etapaAtual={etapaAtual} aoMudarEtapa={definirEtapaAtual} />

                {etapaAtual === 4 ? (
                    <SuccessMessage />
                ) : (
                    <div>
                        <PainelProgramaFidelidade
                            etapaAtual={etapaAtual}
                            aoMudarEtapa={definirEtapaAtual}
                            programaSelecionado={programaSelecionado}
                            aoSelecionarPrograma={setProgramaSelecionado}
                            onMileValueChange={handleMileValueChange}
                        />
                    </div>
                )}
                <div className="hidden lg:flex flex-col gap-6">
                    <Instrucoes etapaAtual={etapaAtual} />
                    <OfertasRanking etapaAtual={etapaAtual} mileValue={mileValue} />
                    <RecebaAte etapaAtual={etapaAtual} valor={24325.23} />
                </div>

            </div>
        </main>
    )
}

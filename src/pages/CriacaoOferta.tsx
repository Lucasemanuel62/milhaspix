import { useState } from 'react'
import StepIndicator from "../components/IndicadordeEtapa"
import PainelProgramaFidelidade from "../components/PainelProgramaFidelidade"
import SuccessMessage from "../components/MensagemSucesso"
import OfertasRanking from "../components/OfertasRanking"
import RecebaAte from "../components/RecebaAte"
import Instrucoes from "../components/Instrucoes"
import { calcularRecebaAte } from "../utils/calculoRecebaAte"

export default function CriacaoOferta() {
    const [etapaAtual, definirEtapaAtual] = useState(1)
    const [programaSelecionado, setProgramaSelecionado] = useState<number>(1)
    const [mileValue, setMileValue] = useState(16.50)
    const [tipoProduto, setTipoProduto] = useState('Liminar')
    const [cpfsDisponiveis, setCpfsDisponiveis] = useState<string>('5')

    const handleMileValueChange = (value: number) => {
        setMileValue(value)
    }

    const handleTipoProdutoChange = (tipo: string) => {
        setTipoProduto(tipo)
    }

    const handleCpfsDisponiveisChange = (cpfs: string) => {
        setCpfsDisponiveis(cpfs)
    }

    // Calcular valor do Receba até para desktop
    const calcularValorRecebaAteDesktop = () => {
        const MIN_VALUE = 14.00
        const MAX_VALUE = 16.56
        if (isNaN(mileValue) || mileValue < MIN_VALUE || mileValue > MAX_VALUE) {
            // Fora do intervalo válido: exibir "-" no componente
            return NaN as unknown as number
        }
        return calcularRecebaAte(mileValue, tipoProduto, cpfsDisponiveis)
    }
    return (
        <main className="w-full h-full flex flex-col lg:pt-[40px] items-center justify-center bg-white">
            <div className="w-full h-auto flex flex-col lg:flex-row gap-[40px] justify-center">
                <StepIndicator etapaAtual={etapaAtual} aoMudarEtapa={definirEtapaAtual} />

                {etapaAtual === 4 ? (
                    <SuccessMessage onVoltarEtapa1={() => definirEtapaAtual(1)} />
                ) : (
                    <div>
                        <PainelProgramaFidelidade
                            etapaAtual={etapaAtual}
                            aoMudarEtapa={definirEtapaAtual}
                            programaSelecionado={programaSelecionado}
                            aoSelecionarPrograma={setProgramaSelecionado}
                            onMileValueChange={handleMileValueChange}
                            onTipoProdutoChange={handleTipoProdutoChange}
                            onCpfsDisponiveisChange={handleCpfsDisponiveisChange}
                        />
                    </div>
                )}
                <div className="hidden lg:flex flex-col gap-6">
                    <Instrucoes etapaAtual={etapaAtual} />
                    <OfertasRanking etapaAtual={etapaAtual} mileValue={mileValue} />
                    <RecebaAte etapaAtual={etapaAtual} valor={calcularValorRecebaAteDesktop()} />
                </div>

            </div>
        </main>
    )
}

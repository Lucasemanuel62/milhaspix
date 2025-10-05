export default function IndicadorDeEtapa({ etapaAtual, aoMudarEtapa }: { etapaAtual: number, aoMudarEtapa: (etapa: number) => void }) {
    const steps = [
        { id: 1, title: "Passo 1", desc: "Escolha a companhia aérea" },
        { id: 2, title: "Passo 2", desc: "Oferte suas milhas" },
        { id: 3, title: "Passo 3", desc: "Insira os dados do programa" },
        { id: 4, title: "Passo 4", desc: "Pedido finalizado" },
    ]

    const goToStep = (stepId: number) => {
        aoMudarEtapa(stepId)
    }

    const getStepStatus = (stepId: number): 'active' | 'inactive' => {
        if (etapaAtual === 4) {
            return 'active'
        }
        return stepId < etapaAtual ? 'active' : 'inactive'
    }

    return (
        <div className=" hidden lg:block w-[248px] h-[345px] h-full">
            {steps.map((step, index) => (
                <div
                    key={step.id}
                    className={`relative flex items-start h-[86.25px] rounded-[10px] p-4 cursor-pointer ${step.id === etapaAtual ? "bg-white shadow-md opacity-90" : ""
                        }`}
                    onClick={() => goToStep(step.id)}
                >
                    {/* Segmento acima do círculo (conecta com item anterior) */}
                    {index > 0 && (
                        <div
                            className={`absolute left-[31px] top-0 bottom-[48px] w-[2px] ${step.id <= etapaAtual ? 'bg-primary-02' : 'bg-[#F0F0F0]'}`}
                            style={{ zIndex: 0 }}
                        />
                    )}
                    {/* Segmento abaixo do círculo (conecta com próximo item) */}
                    {index !== steps.length - 1 && (
                        <div
                            className={`absolute left-[31px] top-[48px] bottom-0 w-[2px] ${step.id < etapaAtual ? 'bg-primary-02' : 'bg-[#F0F0F0]'}`}
                            style={{ zIndex: 0 }}
                        />
                    )}

                    {/* Bolinha */}
                    <div
                        className={`relative z-10 flex h-[32px] w-[32px] items-center justify-center rounded-full border-[2px] ${getStepStatus(step.id) === 'active'
                            ? "border-primary-02 bg-primary-02"
                            : "border-primary-02 bg-white"
                            } ${step.id === etapaAtual ? 'ring-4 ring-primary-02/25' : ''}`}
                    >
                        <div
                            className={`h-[10px] w-[10px] rounded-full ${getStepStatus(step.id) === 'active'
                                ? "bg-white"
                                : "bg-primary-02"
                                }`}
                        />
                    </div>

                    {/* Caixa de texto */}
                    <div className="ml-4 flex-1">
                        <h3 className={`w-full h-[16px] font-medium leading-none font-dmsans text-[16px] ${getStepStatus(step.id) !== 'inactive' ? "text-[#2E3D50]" : "text-[#9CA3AF]"
                            }`}>{step.title}</h3>
                        <p className={`w-full h-[19px] font-normal leading-[160%] font-dmsans text-[12px] ${getStepStatus(step.id) !== 'inactive' ? "text-[#475569]" : "text-[#9CA3AF]"
                            }`}>{step.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}




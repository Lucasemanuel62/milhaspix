import { useState } from 'react'
import { programs } from '../data/programs'
import { TimeDetails } from '../data/TimeDetails'
import { Program, TimeDetail, ProgramData, PropsItemPrograma } from '../types/programTypes'

export default function ItemPrograma({
    contentType = 'image',
    customContent,
    onSelect,
    selectedProgram,
    etapaAtual = 1,
    programaSelecionado,
    aoSelecionarPrograma
}: PropsItemPrograma) {
    const [activeProgram, setActiveProgram] = useState<number>(programaSelecionado || selectedProgram || 1)

    // Escolher dados baseados na etapa atual
    const getDataForStep = (): ProgramData[] => {
        switch (etapaAtual) {
            case 1:
                return programs as Program[]
            case 2:
                return TimeDetails as TimeDetail[]
            default:
                return programs as Program[]
        }
    }

    const data = getDataForStep()

    const selectProgram = (programId: number) => {
        setActiveProgram(programId)
        aoSelecionarPrograma?.(programId)
        onSelect?.(programId)
    }

    const selectNextProgram = () => {
        const idx = data.findIndex((item) => item.id === activeProgram)
        const next = data[(idx + 1) % data.length]
        selectProgram(next.id)
    }

    const renderContent = (item: ProgramData) => {
        switch (contentType) {
            case 'text':
                const textContent = 'description' in item ? item.description : ''
                return <span className="text-sm font-medium">{textContent}</span>
            case 'custom':
                return customContent
            case 'image':
            default:
                // Para etapa 2, mostrar texto em vez de imagem
                if (etapaAtual === 2) {
                    const descriptionText = 'description' in item ? item.description : ''
                    return <span className="text-sm font-medium text-center">{descriptionText}</span>
                }
                // Para etapa 1, mostrar imagem
                if ('img' in item) {
                    return (
                        <img
                            src={item.img}
                            alt={item.alt}
                            className="object-contain"
                            style={{
                                width: item.width,
                                height: item.height
                            }}
                        />
                    )
                }
                return null
        }
    }

    // Texto do item ativo (mobile)
    const getActiveLabel = () => {
        const current = data.find((i) => i.id === activeProgram)
        if (!current) return ''
        return etapaAtual === 2 ? ('description' in current ? current.description : '') : ('alt' in current ? current.alt : '')
    }

    return (
        <div className={`w-full lg:w-[608px] h-auto flex flex-col gap-2 ${etapaAtual === 3 ? 'hidden' : ''}`}>
            {etapaAtual === 2 && (
                <h3 className="hidden lg:block w-full text-start text-base font-medium text-[#2E3D50] leading-[130%]">Quero receber</h3>
            )}

            {/* Alternador para mobile/tablet (ciclo ao toque) - apenas etapa 1 */}
            {etapaAtual === 1 && (
                <div className="lg:hidden w-full px-4">
                    <button
                        type="button"
                        onClick={selectNextProgram}
                        className="w-full h-[44px] rounded-[44px] border border-[#E2E2E2] py-[10px] px-4 bg-white text-[#2E3D50] font-dmsans font-medium text-[16px] leading-[130%] flex items-center gap-[11px] active:scale-[0.99] transition"
                        aria-label="Alterar programa"
                    >
                        {/* Ícone vetorial de troca */}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary-02">
                            <path d="M4 7h11m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M20 17H9m0 0l3 3m-3-3l3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="truncate">{getActiveLabel()}</span>
                        {/* Imagem do programa selecionado (etapa 1) à direita */}
                        {(() => {
                            const current = data.find((i) => i.id === activeProgram)
                            if (etapaAtual === 1 && current && 'img' in current) {
                                return (
                                    <img
                                        src={current.img}
                                        alt={'alt' in current ? current.alt : ''}
                                        className="object-contain ml-auto"
                                        style={{ width: current.width, height: current.height }}
                                    />
                                )
                            }
                            return null
                        })()}
                    </button>
                </div>
            )}

            {/* Botões para desktop */}
            <div className="hidden lg:flex w-[608px] h-[44px] items-center gap-3">
                {data.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => selectProgram(item.id)}
                        className={`w-[143px] h-[44px] rounded-[56px] border px-2 py-3 flex items-center justify-center cursor-pointer transition-all duration-300 ${activeProgram === item.id
                            ? 'border-primary-02 border-2 opacity-100 shadow-md'
                            : 'border-[#F0F0F0] opacity-50 hover:opacity-70'
                            }`}
                    >
                        {renderContent(item)}
                    </div>
                ))}
            </div>
        </div>
    )
}
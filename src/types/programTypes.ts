export interface Program {
    id: number
    img: string
    alt: string
    width: string
    height: string
}

export interface TimeDetail {
    id: number
    description: string
}

export type ProgramData = Program | TimeDetail

export interface PropsItemPrograma {
    contentType?: 'image' | 'text' | 'custom'
    customContent?: React.ReactNode
    onSelect?: (programId: number) => void
    selectedProgram?: number
    etapaAtual?: number
    programaSelecionado?: number
    aoSelecionarPrograma?: (programaId: number) => void
}

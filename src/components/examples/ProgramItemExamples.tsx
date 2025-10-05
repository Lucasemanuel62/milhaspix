import ItemPrograma from '../ItemPrograma'
import { programDetails } from '../data/programDetails'

// Exemplo de uso do ItemPrograma com diferentes tipos de conteúdo

export default function ItemProgramaExamples() {
    const handleProgramSelect = (programId: number) => {
        console.log('Programa selecionado:', programId)
    }

    return (
        <div className="space-y-8">
            {/* Uso padrão com imagens */}
            <div>
                <h3 className="text-lg font-bold mb-4">Programas com Imagens</h3>
                <ItemPrograma
                    contentType="image"
                    onSelect={handleProgramSelect}
                />
            </div>

            {/* Uso com texto */}
            <div>
                <h3 className="text-lg font-bold mb-4">Programas com Texto</h3>
                <ItemPrograma
                    contentType="text"
                    onSelect={handleProgramSelect}
                />
            </div>

            {/* Uso com conteúdo customizado */}
            <div>
                <h3 className="text-lg font-bold mb-4">Programas com Detalhes</h3>
                <ItemPrograma
                    contentType="custom"
                    customContent={
                        <div className="text-center">
                            <div className="text-xs font-bold">{programDetails[0].name}</div>
                            <div className="text-xs text-green-600">{programDetails[0].price}</div>
                            <div className="text-xs text-gray-500">{programDetails[0].miles}</div>
                        </div>
                    }
                    onSelect={handleProgramSelect}
                />
            </div>
        </div>
    )
}

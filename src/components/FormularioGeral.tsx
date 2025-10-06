import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { formatCurrency, parseCurrencyValue } from "../utils/currencyMask"

interface PropsFormularioGeral {
    etapaAtual?: number;
    onMileValueChange?: (value: number) => void;
    onValidationChange?: (isValid: boolean, formattedValue: string) => void;
}

export default function FormularioGeral({ etapaAtual = 1, onMileValueChange, onValidationChange }: PropsFormularioGeral) {
    const { register, setValue, watch } = useForm()
    const [mileValueFormatted, setMileValueFormatted] = useState('')
    const [selectedProductType, setSelectedProductType] = useState('Liminar')
    const [cpfsDisponiveis, setCpfsDisponiveis] = useState<string>('Carregando...')
    const [cpfsLoading, setCpfsLoading] = useState(true)
    // Tipos de produtos disponíveis
    const productTypes = [
        'Liminar',
        'Convencional',
        'Promoção',
        'Corporativo',
        'Clube de Milhas',
        'Cashback',
        'Parceiro'
    ]

    // Estado dos botões "Quero receber" (mobile etapa 2)
    const receiveOptions = ['Imediato', 'em 2 dias', 'em 7 dias', 'Depois do voo']
    const [selectedReceiveIdx, setSelectedReceiveIdx] = useState<number>(0)

    const mileValue = watch('valorPorMilhas')

    const MIN_VALUE = 14.00
    const MAX_VALUE = 16.56

    // Função para validar se o valor está na faixa sugerida
    const isValidValue = (value: string) => {
        const numericValue = parseCurrencyValue(value)
        return numericValue >= MIN_VALUE && numericValue <= MAX_VALUE
    }

    // Estado para controlar se o valor é válido
    const isValueValid = mileValueFormatted ? isValidValue(mileValueFormatted) : true

    // Função para lidar com mudança do tipo de produto
    const handleProductTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSelectedProductType(value)
        setValue('product', value)
    }

    // Função para simular busca de CPFs disponíveis (normalmente viria da API)
    const fetchCpfsDisponiveis = async () => {
        try {
            setCpfsLoading(true)
            // Simular delay da API
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Simular diferentes cenários baseados no tipo de produto
            let cpfsCount = 'Ilimitado'
            switch (selectedProductType) {
                case 'Liminar':
                    cpfsCount = '5'
                    break
                case 'Convencional':
                    cpfsCount = '3'
                    break
                case 'Promoção':
                    cpfsCount = '1'
                    break
                case 'Corporativo':
                    cpfsCount = 'Ilimitado'
                    break
                case 'Clube de Milhas':
                    cpfsCount = '2'
                    break
                case 'Cashback':
                    cpfsCount = '0'
                    break
                case 'Parceiro':
                    cpfsCount = 'Ilimitado'
                    break
                default:
                    cpfsCount = 'Ilimitado'
            }

            setCpfsDisponiveis(cpfsCount)
            setValue('cpfs', cpfsCount)
        } catch (error) {
            console.error('Erro ao buscar CPFs disponíveis:', error)
            setCpfsDisponiveis('Erro ao carregar')
        } finally {
            setCpfsLoading(false)
        }
    }

    // Definir valor inicial do tipo de produto
    useEffect(() => {
        setValue('product', selectedProductType)
    }, [selectedProductType, setValue])

    // Buscar CPFs disponíveis quando o componente carregar e quando o tipo de produto mudar
    useEffect(() => {
        fetchCpfsDisponiveis()
    }, [selectedProductType])

    useEffect(() => {
        if (mileValue && onMileValueChange) {
            const numericValue = parseCurrencyValue(mileValue)
            onMileValueChange(numericValue)
        }
    }, [mileValue, onMileValueChange])

    // Efeito para notificar sobre mudanças na validação
    useEffect(() => {
        if (onValidationChange) {
            onValidationChange(isValueValid, mileValueFormatted)
        }
    }, [isValueValid, mileValueFormatted, onValidationChange])

    // Função para lidar com mudanças no input
    const handleMileValueInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatCurrency(e.target.value)
        setMileValueFormatted(formatted)
        setValue('valorPorMilhas', formatted)
    }
    return (
        <div className="w-full h-auto flex gap-3 p-4 ">
            {etapaAtual === 1 ? (
                <form action="" className="w-full h-full flex flex-col lg:flex-row gap-2">

                    <div className="w-full h-auto flex flex-col gap-1">
                        <label htmlFor="product"
                            className="font-dmsans font-medium text-[16px] leading-[130%] text-[#2E3D50]"
                        >Tipo de Produto
                        </label>
                        <div className="relative">
                            <select
                                id="product"
                                value={selectedProductType}
                                onChange={handleProductTypeChange}
                                className="w-full h-[44px] rounded-[44px] border py-[10px] px-[16px] pr-[40px] border-[#E2E2E2] bg-white appearance-none cursor-pointer focus:outline-none focus:border-primary-02 text-[#2E3D50] font-dmsans"
                            >
                                <option value="" disabled>
                                    Selecione o tipo de produto
                                </option>
                                {productTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-primary-02" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-auto flex flex-col gap-1">
                        <label htmlFor="cpfs"
                            className="font-dmsans font-medium text-[16px] leading-[130%] text-[#2E3D50]">
                            CPF's disponíveis
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={cpfsDisponiveis}
                                readOnly
                                className="w-full h-[44px] rounded-[44px] border py-[10px] px-[16px] pr-[40px] border-[#E2E2E2] bg-gray-50 text-gray-600 cursor-not-allowed"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                {cpfsLoading ? (
                                    <div className="w-4 h-4 border-2 border-primary-02 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>

                </form>
            ) : etapaAtual === 2 ? (
                <>
                    {/* Layout Desktop - Original */}
                    <div className="hidden lg:block w-full">
                        <form action="" className="w-full h-full flex flex-col lg:flex-row gap-2">
                            <div className="w-full h-auto flex flex-col gap-1">
                                <label htmlFor="milhasOfertadas"
                                    className="font-dmsans font-medium text-[16px] leading-[130%] text-[#2E3D50]"
                                >Milhas ofertadas
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ilimitado"
                                    className="w-full h-[44px] rounded-[44px] border flex space-between py-[10px] px-[16px] border-[#E2E2E2]"
                                    {...register("milhasOfertadas")}
                                />
                            </div>

                            <div className="w-full h-auto flex flex-col gap-1">
                                <label htmlFor="valorPorMilhas"
                                    className="font-dmsans font-medium text-[16px] leading-[130%] text-[#2E3D50]">
                                    Valor a cada 1.000 milhas
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="R$ 0,00"
                                        value={mileValueFormatted}
                                        onChange={handleMileValueInput}
                                        className={`w-full h-[44px] rounded-[44px] border flex space-between py-[10px] px-[16px] ${mileValueFormatted && !isValueValid
                                            ? 'border-red-500 text-red-500'
                                            : 'border-[#E2E2E2]'
                                            }`}
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <svg
                                            className={`w-5 h-5 ${mileValueFormatted && !isValueValid ? 'text-red-500' : 'text-gray-400'}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Layout Mobile - Novo */}
                    <div className="lg:hidden w-full space-y-6 px-4">
                        {/* Seção Quero receber */}
                        <div className="w-full">
                            <h3 className="font-dmsans font-medium text-[16px] leading-[130%] text-[#2E3D50] mb-3">
                                Quero receber
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {receiveOptions.map((opcao, index) => (
                                    <button
                                        key={opcao}
                                        type="button"
                                        onClick={() => setSelectedReceiveIdx(index)}
                                        className={`w-full px-2 py-3 rounded-[56px] border-2 font-medium text-[16px] leading-[28px] text-[#000000] transition-colors ${index === selectedReceiveIdx
                                            ? 'border-primary-02 bg-white'
                                            : 'border-[#F0F0F0] bg-white'
                                            }`}
                                    >
                                        {opcao}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Seção Milhas ofertadas */}
                        <div className="w-full">
                            <label htmlFor="milhasOfertadas"
                                className="font-dmsans font-medium text-[16px] leading-[130%] text-[#2E3D50] mb-3 block">
                                Milhas ofertadas
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="10.000"
                                    defaultValue="10.000"
                                    className="w-full h-[44px] rounded-lg border border-[#E2E2E2] py-[10px] px-[16px] pr-[40px]"
                                    {...register("milhasOfertadas")}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Seção Valor a cada 1.000 milhas */}
                        <div className="w-full">
                            <label htmlFor="valorPorMilhas"
                                className="font-dmsans font-medium text-[16px] leading-[130%] text-[#2E3D50] mb-3 block">
                                Valor a cada 1.000 milhas
                            </label>
                            <div className="relative mb-2">
                                {/* Prefixo R$ */}
                                <span className={`absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium ${mileValueFormatted && !isValueValid ? 'text-red-500' : 'text-gray-600'}`}>R$</span>
                                <input
                                    type="text"
                                    placeholder="0,00"
                                    value={mileValueFormatted}
                                    onChange={handleMileValueInput}
                                    className={`w-full h-[44px] rounded-lg border pl-10 pr-10 py-[10px] ${mileValueFormatted && !isValueValid
                                        ? 'border-red-500 text-red-500'
                                        : 'border-[#E2E2E2]'
                                        }`}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <svg
                                        className={`w-5 h-5 ${mileValueFormatted && !isValueValid ? 'text-red-500' : 'text-gray-400'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {/* Ajuda de validação */}
                            {mileValueFormatted && !isValueValid && (
                                <p className="mb-2 text-[14px] leading-[32px] text-alert-04 font-medium">
                                    Escolha entre <span className="font-bold">R$ 14,00</span> e <span className="font-bold">R$ 16,56</span>
                                </p>
                            )}

                        </div>

                    </div>
                </>
            ) : (
                <div className="w-full h-full flex flex-col gap-2">
                    <div className="flex flex-col lg:flex-row gap-2">
                        <div className="w-full h-auto flex flex-col gap-1">
                            <label htmlFor="cpfTitular"
                                className="font-dmsans font-medium text-lg leading-7 text-[#2E3D50]"
                            >CPF do Titular
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    maxLength={18}
                                    placeholder="431.140.231-12"
                                    className="w-full h-[44px] rounded-[44px] border py-[10px] px-[16px] pr-[40px] border-[#E2E2E2]"
                                    {...register("cpfTitular, ")}

                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-auto flex flex-col gap-1">
                            <label htmlFor="loginAcesso"
                                className="font-dmsans font-medium text-lg leading-7 text-[#2E3D50]">
                                Login de acesso
                            </label>
                            <input
                                type="text"
                                placeholder="1283124124"
                                className="w-full h-[44px] rounded-[44px] border py-[10px] px-[16px] border-[#E2E2E2]"
                                {...register("loginAcesso")}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-2">
                        <div className="w-full h-auto flex flex-col gap-1">
                            <label htmlFor="senhaAcesso"
                                className="font-dmsans font-medium text-lg leading-7 text-[#2E3D50]"
                            >Senha de acesso
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="1877"
                                    className="w-full h-[44px] rounded-[44px] border py-[10px] px-[16px] pr-[40px] border-[#E2E2E2]"
                                    {...register("senhaAcesso")}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-auto flex flex-col gap-1">
                            <label htmlFor="telefoneAuth"
                                className="font-dmsans font-medium text-lg leading-7 text-[#2E3D50]">
                                Telefone para autenticação
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="+55 (19)98277-3123"
                                    className="w-full h-[44px] rounded-[44px] border py-[10px] px-[16px] pr-[40px] border-[#E2E2E2]"
                                    {...register("telefoneAuth")}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default function BotaoSaldo() {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value)
    }

    return (
        <button className="border border-primary-01 w-[93px] h-[36px] flex items-center justify-center rounded-full py-1.5 px-4">
            <p className="text-[#EAEAEA] text-center">
                {formatCurrency(283.12)}
            </p>
        </button>
    )
}

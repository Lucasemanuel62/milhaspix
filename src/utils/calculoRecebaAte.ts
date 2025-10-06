/**
 * Calcula o valor máximo que o usuário pode receber baseado na lógica de milhas
 * @param mileValue - Valor por milheiro em R$ (ex: 16.50)
 * @param tipoProduto - Tipo do produto selecionado
 * @param cpfDisponiveis - Quantidade de CPFs disponíveis
 * @returns Valor máximo em R$ que o usuário pode receber
 */
export function calcularRecebaAte(
    mileValue: number,
    tipoProduto: string,
    cpfDisponiveis: number | string
): number {
    const multiplicadores = {
        'Liminar': 1000,
        'Convencional': 800,
        'Promoção': 1200,
        'Corporativo': 600,
        'Clube de Milhas': 1500,
        'Cashback': 500,
        'Parceiro': 900
    };

    const milhasBase = multiplicadores[tipoProduto as keyof typeof multiplicadores] || 1000;

    let cpfLimit = typeof cpfDisponiveis === 'number' ? cpfDisponiveis : 1;
    if (typeof cpfDisponiveis === 'string') {
        if (cpfDisponiveis.toLowerCase() === 'ilimitado') {
            cpfLimit = 10;
        } else {
            cpfLimit = parseInt(cpfDisponiveis) || 1;
        }
    }

    const valorBase = mileValue * milhasBase;
    const multiplicadorCpf = Math.min(cpfLimit * 0.8, 5);
    const valorFinal = valorBase * multiplicadorCpf;
    const fatorMilheiro = mileValue / 16.50;
    const resultado = valorFinal * fatorMilheiro;
    return isNaN(resultado) || resultado <= 0 ? 0 : resultado;
}

/**
 * Formata o valor para exibição
 */
export function formatarValorRecebaAte(valor: number): string {
    return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}

export function validarCpf(cpf: string): boolean {
    // Remove caracteres não numéricos
    const cpfLimpo = cpf.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos
    if (cpfLimpo.length !== 11) {
        return false;
    }
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpfLimpo)) {
        return false;
    }
    
    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpfLimpo.charAt(9))) {
        return false;
    }
    
    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    
    return resto === parseInt(cpfLimpo.charAt(10));
}

export function isCpfCompleto(cpf: string): boolean {
    const cpfLimpo = cpf.replace(/\D/g, '');
    return cpfLimpo.length === 11;
}

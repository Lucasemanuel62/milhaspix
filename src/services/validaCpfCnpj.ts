export default function validarCpfCnpj(doc: string): boolean {
    if (typeof doc !== "string") return false;

    const apenasNumeros = doc.replace(/\D/g, "");

    // ===== CPF =====
    if (apenasNumeros.length === 11) {
        if (/^(\d)\1+$/.test(apenasNumeros)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(apenasNumeros.charAt(i)) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(apenasNumeros.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(apenasNumeros.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;

        return resto === parseInt(apenasNumeros.charAt(10));
    }

    // ===== CNPJ =====
    if (apenasNumeros.length === 14) {
        if (/^(\d)\1+$/.test(apenasNumeros)) return false;

        let tamanho = 12;
        let numeros = apenasNumeros.substring(0, tamanho);
        const digitos = apenasNumeros.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado !== parseInt(digitos.charAt(0))) return false;

        tamanho++;
        numeros = apenasNumeros.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

        return resultado === parseInt(digitos.charAt(1));
    }

    // Não é CPF nem CNPJ válido em tamanho
    return false;
}


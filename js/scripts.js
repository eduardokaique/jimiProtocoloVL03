function validarInput() {
    // var inputProtocolo = document.getElementById('inputProtocolo').value;
    // const jsonData = fetch('https://64c7284b0a25021fde921e38.mockapi.io/pacoteProtocolo')
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.log(error));

    const jsonData = '{ "Nome": "Login", "Propriedades": [ { "Campo": "Start bit", "Tamanho": 4, "Descricao": "Pacotes de 1 bit: 0x78, pacotes de 2 bits: 0x79." }, { "Campo": "Tamanho do pacote", "Tamanho": 2, "Descricao": "" }, { "Campo": "Número de protocolo", "Tamanho": 2, "Descricao": "" }, { "Campo": "ID do Terminal", "Tamanho": 16, "Descricao": "" }, { "Campo": "Código de identificação do modelo", "Tamanho": 4, "Descricao": "" }, { "Campo": "Fuso horário", "Tamanho": 4, "Descricao": "", "Conversao": true }, { "Campo": "Identificação do número de sequencia", "Tamanho": 4, "Descricao": "" }, { "Campo": "Error check", "Tamanho": 4, "Descricao": "" }, { "Campo": "Stop Bit", "Tamanho": 4, "Descricao": "" } ] }';

    let pacotes = JSON.parse(jsonData);
    if (inputProtocolo.length == 44) {
        let login = pacotes.Propriedades;
        let protocolo = document.getElementById("protocolo");
        let posicaoAtual = 0;

        for (let index = 0; index < login.length; index++) {
            const campo = login[index].Campo;
            const tamanho = login[index].Tamanho;
            const conversao = login[index].Conversao;

            if (index == 0) {
                protocolo.innerHTML += "[Pacote Login]";
                protocolo.innerHTML += "<br />";
                protocolo.innerHTML += campo + ": " + inputProtocolo.substring(0, tamanho);
            }
            else {
                let value = inputProtocolo.substring(posicaoAtual, posicaoAtual + tamanho);
                if (conversao) {
                    let binValue = hex2bin(value);
                    value = binValue;
                }

                protocolo.innerHTML += "<br />";
                protocolo.innerHTML += campo + ": " + value;
            }
            posicaoAtual += tamanho;
        }
    }
}

function hex2bin(hex) {
    hex = hex.replace("0x", "").toLowerCase();
    var out = "";
    for (var c of hex) {
        switch (c) {
            case '0': out += "0000"; break;
            case '1': out += "0001"; break;
            case '2': out += "0010"; break;
            case '3': out += "0011"; break;
            case '4': out += "0100"; break;
            case '5': out += "0101"; break;
            case '6': out += "0110"; break;
            case '7': out += "0111"; break;
            case '8': out += "1000"; break;
            case '9': out += "1001"; break;
            case 'a': out += "1010"; break;
            case 'b': out += "1011"; break;
            case 'c': out += "1100"; break;
            case 'd': out += "1101"; break;
            case 'e': out += "1110"; break;
            case 'f': out += "1111"; break;
            default: return "";
        }
    }

    return out;
}
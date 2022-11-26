import chalk from "chalk";
import fs from "fs";
import pegaArquivo from "./index.js";

const caminho = process.argv;

function imprimeLista(resultado, identificador = ''){

    console.log(
        chalk.yellow('lista de links'),
        chalk.black.bgGreen(identificador),
        resultado);
} 

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3];
    console.log(valida);

    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if(erro.code === 'ENOENT') {
            console.log('Arquivo ou diretório não existe.');
            return
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultados = await pegaArquivo(caminho);
        imprimeLista(resultados);
    } else if (fs.lstatSync(caminho).isDirectory()){
        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async nomeDoArquivo => {
            const lista = await pegaArquivo(`${caminho}/${nomeDoArquivo}`);
            imprimeLista(lista, nomeDoArquivo);
        });
    }
}

processaTexto(caminho);
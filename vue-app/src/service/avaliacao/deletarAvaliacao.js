import { deletarAvaliacaoComentarioProfessor } from "@/repositories/avaliacao/deletarAvaliacoes";
import { deletarAvaliacaoComentarioMateria } from "@/repositories/avaliacao/deletarAvaliacoes";
import axios from 'axios';
import CryptoJS from 'crypto-js'; 
export async function deletarAvaliacaoProfessor(cod_avaliacao, cod_comentario) {
  try {
    // Obter a chave de descriptografia do servidor
    const responsekey = await axios.get('http://localhost:3000/chave');
    const key = responsekey.data;

    // Pegar a matrícula criptografada do session storage
    const encryptedMatricula = sessionStorage.getItem('matricula');
    
    if (!encryptedMatricula) {
      throw new Error('Matrícula não encontrada no session storage');
    }

    // Descriptografar a matrícula
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedMatricula, key);
    const matriculadec = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const matricula_url = parseInt(matriculadec, 10);

    // Chama a função para deletar a avaliação e o comentário
    const result = await deletarAvaliacaoComentarioProfessor(matricula_url, cod_avaliacao, cod_comentario);
    console.log(result.message); // Sucesso
  } catch (error) {
    console.error('Erro ao deletar a avaliação e comentário do professor:', error.message);
  }
}


export async function deletarAvaliacaoMateria(cod_avaliacao, cod_comentario) {
    try {
      // Obter a chave de descriptografia do servidor
      const responsekey = await axios.get('http://localhost:3000/chave');
      const key = responsekey.data;
  
      // Pegar a matrícula criptografada do session storage
      const encryptedMatricula = sessionStorage.getItem('matricula');
      
      if (!encryptedMatricula) {
        throw new Error('Matrícula não encontrada no session storage');
      }
  
      // Descriptografar a matrícula
      const decryptedBytes = CryptoJS.AES.decrypt(encryptedMatricula, key);
      const matriculadec = decryptedBytes.toString(CryptoJS.enc.Utf8);
      const matricula_url = parseInt(matriculadec, 10);
  
      // Chama a função para deletar a avaliação e o comentário
      const result = await deletarAvaliacaoComentarioMateria(matricula_url, cod_avaliacao, cod_comentario);
      console.log(result.message); // Sucesso
    } catch (error) {
      console.error('Erro ao deletar a avaliação e comentário da matéria:', error.message);
    }
  }
  
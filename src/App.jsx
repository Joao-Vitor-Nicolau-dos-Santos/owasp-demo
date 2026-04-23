import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function App() {
  const [password, setPassword] = useState('');
  
  // Simulação de armazenamento
  const vulnerableHash = password ? CryptoJS.MD5(password).toString() : '';
  const secureHash = password ? CryptoJS.SHA256(password + "SALT_FIXO_DO_SISTEMA").toString() : '';

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', minWidth: '800px', margin: '0 auto' }}>
      <h1 style={{fontSize:'50px'}}>Demonstração: A04 Falhas de Criptografia</h1>
      <p>Este site exemplifica como a escolha do algoritmo e do método afeta a segurança.</p>

      <div style={{ marginBottom: '20px' }}>
        <label><strong>Digite uma senha para o teste:</strong></label><br />
        <input 
          type="text" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ex: 123456"
          style={{ padding: '10px', width: '100%', marginTop: '10px', fontSize: '16px' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* LADO VULNERÁVEL */}
        <div style={{ border: '2px solid red', padding: '15px', borderRadius: '8px' }}>
          <h2 style={{ color: 'red' }}>Vulnerável</h2>
          <p><strong>Método:</strong> MD5 (Obsoleto)</p>
          <div style={{ wordBreak: 'break-all', background: '#fee', padding: '10px' }}>
            <strong>Texto no Banco:</strong><br />
            <code>{vulnerableHash || 'Aguardando...'}</code>
          </div>
          <p><small>⚠️ MD5 é vulnerável a ataques de colisão e tabelas arco-íris (Rainbow Tables).</small></p>
        </div>

        {/* LADO SEGURO */}
        <div style={{ border: '2px solid green', padding: '15px', borderRadius: '8px' }}>
          <h2 style={{ color: 'green' }}>Seguro (Recomendado)</h2>
          <p><strong>Método:</strong> SHA-256 + Salt</p>
          <div style={{ wordBreak: 'break-all', background: '#efe', padding: '10px' }}>
            <strong>Texto no Banco:</strong><br />
            <code>{secureHash || 'Aguardando...'}</code>
          </div>
          <p><small>✅ SHA-256 é um algoritmo forte. O "Salt" impede ataques de dicionário.</small></p>
        </div>

      </div>

      <section style={{ marginTop: '40px', padding: '20px', background: '#f4f4f4' }}>
        <h3>Por que isso é uma falha?</h3>
        <ul>
          <li><strong>Criptografia Fraca:</strong> Usar MD5 permite que um invasor descubra a senha original em segundos.</li>
          <li><strong>Falta de Salt:</strong> Sem salt, senhas iguais geram hashes iguais, facilitando a quebra em massa.</li>
          <li><strong>Dados em Trânsito:</strong> Se este site não usasse HTTPS (como o Vercel oferece), a senha "123456" viajaria em texto puro pela rede.</li>
        </ul>
      </section>
    </div>
  );
}

export default App;
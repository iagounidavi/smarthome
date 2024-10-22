// Comportamentos Esperados
// Luzes Inteligentes: Em todos os cômodos, as luzes podem ser ligadas e desligadas. O estado das luzes deve ser sincronizado entre todos os clientes, e qualquer mudança deve ser refletida imediatamente para todos os usuários conectados.
// Ar-Condicionado e Ventilador: O usuário pode ligar/desligar e ajustar a temperatura ou velocidade. Essas mudanças devem ser visíveis para todos os clientes conectados. Ao ajustar a temperatura do ar-condicionado ou a velocidade do ventilador, os valores devem ser exibidos na interface.
// Televisão: O controle da TV inclui ligar/desligar e mudar de canal. Os canais devem ser pré-definidos e exibidos na interface ao mudar.
// Geladeira Inteligente: A geladeira monitorará a temperatura interna e emitirá um alerta se a temperatura subir acima do limite definido. Este comportamento é monitorado automaticamente e o alerta deve aparecer na interface se a condição for verdadeira.
// Fogão Elétrico: O usuário pode ligar e desligar o fogão e ajustar o nível de potência. As mudanças de potência devem ser refletidas para todos os clientes.
// Cortinas Automáticas: O controle permite abrir ou fechar as cortinas. O estado das cortinas deve ser visível na interface e sincronizado com todos os clientes conectados

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import Sala from './Sala';
import { EstadoDispositivos } from './EstadosDispositivos';
const socket = io('http://localhost:4000');


const App: React.FC = () => {
    const [dispositivos, setDispositivos] = useState<EstadoDispositivos>({
        sala: {
            luzOn: false,
            tvOn: false,
            canalAtual: 1,
            arCondicionadoOn: false,
            temperatura: 24,
        },
        cozinha: {
            luzOn: false,
            geladeiraTemperatura: 4,
            alertaGeladeira: false,
            fogaoOn: false,
            fogaoPotencia: 1,
        },
        quarto: {
            luzOn: false,
            ventiladorOn: false,
            ventiladorVelocidade: 1,
            cortinasAbertas: false,
        },
    });

    useEffect(() => {
        socket.on('estadoInicial', (estadoDispositivos: EstadoDispositivos) => {
            setDispositivos(estadoDispositivos);
        });

        socket.on('estadoAltera', (novoEstado: EstadoDispositivos) => {
            setDispositivos(novoEstado);
        });

        return () => {
            socket.off('estadoInicial');
            socket.off('estadoAltera');
        };
    }, []);


    const acenderLuzCozinha = () => {
        socket.emit('acenderLuzCozinha');
    };

    const ligarFogao = () => {
        socket.emit('ligarFogao');
    };

    const ajustarGeladeira = () => {
        const novaTemperatura = dispositivos.cozinha.geladeiraTemperatura === 5 ? -2 : dispositivos.cozinha.geladeiraTemperatura + 1;
        socket.emit('verificarGeladeira', novaTemperatura);
    }

    const ajustarFogao = () => {
        const novaPotencia = dispositivos.cozinha.fogaoPotencia === 3 ? 1 : dispositivos.cozinha.fogaoPotencia + 1;
        socket.emit('ajustarFogao', novaPotencia);
    };

    const acenderLuzQuarto = () => {
        socket.emit('acenderLuzQuarto');
    };

    const ligarVentilador = () => {
        socket.emit('ligarVentilador');
    }

    const ajustarVentilador = () => {
        const novaVelocidade = dispositivos.quarto.ventiladorVelocidade === 3 ? 1 : dispositivos.quarto.ventiladorVelocidade + 1;
        socket.emit('ajustarVentilador', novaVelocidade);
    };

    const controlarCortinas = () => {
        socket.emit('controlarCortinas');
    };

    return (
        <div className='casa'>
            <h1 className='title'>Home Controller</h1>
            <img className='gremio' src="imgs/gremio.png" alt="" />
            <div className='container'>
                <div className="row">
                    <Sala />
                </div>

                <div className='row'>
                    <h2>Cozinha</h2>
                    <div className="btns">
                        <button onClick={acenderLuzCozinha} style={{ width: '91px' }}>
                            {dispositivos.cozinha.luzOn ? 'Desligar Luz' : 'Ligar Luz'}
                        </button>
                        <button onClick={ajustarGeladeira} style={{ width: '168px' }}>
                            {`Ajustar Temperatura`}
                        </button>
                        <button onClick={ligarFogao} style={{ width: '107px' }}>
                            {dispositivos.cozinha.fogaoOn ? `Desligar Fogão` : 'Ligar Fogão'}
                        </button>
                    </div>
                    <div className='acao'>
                        <div className='luzContainer'>
                            <img src='imgs\luz.png' className={`lampada status ${dispositivos.cozinha.luzOn ? 'on' : 'off'}`} />
                        </div>
                        <div className='geladeiraContainer'>
                            <img src='imgs\geladeira.png' className='geladeira' />
                            <p>Temperatura da Geladeira: {dispositivos.cozinha.geladeiraTemperatura}°C</p>
                        </div>
                        <div className='fogaoContainer'>
                            <div className={`fogo potencia-${dispositivos.cozinha.fogaoPotencia} ${dispositivos.cozinha.fogaoOn ? 'on' : 'off'}`}>
                            </div>
                            <img src='imgs\stove.png' className={`fogao status ${dispositivos.cozinha.fogaoOn ? 'on' : 'off'}`} />
                            {dispositivos.cozinha.fogaoOn && <button onClick={ajustarFogao} className='potencia'>{`(Potência: ${dispositivos.cozinha.fogaoPotencia})`}</button>}
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <h2>Quarto</h2>
                    <div className="btns">
                        <button onClick={acenderLuzQuarto} style={{ width: '91px' }}>
                            {dispositivos.quarto.luzOn ? 'Desligar Luz' : 'Ligar Luz'}
                        </button>
                        <button onClick={ligarVentilador} style={{ width: '128px' }}>
                            {dispositivos.quarto.ventiladorOn ? `Desligar Ventilador` : 'Ligar Ventilador'}
                        </button>
                        <button onClick={controlarCortinas} style={{ width: '111px' }}>
                            {dispositivos.quarto.cortinasAbertas ? 'Fechar Cortinas' : 'Abrir Cortinas'}
                        </button>
                    </div>
                    <div className='acao'>
                        <div className='luzContainer'>
                            <img src='imgs\luz.png' className={`lampada status ${dispositivos.quarto.luzOn ? 'on' : 'off'}`} />
                        </div>
                        <div className="ventiladorContainer">
                            <div className={`ventilador velocidade-${dispositivos.quarto.ventiladorVelocidade} ${dispositivos.quarto.ventiladorOn ? 'on' : 'off'}`}>
                                <div className="blade"></div>
                                <div className="blade"></div>
                                <div className="blade"></div>
                            </div>
                            {dispositivos.quarto.ventiladorOn && <button onClick={ajustarVentilador} className='velocidade'>{`(Velocidade: ${dispositivos.quarto.ventiladorVelocidade})`}</button>}
                        </div>
                        <div className="cortinasContainer">
                            <div className="janelaAbertaWidth">

                                <section className={`rnOuter ${dispositivos.quarto.cortinasAbertas ? 'open' : 'closed'}`}>
                                    
                                <section className="janela">
                                    <div className="janela2">
                                        <div className="window"></div>
                                        <div className="window"></div>
                                        <div className="window"></div>
                                        <div className="window"></div>
                                    </div>
                                </section>
                                    
                                    <div className='rnInner'>
                                        <div className='rnUnit'></div>
                                        <div className='rnUnit'></div>
                                        <div className='rnUnit'></div>
                                        <div className='rnUnit'></div>
                                        <div className='rnUnit'></div>
                                        <div className='rnUnit'></div>
                                        <div className='rnUnit'></div>
                                        <div className='rnUnit'></div>
                                        <div className='rnUnit'></div>
                                        <div className='rnUnit'></div>
                                        
                                    </div>
                                </section>
        
        
                            </div>
                        </div>
                    </div>
                </div>
                <p className='rodape'>Desenvolvido por Marcio Demarchi e Heitor Berischmeier</p>
            </div>
        </div>
    );
};

export default App;

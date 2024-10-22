UNIDAVI - Universidade de Desenvolvimento do Alto Vale do Itajaí

# Projeto Casa Inteligente

Este projeto tem como objetivo simular uma casa inteligente, na qual os dispositivos podem ser controlados remotamente através de uma interface web. A casa possui diferentes cômodos, cada um com dispositivos conectados que podem ser manipulados pelos usuários em tempo real, utilizando comunicação WebSocket para refletir as alterações de estado em múltiplos clientes simultaneamente.

## Objetivos do Projeto

### Objetivo Geral
Desenvolver uma aplicação de casa inteligente que simula o controle remoto de dispositivos conectados, aplicando conceitos de programação orientada a eventos com comunicação em tempo real.

### Objetivos Específicos
- Integrar Node.js com React para simular eventos em tempo real.
- Aplicar Programação Orientada a Eventos usando **socket.io** para comunicação entre frontend e backend.
- Manipular estados de dispositivos de forma sincronizada entre diferentes clientes.

## Cômodos e Dispositivos

### Sala de Estar
- **Luzes Inteligentes**: Ligar e desligar as luzes.  
  - Estados: Ligado/Desligado.
- **Televisão**: Ligar e desligar a TV, mudar de canal.  
  - Estados: Ligado/Desligado, Canal (lista de canais disponíveis).
- **Ar-Condicionado**: Ligar/desligar, ajustar temperatura.  
  - Estados: Ligado/Desligado, Temperatura (18°C a 30°C).

### Cozinha
- **Luzes Inteligentes**: Ligar e desligar as luzes.  
  - Estados: Ligado/Desligado.
- **Geladeira Inteligente**: Monitorar temperatura interna, emitir alertas.  
  - Estados: Temperatura interna, Alerta (>5°C).
- **Fogão Elétrico**: Ligar/desligar, ajustar potência.  
  - Estados: Ligado/Desligado, Potência (1 a 5).

### Quarto
- **Luzes Inteligentes**: Ligar e desligar as luzes.  
  - Estados: Ligado/Desligado.
- **Ventilador Inteligente**: Ligar/desligar, ajustar velocidade.  
  - Estados: Ligado/Desligado, Velocidade (1 a 3).
- **Cortinas Automáticas**: Abrir e fechar as cortinas.  
  - Estados: Aberto/Fechado.

## Comportamentos Esperados
- **Luzes Inteligentes**: Sincronizar o estado entre todos os clientes em tempo real.
- **Ar-Condicionado/Ventilador**: Ajustar temperatura ou velocidade e exibir o valor na interface.
- **Televisão**: Exibir lista de canais e estado atual.
- **Geladeira Inteligente**: Monitorar e emitir alertas se a temperatura exceder o limite.
- **Fogão Elétrico**: Ajustar potência e refletir nos clientes conectados.
- **Cortinas Automáticas**: Sincronizar estado de abertura/fechamento.

## Passo a Passo

### Configuração do Ambiente

#### Backend (Node.js)
1. Certifique-se de que o **Node.js** está instalado (`node -v`).
2. Instale o **TypeScript** globalmente:  
   ```bash
   npm install -g typescript

// importação do pacote mqtt
var mqtt = require('mqtt');

var server  = mqtt.connect('mqtt://test.mosquitto.org');

const LISTAR_CARDAPIO = 'listar-cardapio';
const CADASTRAR_ITEM = 'cadastrar-item';
const EXCLUIR_ITEM = 'excluir-item';
const MONTAR_PEDIDO = 'montar-pedido';
const SOLICITAR_ENTREGA = 'solicitar-entrega';
const CONSULTAR_PEDIDOS = 'consultar-pedidos';

const lanches = [];

const pedidos = [];

server.on('connect', function() {
  server.subscribe(LISTAR_CARDAPIO, function (err) {
      if (!err) {
          console.log("Subscrito no tópico '" + LISTAR_CARDAPIO + "' com sucesso!");
      }
  });

  server.subscribe(CADASTRAR_ITEM, function (err) {
      if (!err) {
          console.log("Subscrito no tópico '" + CADASTRAR_ITEM + "' com sucesso!");
      }
  });

  server.subscribe(EXCLUIR_ITEM, function (err) {
      if (!err) {
          console.log("Subscrito no tópico '" + EXCLUIR_ITEM + "' com sucesso!");
      }
  });
  server.subscribe(MONTAR_PEDIDO, function (err) {
      if (!err) {
          console.log("Subscrito no tópico '" + MONTAR_PEDIDO + "' com sucesso!");
      }
  });

  server.subscribe(SOLICITAR_ENTREGA, function (err) {
      if (!err) {
          console.log("Subscrito no tópico '" + SOLICITAR_ENTREGA + "' com sucesso!");
      }
  });

  server.subscribe(CONSULTAR_PEDIDOS, function (err) {
      if (!err) {
          console.log("Subscrito no tópico '" + CONSULTAR_PEDIDOS + "' com sucesso!");
      }
  });
});

server.on('message', function(topic, message) {

    switch(topic) {
      case LISTAR_CARDAPIO:
        server.publish('resultado-'+LISTAR_CARDAPIO, JSON.stringify(lanches));

        break;

      case CADASTRAR_ITEM:
        const tempLanche = JSON.parse(message);

        const ids = lanches.map((lanche) => {
          return lanche.id;
        });
      
        if (ids.length > 0){
          let max = 0;
          ids.map((id) => {
            if (id > max){
              max=id;
            }
          });
          lanches.push({...tempLanche, id: max + 1});
        } else{
          lanches.push({...tempLanche, id: 0});
        }

        server.publish('resultado-'+CADASTRAR_ITEM, 'Item cadastrado');

        break;
          
      case EXCLUIR_ITEM:
        const id = parseInt(message);

        const temp = lanches.find((lanche) => lanche.id == id);
        if (temp !== undefined){
          lanches.splice(lanches.indexOf(temp),1);
          server.publish('resultado-'+EXCLUIR_ITEM, 'Item deletado');
        } else{
          server.publish('resultado-'+EXCLUIR_ITEM, 'Id não encontrada');
        }
          
        break;    

      case MONTAR_PEDIDO:
        const ids2 = JSON.parse(message).ids;

        const lanchesPedido = lanches.filter((lanche) => ids2.indexOf(lanche.id)>-1);

        if (lanchesPedido.length == ids2.length){
          const pedidosIds = pedidos.map((pedido) => {
            return pedido.id;
          });
        
          if (pedidosIds.length > 0){
            let max = 0;
            pedidosIds.map((id) => {
              if (id > max){
                max=id;
              }
            });
            pedidos.push({id: max + 1, lanches: lanchesPedido, status: ""});
          } else{
            pedidos.push({id: 0, lanches: lanchesPedido, status: ""});
          }

          server.publish('resultado-'+MONTAR_PEDIDO, 'Pedido cadastrado');
        }else {
          server.publish('resultado-'+MONTAR_PEDIDO, 'Um ou mais lanche(s) não encontrado(s)');
        }  

        break;

      case SOLICITAR_ENTREGA:
        const id2 = parseInt(message);

        const temp2 = pedidos.find((pedido) => pedido.id == id2);
        if (temp2 !== undefined){
          pedidos.splice(pedidos.indexOf(temp2),1);
          pedidos.push({...temp2, status: "Sair para entrega"});
          server.publish('resultado-'+SOLICITAR_ENTREGA, 'Entrega solicitada');
        } else{
          server.publish('resultado-'+SOLICITAR_ENTREGA, 'Pedido não encontrado');
        }

        break;
          
      case CONSULTAR_PEDIDOS:
        server.publish('resultado-'+CONSULTAR_PEDIDOS, JSON.stringify(pedidos));

        break;    
    }

    console.log(message.toString());
});
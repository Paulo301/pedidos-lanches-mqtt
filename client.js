var mqtt = require('mqtt');

var client  = mqtt.connect('mqtt://test.mosquitto.org');

const LISTAR_CARDAPIO = 'listar-cardapio';
const CADASTRAR_ITEM = 'cadastrar-item';
const EXCLUIR_ITEM = 'excluir-item';
const MONTAR_PEDIDO = 'montar-pedido';
const SOLICITAR_ENTREGA = 'solicitar-entrega';
const CONSULTAR_PEDIDOS = 'consultar-pedidos';

const lanche1 = {
  nome: "misto",
  preco: 16.99
};

const lanche2 = {
  nome: "hamburguer",
  preco: 17.99
};

const lanche3 = {
  nome: "cachorro-quente",
  preco: 18.99
};

client.on('connect', function() {
  // client.subscribe('resultado-'+CADASTRAR_ITEM, function (err) {
  //   if (!err) {
  //     console.log("Subscrito no tópico "+'resultado-'+CADASTRAR_ITEM+" com sucesso!");

  //     client.publish(CADASTRAR_ITEM, JSON.stringify(lanche1));

  //     client.publish(CADASTRAR_ITEM, JSON.stringify(lanche2));

  //     client.publish(CADASTRAR_ITEM, JSON.stringify(lanche3));
  //   }
  // });

  // client.subscribe('resultado-'+LISTAR_CARDAPIO, function (err) {
  //   if (!err) {
  //     console.log("Subscrito no tópico "+'resultado-'+LISTAR_CARDAPIO+" com sucesso!");

  //     client.publish(LISTAR_CARDAPIO, "");
  //   }
  // });

  // client.subscribe('resultado-'+EXCLUIR_ITEM, function (err) {
  //   if (!err) {
  //     const id = 0;
  //     console.log("Subscrito no tópico "+'resultado-'+EXCLUIR_ITEM+" com sucesso!");

  //     client.publish(EXCLUIR_ITEM, id.toString());
  //   }
  // });

  // client.subscribe('resultado-'+MONTAR_PEDIDO, function (err) {
  //   if (!err) {
  //     const ids = {ids: [1,2]};

  //     console.log("Subscrito no tópico "+'resultado-'+MONTAR_PEDIDO+" com sucesso!");

  //     client.publish(MONTAR_PEDIDO, JSON.stringify(ids));
  //   }
  // });

  // client.subscribe('resultado-'+SOLICITAR_ENTREGA, function (err) {
  //   if (!err) {
  //     const id = 0;
  //     console.log("Subscrito no tópico "+'resultado-'+SOLICITAR_ENTREGA+" com sucesso!");

  //     client.publish(SOLICITAR_ENTREGA, id.toString());
  //   }
  // });

  // client.subscribe('resultado-'+CONSULTAR_PEDIDOS, function (err) {
  //   if (!err) {
  //     console.log("Subscrito no tópico "+'resultado-'+CONSULTAR_PEDIDOS+" com sucesso!");

  //     client.publish(CONSULTAR_PEDIDOS, "");
  //   }
  // });

});

client.on('message', function (topic, message) {

  switch(topic) {
    case 'resultado-'+LISTAR_CARDAPIO:
      const lanches = JSON.parse(message.toString());

      console.log("Cardapio:");
      lanches.map(lanche => {
        console.log(lanche.nome+"........."+lanche.preco)
      })

      break;

    case 'resultado-'+CADASTRAR_ITEM:
      console.log(message.toString());
      break;
        
    case 'resultado-'+EXCLUIR_ITEM:
      console.log(message.toString());
      break;    

    case 'resultado-'+MONTAR_PEDIDO:
      console.log(message.toString());
      break;

    case 'resultado-'+SOLICITAR_ENTREGA:
      console.log(message.toString());
      break;
        
    case 'resultado-'+CONSULTAR_PEDIDOS:
      const pedidos = JSON.parse(message.toString());

      console.log("Pedidos:");
      console.log(pedidos);

      break;    
  }

});
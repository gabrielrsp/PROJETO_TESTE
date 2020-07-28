// playground requires you to assign document definition to a variable called dd

var dd = {
  content: [
 'Tabela de Clientes:',
    {
      style: 'tableExample',
      table: {
        heights: 20,
         widths: [120, 400],
        body: [
          ['ID', 'column B'],
          ['Nome', 'column B'],
          ['CPF', 'column B'],
          ['Fone', 'column B'],
          ['Data de Nascimento', 'column B'],
          ['Data de Cadastro', 'column B']
        ]
      }
    },
    '         ',
    '         ',
    'Tabela de Endereços:',
    {
      style: 'tableExample',
      table: {
        widths: [100, '*', 100, '*'],
        body: [
            ['Endereços', 'Residencial', 'Comercial', 'Cobrança'],
            ['Logradouro', {text: 'nothing interesting here'}, {text: 'g here'}, {text: 'ting here'}],
            ['Bairro', {text: 'nothing interesting here'}, {text: 'g here'}, {text: 'ting here'}],
            ['CEP', {text: 'nothing interesting here'}, {text: 'g here'}, {text: 'ting here'}],
            ['Cidade', {text: 'nothing interesting here'}, {text: 'g here'}, {text: 'ting here'}],
            ['UF',  {text: 'nothing interesting here'} , {text: 'g here'}, {text: 'ting here'}],
        ]
      }
    },
  ]

}

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
			    widths: [65, 95, 95, 85, 95, 50  ],
				headerRows: 1,
				body: [
                    [{text: 'Endereços' }, {text: 'Logradouro'}, {text: 'Bairro'}, {text: 'CEP'}, {text: 'Cidade'}, {text: 'UF'}],
					['Residencial', 'Sample value 2', 'Sample value 3', 'Sample value 4', 'Sample value 4',  'Sample value 4' ],
					['Comercial', 'Sample value 2', 'Sample value 3', 'Sample value 4', 'Sample value 4', 'Sample value 4'    ],
					['Cobrança', 'Sample value 2', 'Sample value 3', 'Sample value 4', 'Sample value 4', 'Sample value 4'     ],

				]
			},

		}
  ]

}

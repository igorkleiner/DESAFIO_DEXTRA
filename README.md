# Instruções de utilização:

1. Baixe o código 

```sh
git clone https://github.com/igorkleiner/DESAFIO_DEXTRA.git
```

2. Entre na pasta onde o projeto foi clonado e execute os comandos a seguir

```sh
$ cp .env.example .env

$ php artisan key:generate

$ composer install

$ php artisan serve --port 8000
```

3. Abra seu browser na porta 8000 [http://localhost:8000](http://localhost:8000)

A tela deve apresentar um cardapio básico com os lanches.
Clique em solicitar, e o lanche sera adicionado ao campo do pedido.
Varios lanches podem ser adicionados ao pedido.
Edite os lanches e clique em calcular.

O Retorno do calculo da conta aparece em um modal com as descrições dos
valores individuais dos lanches, as promoções ao quao o lanche se enquadrou, o valor do
desconto aplicado, o valor total do lanche e uma somatoria total da conta.

O nome do lanche pode ser editado também para compor novos tipos.
Novos tipos não serão adicionados ao cardapio ( cardapio default.);

## Tecnologias utilizadas:

*  LARAVEL PHP Framework (Back-End) [conhça mais sobre Laravel](https://laravel.com):
   * Promove solidez nos requests, e quando utilizado com as encriptações, permite trafego seguro de informações.
* KNOCKOUTJS (Front-End) [conheça mais sobre Knockoutjs](https://knockoutjs.com):
    * Tem facil adaptação dentro de qualquer framework de backend e agrega muita performance para o front-end.

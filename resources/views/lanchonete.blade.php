@extends('welcome')
@section('title','Lanchonete Dextra')
@section('content')

	<div class="row" id="cardapio">
		<div class="col-md-12">
			ESTOU AQUI MUCHACHO
		</div>
	</div>

	<script type="text/javascript">
		function Ingrediente(nome,qtd,preco){
			var self   = this;
			self.nome  = nome;
			self.qtd   = ko.observable(qtd);
			self.preco = preco;

		}

		function Lanche(lancheNome)
	    {
			var self           = this;
			self.selecionado   = ko.observable(false);
			self.lancheNome    = ko.observable(lancheNome);
			self.ingredientes  = ko.observableArray();
		}

		function Cardapio(){
			var self = this;
			self.lanches = null;
			function getMenu(){
				var callback = function(dados){
					// aqui não consigo dar foreach
					console.log(dados.response);
					
				}
				globalViewModel.ajax("{{Route('getMenu')}}", {teste:true},callback);               
			}
			setTimeout(function(){
				getMenu();
			},500);
		}

		function Pedido(){
			var self = this;
			self.lanches = ko.observableArray();

		}

	    var cardapio = new Cardapio;
	    var pedido = new Pedido;
	    
	    $(function()
	    {
	        ko.applyBindings(cardapio,document.getElementById('cardapio'));
	        ko.applyBindings(pedido,document.getElementById('pedido'));
	    });
	</script>

@stop
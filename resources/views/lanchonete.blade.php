@extends('welcome')
@section('title','Lanchonete Dextra')
@section('content')

	<div class="row" id="cardapio">
		<div class="col-md-12" data-bind="with:cardapio">
			<table class="table table-bordered table-striped">
				<thead>
					<tr class='warning'>                     
	                    <th >Cardapio</th>
	                    <th ><span data-bind="text:nome"></th>
	                    <th ></th>
	                </tr>
	                <tr class='warning'>                     
	                    <th >Ação</th>
	                    <th >Lanche</th>
	                    <th >Ingredientes</th>
	                </tr>
	            </thead>
	            <tbody data-bind="foreach:lanches">
	                <tr class='warning'>
	                	<td><button class= "btn btn-primary pull-center"  data-bind = " click:pedir">Solicitar</button></td>
	                    <td><span data-bind="text:lancheNome"></span></td>
	                    <td data-bind="foreach:ingredientes">
	                		<!-- ko if: qtd() > 0 -->
	                    		<span data-bind="text:nome"> </span> &nbsp &nbsp
	                    	<!-- /ko -->
	                    </td>
	                </tr>            	
	            </tbody>
	        </table>
		</div>



		<br>
		<br>
		<br>



		<div class="col-md-12" data-bind="with:pedido">
			<table class="table table-bordered table-striped">
				<thead>
					<tr class='warning'>                     
	                    <th ><button class= "btn btn-success pull-center"  data-bind = " click:calcular">Calcular</button></th>
	                    <th >Pedido</th>
	                    <th ><span data-bind="text:nome"></th>
	                </tr>
	                <tr class='warning'>                     
	                    <th >Ação</th>
	                    <th >Lanche</th>
	                    <th >Ingredientes</th>
	                </tr>
	            </thead>
	            <tbody data-bind="foreach:lanches">
	                <tr class='warning'>
	                	<td>
	                    	<button class= "btn btn-success pull-center"  data-bind = " click:editar">Editar</button></span>
	                    </td>
	                    <td>
	                    	<span data-bind="text:lancheNome"></span>
	                    </td>
	                    <td data-bind="foreach:ingredientes">
	                		<!-- ko if: qtd() > 0 -->
	                    		<span data-bind="text:nome"> </span> &nbsp &nbsp
	                    	<!-- /ko -->
	                    </td>
	                </tr>            	
	            </tbody>
	        </table>
		</div>
	<!-- Modal -->
		<div id='lancheModal' class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
			<div class="modal-dialog modal-lg">
				<div class="modal-content" data-bind= "with:lancheModal">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
						<h4 class="modal-title">Editar Lanche</h4>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class=" col-md-12">        
								<table class="table table-bordered table-striped">
									<thead>
										<tr>                
											<th >Nome</th>
											<th >Ingredientes</th>
											<th >Adicionar</th>
										</tr>    
									</thead>
									<tbody>
										<tr>
											<td><input type='text' data-bind="value:lancheNome"></input></td>
											<td data-bind="foreach:ingredientes">
												<!-- ko if: qtd() > 0 -->
												<span data-bind="text:nome"> </span> &nbsp &nbsp
												<!-- /ko -->
											</td>
											<td data-bind="with:viewModel">
		                                    <select class="btn btn-default dropdown-toggle pull-center" data-bind="
		                                        options:$root.selectIngrediente,
		                                        optionsValue:'nome',
		                                        optionsText:'nome',                            
		                                        value:ingredienteSelecionado,
		                                        optionsCaption:'selecione'
		                                        "></select>
		                                    </td>
		                                </tr>
		                            </tbody>                                    
		                        </table>
		                    </div>
		                </div>
		            </div>
		            <div class="modal-footer">
		            	<!-- <button type="button" class="btn btn-danger" data-bind= "click:excluir" >Excluir</button> -->
		            	<!-- <button type="button" class="btn btn-success" data-bind= "click:salvar">Salvar</button> -->
		            	<button type="button" class="btn btn-info" data-bind= "click:cancelar" >Cancelar</button>
		            </div>
		        </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		</div>
	<!-- /.modal -->
	</div>

	<script type="text/javascript">
		function Ingrediente(nome,object){
			var self   = this;
			self.nome  = nome;
			self.qtd   = ko.observable(object.qtd);
			self.preco = object.preco;
		}

		function Lanche(lancheNome, ingredientes)
	    {
			var self           = this;
			self.selecionado   = ko.observable(false);
			self.lancheNome    = ko.observable(lancheNome);
			self.ingredientes  = ko.observableArray(ingredientes);
			self.ingredientesOriginal = ingredientes;
			
			self.pedir = function(){
				viewModel.pedido().lanches.push(self);
			}
			self.editar = function(){
				viewModel.lancheModal(self);
				debugger
				$("#lancheModal").modal('show');
			}
			self.cancelar = function()
	        {
	            self.ingredientes(self.ingredientesOriginal);
	            $("#lancheModal").modal('hide');
	            console.log("cancelou");
	        }
		}

		function Cardapio(lanches){
			var self = this;
			self.nome = ko.observable("Lanchonete Dextra");
			self.lanches = ko.observableArray(lanches);
		}

		function Pedido(){
			var self = this;
			self.nome = ko.observable("Meu Pedido");
			self.lanches = ko.observableArray();
			self.calcular = function(){
				var callback = function(dados){
					console.log(dados);
				}
				var nome;
				var ingredientes;
				var dadosPost = {
					dados : JSON.parse(ko.toJSON(self.lanches()))
				};
				globalViewModel.ajax("{{Route('calculate')}}", dadosPost ,callback);

			}
			
		}

		function ViewModel(){

			var self = this;
			self.cardapio    = ko.observable();
			self.pedido      = ko.observable(new Pedido());
			self.lancheModal = ko.observable();
			self.selectIngrediente = [];
			// self.selectIngrediente = ko.observableArray();
			self.ingredienteSelecionado = ko.observable();
			

			self.getMenu = function (){
				var callback = function(dados){
					var cardapio = dados.response;
					var lanches = [];
					var conteudo = [];
					ko.utils.arrayMap(Object.keys(cardapio), function(l) {
						ko.utils.arrayMap(Object.keys(cardapio[l]), function(i) {
							conteudo.push(new Ingrediente(i,cardapio[l][i]));
						}) 
						lanches.push(new Lanche(l,conteudo));
						conteudo = [];
					})
					self.cardapio(new Cardapio(lanches));
				}
				globalViewModel.ajax("{{Route('getMenu')}}", {},callback);               
			}
			self.getIngredientes = function(){
				var callback = function(dados){
					// console.log(dados);
					debugger;
					ko.utils.arrayMap(Object.keys(dados.response), function(i) {
						self.selectIngrediente.push({ i : dados.response[i] });
					}) 
					console.log(self.selectIngrediente);
					// console.log(self.selectIngrediente());
				}
				globalViewModel.ajax("{{Route('getIngredientes')}}", {},callback);
			}
			setTimeout(function(){
				self.getIngredientes();
				self.getMenu();
			},50);
		}

	    var viewModel = new ViewModel;
	    
	    
	    $(function()
	    {
	        ko.applyBindings(viewModel,document.getElementById('cardapio'));
	    });
	</script>

@stop
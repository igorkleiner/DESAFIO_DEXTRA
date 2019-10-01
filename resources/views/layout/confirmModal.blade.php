<div id="confirm-modal" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog">
	<!-- Modal content-->
		<div class="modal-content">
			<div class="modal-header">
				<h3 class="text-center">
					<strong name="title"></strong>
				</h3>
			</div>
			<div class="modal-body">
				<p id="confirm-modal-msg" class="text-center"></p>
			</div>
			<div class="modal-footer">
				<button id="btn-modal-confirm-cancel" type="button" data-dismiss="modal" class="btn" style="margin:auto;">
					Não
				</button>
				<button id="btn-modal-confirm-ok" type="button" data-dismiss="modal" class="btn btn-info" style="margin:auto;">
					Sim
				</button>
			</div>
		</div>
	</div>
</div>

<div id="alert-modal" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h3 class="text-center">
					<strong name='title'></strong>
				</h3>
			</div>
			<div class="modal-body">
				<p id="alert-msg" class="text-center"></p>
			</div>
			<div class="modal-footer">
				<button type="button" data-dismiss="modal" class="btn btn-info" style="margin:auto;">OK</button>
			</div>
		</div>
	</div>
</div>

<div id="loading-modal" class="modal fade" role="dialog" data-backdrop="static" data-keyboard="false"
    style="z-index: 9999;">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="text-center">
                    <strong>LOADING...</strong>
                </h3>
            </div>
            <div class="modal-body">
                <p class="text-center">
                    <img src="{{asset('images/bx_loader.gif')}}">
                </p>
            </div>
        </div>
    </div>
</div>




<script type="text/javascript">
	
	
	function confirmModal(msg, callbackOk, callbackCancelar, title)
	{

		//MODO DE USAR
		//@paran msg mensagem de exibição da tela
		//@paran callbackOk tipo function(){} não necessário.. padrão fechar o modal
		//@paran callbackCancelar tipo function(){} não necessário.. padrão fechar o modal
		//@paran title não é necessário caso enviar irá aparecer titulo na pagina

		//ex: confirmModal('#000', 'mensagem de texto', function(){alertModal(null, 'msg de alerta')});
	
		// if (COR_BOTAO_MODAL != undefined)
		// {
		// 	$("#btn-modal-confirm-ok").css("background-color", COR_BOTAO_MODAL);
		// 	$("#btn-modal-confirm-ok").css("color", '#fff');
		// }

		$("#confirm-modal strong[name=title]").html(title != undefined ? title : "");
		$("#confirm-modal-msg").html(msg);
		$("#confirm-modal").modal("show");

		$("#btn-modal-confirm-ok").unbind("click");
		$("#btn-modal-confirm-cancel").unbind("click");

		$("#btn-modal-confirm-ok").on(
			"click",
			callbackOk != undefined
				? 	function (keep) 
					{
						setTimeout(function ()
						{
							callbackOk();
						}, 1);

						if (!keep)
						{
							$("#confirm-modal").modal("hide");
						}
					} 
				: 	function ()
					{
						$("#confirm-modal").modal("hide");
					}
		);

		$("#btn-modal-confirm-cancel").on("click",
			callbackCancelar != undefined 
				? 	function ()
					{
						setTimeout(function ()
						{
							callbackCancelar();
						}, 1);

						$("#confirm-modal").modal("hide");
					} 
				: 	function ()
					{
						$("#confirm-modal").modal("hide");
					}
		);
	}
	
	function alertModal(msg, title, setWidth)
	{
		//MODO DE USAR
		//@paran color não é necessáriom caso enviar usar cor em hexadecima. ex:#ffffff
		//@paran msg mensagem de exibição da tela
		//@paran title não é necessário caso enviar irá aparecer titulo na pagina

		//ex: alertModal(null, 'msg de alerta');

		$("#alert-modal #alert-msg").html(msg);
		$("#alert-modal strong[name=title]").html(title !=undefined ? title : '');
		$("#alert-modal").modal("show");
	}

	function loadingModal(msg, n) {
        if (msg == "show") {
            if (n != undefined) {
                $("#loading-modal-total").html(n);
                $("#loading-modal-count").html(0);
                $("#loading-modal-text").removeClass("hidden");
            }
            else {
                $("#loading-modal-text").addClass("hidden");
            }

            $("#loading-modal").modal("show");
        }
        else if (msg == "update") {
            if (n != undefined) {
                $("#loading-modal-count").html(n);
            }
            else {
                $("#loading-modal-text").addClass("hidden");
            }
        }
        else if (msg == "hide") {
            $("#loading-modal").modal("hide");
        }
    }

	
</script>
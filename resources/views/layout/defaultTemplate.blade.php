<html>
	<head>
		<meta charset="utf-8">
	    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	    <meta name="viewport" content="width=device-width, initial-scale=1">
	    <title>
	    	@yield('title')
	    </title>
		@include('layout.head')
	</head>

	<style>
		.body {background-color: rgba(6, 75, 65, 0.41);}
	</style>
	  
	<body>
		<div style="padding: 5px;">		
			@include('componentes.knockoutComponents')
			@include('layout.confirmModal')								
			<div class="container">
				@yield('content')
			</div>	
		</div>		
	</body>
</html>
	@include('layout.footer')
	<script type="text/javascript">

		function GlobalViewModel()
		{
			var self = this;

			self.submit = function(url, dadosPost, callback)
			{
				$("#loading-modal").modal('show');
				$.post(url, dadosPost)
					.done(function(response){
						console.log(JSON.parse(response));
						callback(JSON.parse(response));
					})
					.fail(function(error){
						$("#alert-modal #alert-msg").html(error.statusText);
						$("#alert-modal").modal('show');
					})
					.always(function(done){
						$("#loading-modal").modal('hide');
					});
			}

			self.ajax = function(url, dadosPost, callback)
			{
				// $("#loading-modal").modal('show');
				var headers = {
			       'X-CSRF-TOKEN':"{{csrf_token()}}"
			    }
			    console.log('headers'+ JSON.stringify(headers));
				$.ajax({
			        url:url,
			        data:dadosPost,
			        dataType:'json',
			        method:'post',
			        headers:headers
			    })
			    .done(function(response){
			        if(typeof(callback) == 'function') callback(response);
			    })
			    .fail(function(error, textStatus, jqXHR){
			        console.log(error);
			        Alert.error('Ocorreu um erro, contate o administrador do sistema!!!', 'Ops...');
			    })
			    .always(function(error, textStatus, jqXHR){
			        $("#loading-modal").modal('hide');
			    });
			}
		}
		var globalViewModel = new GlobalViewModel();
	</script>
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
            <div class="container">
                @include('layout.head') 
                @include('layout.confirmModal') 
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

            self.ajax = function(url, dadosPost, callback)
            {
                // $("#loading-modal").modal('show');
                var headers = {
                   'X-CSRF-TOKEN':"{{csrf_token()}}"
                }
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
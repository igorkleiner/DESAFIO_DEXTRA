<?php

namespace App\Http\Traits;

// @author IGOR KLEINER <igor_kleiner@hotmail.com> date 03/2019
	use Exception;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Facades\Log;
    // use App\Exceptions\NegocioException;

trait InterceptorHandler
{
    public function interceptService($request)
    {
		// debug($request[0]);
		// DB::listen(function ($query) 
		// {
		// 	debug([
		// 		$query->sql,
		// 		$query->bindings,
		// 		$query->time,
		// 	]);
		// });

		if($request[0]['Request']['token'] == sha1('isneverscrivesdovertouch'))
		{
	    	$content = null;

	        $timeStart = microtime(true);


	        DB::transaction(function() use($request, $timeStart, &$content)
	        { 
	            try
	            {
					$request = $request[0]['Request'];
					$servico = $request['Service'];
					$metodo  = $request['Method'];
					$params  = $request['Params'];
					$user    = $params['USUARIO'];
					$service = "\App\Http\Services\\{$servico}";
					$logClass = "App\Http\Services\LogService";

					$logger = new $logClass;
					$classe = new $service;

					$content = ['status' => 1, 'response' => $classe->$metodo($params)];
					
		    		$evento = [
						'usu_id'     => $user['usu_id'],
						'usu_nome'   => $user['usu_nome'],
						'data'       => now(),
						'servico'    => $servico,
						'metodo'     => $metodo,
						'parametros' => json_encode($params),
					];
					
					$logger->registrarAtividade($evento);
					
					Log::info(
						"'".$user['usu_id'].'- '.$user['usu_nome']." action: '".
						$servico."@".$metodo ." Time: " .round((microtime(true) - $timeStart) * 1000) . " ms"
					);
	            }
	            catch(Exception $exc)
	            {
					$content = ['status' => 0, 'message' => $exc->getMessage()];
					Log::info(' ==================================================== ');
					Log::info(' =============>  OCORRREU UM PROBLEMA  <============= ');
					Log::info(' =================>  INFORMACOES   <================= ');
					Log::info(' ==================================================== ');

					Log::info(
						"'".$user['usu_id'].'- '.$user['usu_nome']." action: '".
						$servico."@".$metodo ." Time: " .round((microtime(true) - $timeStart) * 1000) . " ms"
					);
					
					Log::info($exc->getMessage());
					Log::info($exc->getTraceAsString());
					Log::info(' ==================================================== ');
	            }
	        }); 

	        return $content;  
		}
		else
		{
			return ['status'=>0, 'message'=>"Access denied"];  
		}
    }
}
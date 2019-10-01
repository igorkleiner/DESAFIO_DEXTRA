<?php

namespace App\Http\Traits;

 // @author IGOR KLEINER <igor_kleiner@hotmail.com> date 03/2019

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Exception;



trait MakeRequest
{
	public function callService($class, $method, array $params = array()) /*array $data = array()*/
	{
		$timeStart = microtime(true);
		$content = null;

		try
		{
           $service = "\App\Http\Services\\{$class}";
           $classe = new $service;
           $content = ['status' => 1, 'response' => $classe->$method($params)];
           Log::info("'user action: '".$class."@".$method ."(".json_encode($params).")" ." Time: " .round((microtime(true) - $timeStart) * 1000) . " ms");

		} catch (Exception $e){
		 	$content = ['status' => 0, 'message' => $e->getMessage()];
            Log::info(' =================================================');
            Log::info(' ==========>  OCORRREU UM PROBLEMA  <=============');
            Log::info(' ===============>  INFORMACOES  <=================');
            Log::info(' =================================================');
            Log::info("'user action: '".$class."@".$method ." Time: " .round((microtime(true) - $timeStart) * 1000) . " ms");
            Log::error($e->getMessage());
            Log::error($e->getTraceAsString());
        }
		 return $content;
	}

    /*
     * Funcionamento:
     * É criado um padrão de requests para a camada de negocio, em json.
     * A camada de negocio sabe que deve interceptar este request e instanciar a classe Service referenciada,
     * chamar o metodo referenciado e passar para este método os parametros para tratamento. 
     */
	public  function callService_api($servico, $metodo, array $params = array())
    {
        try
        {
            $timeStart = microtime(true);
            
            $accessToken = 'xQWOrWrtJuyMwglGD2tAL7sRh8OUjCy9N11Ku3ga6DYv6mQmQXbkD19aGpya';
           

            $params['USUARIO'] = [
                'usu_id'       => Auth::user()->usu_id,
                'usu_nome'     => Auth::user()->usu_nome,
            ];

            $configs = json_encode([
                'Request'   => [
                    'token'        => sha1('isneverscrivesdovertouch'),
                    'api-token'    => $accessToken,
                    'Service'      => $servico,
                    'Method'       => $metodo,
                    'Params'       => $params
                ]
            ]);

            $url = Config::get('app.webservice-endpoint');

            $ch = self::configCurl($url,$accessToken,$configs,$params);
            $result = curl_exec($ch);
            curl_close($ch);

             debug([$result]);

            $encoding = mb_detect_encoding($result);

            if($encoding == 'UTF-8')
            {
              $result = preg_replace('/[^(\x20-\x7F)]*/','', $result);    
            } 

            $user = Auth::user()->usu_id.'- '.Auth::user()->usu_nome;
            Log::info("'".$user." action: '".$servico."@".$metodo ." Time: " .round((microtime(true) - $timeStart) * 1000) . " ms");
            return json_decode($result);
        } 
        catch (Exception $erro)
        {
            Log::debug('==============> ERRO AO CHAMAR CAMADA DE NEGOCIO <==================');
            Log::debug('~~~~ Informacoes => ' . var_export($erro, true));
            Log::info("'".$user." action: '".$servico."@".$metodo ." Time: " .round((microtime(true) - $timeStart) * 1000) . " ms");
            throw new Exception("Ocorreu um erro. Verifique os LOGS");
        }
    }

    public static function configCurl($url,$accessToken,$configs,$params)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_SSLVERSION, 3);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $configs);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Length: ' . strlen($configs),
            'Content-Type: application/json',
            'Accept: application/json',
            'Authorization: Bearer '.$accessToken,
        ));
        return $ch;
    }
}
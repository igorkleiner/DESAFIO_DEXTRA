<?php

namespace App\Http\Services;

class LanchoneteService{
	
	public function getIngredientes(){
    	return [
    		'hamburguerDeCarne' =>3,
    		'bacon'             =>2,
    		'queijo'            =>1.5,
    		'ovo'               =>0.8,
    		'alface'            =>0.4
    	];
    }


    public function getMenu(){

    	$ingrediente = $this->getIngredientes();
    	
    	return [
    		// 'meuSanduba'=>[
    			// 'ovo'=>[
    			// 	'qtd'=>1,
    			// 	'preco'=>$ingrediente['ovo']
    			// ],

    			// 'bacon'=>[
    			// 	'qtd'=>0,
    			// 	'preco'=>$ingrediente['bacon']
    			// ],
    			// 'hamburguerDeCarne'=>[
    			// 	'qtd'=>5,
    			// 	'preco'=>$ingrediente['hamburguerDeCarne']
    			// ],
    			// 'queijo'=>[
    			// 	'qtd'=>7,
    			// 	'preco'=>$ingrediente['queijo']
    			// ],
    			// 'alface'=>[
    			// 	'qtd'=>1,
    			// 	'preco'=>$ingrediente['alface']
    			// ]
    		// ],
    		'xBacon'    =>[
    		 	'bacon'=>[
    		 		'qtd'=>1,
    		 		'preco'=>$ingrediente['bacon']
    		 	],
    		 	'hamburguerDeCarne'=>[
    		 		'qtd'=>1,
    		 		'preco'=>$ingrediente['hamburguerDeCarne']
    		 	],
    		 	'queijo'=>[
    		 		'qtd'=>1,
    		 		'preco'=>$ingrediente['queijo']
    		 	]
    		],
    		'xBurger'   =>[
    		 	'hamburguerDeCarne'=>[
    		 		'qtd'=>1,
    		 		'preco'=>$ingrediente['hamburguerDeCarne']
    		 	],
    		 	'queijo'=>[
    		 		'qtd'=>1,
    		 		'preco'=>$ingrediente['queijo']
    		 	]
    		],
    		'xEgg'     =>[
                'ovo'=>[
                    'qtd'=>1,
                    'preco'=>$ingrediente['ovo']
                ],    		 	
    		 	'hamburguerDeCarne'=>[
    		 		'qtd'=>1,
    		 		'preco'=>$ingrediente['hamburguerDeCarne']
    		 	],
                
    		 	'queijo'=>[
                    'qtd'=>1,
                    'preco'=>$ingrediente['queijo']
                ]
    		],
    		'xEggBacon'=>[
    		 	'ovo'=>[
    		 		'qtd'=>1,
    		 		'preco'=>$ingrediente['ovo']
    		 	],
    		 	'bacon'=>[
    		 		'qtd'=>1,
    		 		'preco'=>$ingrediente['bacon']
    		 	],
    		 	'hamburguerDeCarne'=>[
    		 		'qtd'=>1,
    		 		'preco'=>$ingrediente['hamburguerDeCarne']
    		 	],
    		 	'queijo'=>[
    		 		'qtd'=>1,
    		 		'preco'=>$ingrediente['queijo']
    		 	]
    		]
		];
    }

    public function calculate($data){
        $data = $data['dados'];
    	if (is_array($data) && !empty($data)) {
    		$total = 0;
            $lanches = [];
            $lancheNome = null;
            
    		foreach ($data as $lanche => $content){
                foreach ($content as $key => $value) {
                    if ($key =='lancheNome' || $key =='ingredientes') {
                        if ($key =='lancheNome') {
                            $lancheNome = $value;
                        } else {
                			$promos = [];
            	    		$valorLanche = 0;
            	    		$descontoLight = 0;
            	    		$temAlface = false;
                            $semBacon = true;
                            foreach ($value as $ingrediente => $conteudo){
                                if ($conteudo['nome'] =='hamburguerDeCarne' || $conteudo['nome'] =='queijo') {
                                    if ($conteudo['nome'] =='hamburguerDeCarne' && $conteudo['qtd'] >=3) {
                                       array_push($promos,['promo' => 'MuitaCarne']) ;
                                    } else if($conteudo['nome'] =='queijo' && $conteudo['qtd'] >=3){
                                       array_push($promos,['promo' => 'MuitoQueijo']) ;
                                    }
                                    for ($i=1; $i <= $conteudo['qtd']; $i++) { 
                                       if (!is_int($i/3)) {
                                           $valorLanche = ($valorLanche + $conteudo['preco']);
                                       }
                                    }
                                } else if($conteudo['nome'] =='alface'){
                                    if ($conteudo['qtd'] > 0) {
                                        $temAlface = true;
                                        $valorLanche = $valorLanche + ($conteudo['preco'] * $conteudo['qtd']);
                                    }
                                } else if($conteudo['nome'] =='bacon'){
                                    $semBacon = false;
                                    if ($conteudo['qtd'] == 0) {
                                       $semBacon = true;
                                    } else {
                                       $valorLanche = $valorLanche + ($conteudo['preco'] * $conteudo['qtd']);
                                    }
                                } else {
                                    if ($conteudo['qtd'] > 0) {
                                       $valorLanche +=($conteudo['preco'] * $conteudo['qtd']);
                                    }
                                }
                            }
                        }
                    }
                }

    			
    			if ($temAlface && $semBacon) {
    				array_push($promos,['promo' => 'DescontoLight']) ;
    				$descontoLight = ($valorLanche * 0.1);
    			}

				$totalLanche = ($valorLanche - $descontoLight);
				$total += $totalLanche;

				debug([
					'$lancheNome'=>$lancheNome,
					'$promo'=>$promos,
					'$valorLanche'=>$valorLanche,
					'$descontoLight'=>$descontoLight,
					'$totalLanche'=>$totalLanche,
					'$temAlface'=>$temAlface,
					'$semBacon'=>$semBacon,
					'$total'=>$total
				]);
                $lanches[] = [
                    'lancheNome'=>$lancheNome,
                    'promos'=>$promos,
                    'valorLanche'=>$valorLanche,
                    'descontoLight'=>$descontoLight,
                    'totalLanche'=>$totalLanche
                ];
    		}
        return['Total'=>$total,'Lanches'=>$lanches];
    	}
    }
}
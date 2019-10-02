<?php

namespace App\Http\Services;

class LanchoneteService{
	
	public function getIngredientes(){
    	return [
    		'hamburguerDeCarne' =>3,
    		'bacon'               =>2,
    		'queijo'              =>1.5,
    		'ovo'                 =>0.8,
    		'alface'              =>0.4
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
                    if ($key !='selecionado') {
                        if ($key =='lancheNome') {
                            $lancheNome = $value;
                        } else {
                			$promo = [];
            	    		$valorLanche = 0;
            	    		$descontoLight = 0;
            	    		$temAlface = false;
            	    		$naoTemBacon =false;
                            foreach ($value as $ingrediente => $conteudo){
                                if ($ingrediente =='hamburguerDeCarne' || $ingrediente =='queijo') {
                                    if ($ingrediente =='hamburguerDeCarne' && $conteudo['qtd'] >=3) {
                                       array_push($promo, 'MuitaCarne') ;
                                    } else if($ingrediente =='queijo' && $conteudo['qtd'] >=3){
                                       array_push($promo, 'MuitoQueijo') ;
                                    }
                                    for ($i=1; $i <= $conteudo['qtd']; $i++) { 
                                       if (!is_int($i/3)) {
                                           $valorLanche = ($valorLanche + $conteudo['preco']);
                                       }
                                    }
                                } else if($ingrediente =='alface'){
                                    if ($conteudo['qtd'] > 0) {
                                        $temAlface = true;
                                        $valorLanche = $valorLanche + ($conteudo['preco'] * $conteudo['qtd']);
                                    }
                                } else if($ingrediente =='bacon'){
                                    if ($conteudo['qtd'] == 0) {
                                       $naoTemBacon = true;
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

    			
    			if ($temAlface && $naoTemBacon) {
    				array_push($promo, 'DescontoLight') ;
    				$descontoLight = ($valorLanche * 0.1);
    			}

				$totalLanche = ($valorLanche - $descontoLight);
				$total += $totalLanche;

				debug([
					// '$nome'=>$lanche,
					'$promo'=>$promo,
					'$valorLanche'=>$valorLanche,
					'$descontoLight'=>$descontoLight,
					'$totalLanche'=>$totalLanche,
					'$temAlface'=>$temAlface,
					'$naoTemBacon'=>$naoTemBacon,
					'$total'=>$total
				]);
                $lanches[] = [
                    // 'nome'=>$lanche,
                    'promo'=>$promo,
                    'valorLanche'=>$valorLanche,
                    'descontoLight'=>$descontoLight,
                    'totalLanche'=>$totalLanche
                ];
    		}
        return['Total'=>$total,'Lanches'=>$lanches];
    	}
    }
}
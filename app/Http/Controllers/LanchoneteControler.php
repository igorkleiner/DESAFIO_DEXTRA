<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LanchoneteControler extends Controller
{
    public function getIngredients(){
    	return $this->callService('LanchoneteService','getIngredients');
    }
    public function getMenu(){
    	return $this->callService('LanchoneteService','getMenu');
    }

    public function calculate(Request$request){
    	return $this->callService('LanchoneteService','calculate',$request->all());
    }
}

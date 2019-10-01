
	//---------------------------------------------------------------------------------------------------------------
	// CRIANDO A CLASSE TIMER
	function Timer(timer_id,entrada1,entrada2,entrada3,entrada4,entrada5,saida1,saida2,saida3,saida4,saida5)
	{
		var self                     = this;
		//
		self.timerId                 = ko.observable(timer_id);    
		self.usuario                 = ko.observable(usuario.usu_nome);
		self.visuEntrada1            = ko.observable(true);
		self.visuEntrada2            = ko.observable(false);
		self.visuEntrada3            = ko.observable(false);
		self.visuEntrada4            = ko.observable(false);
		self.visuEntrada5            = ko.observable(false);
		self.visuSaida1              = ko.observable(false);
		self.visuSaida2              = ko.observable(false);
		self.visuSaida3              = ko.observable(false);
		self.visuSaida4              = ko.observable(false);
		self.visuSaida5              = ko.observable(false);
		//
		self.focoEntrada1            = ko.observable(true);
		self.focoEntrada2            = ko.observable(false);
		self.focoEntrada3            = ko.observable(false);
		self.focoEntrada4            = ko.observable(false);
		self.focoEntrada5            = ko.observable(false);
		self.focoSaida1              = ko.observable(false);
		self.focoSaida2              = ko.observable(false);
		self.focoSaida3              = ko.observable(false);
		self.focoSaida4              = ko.observable(false);
		self.focoSaida5              = ko.observable(false);
		self.entradaPeriodo1         = ko.observable(entrada1);//("08:16:00");
		self.displayEntrada1         = ko.observable(entrada1);		 
		self.saidaPeriodo1           = ko.observable(saida1);//('10:41:00');
		self.displaySaida1           = ko.observable(saida1);
		self.entradaPeriodo2         = ko.observable(entrada2);//('11:29:00');
		self.displayEntrada2         = ko.observable(entrada2);
		self.saidaPeriodo2           = ko.observable(saida2);//('13:21:00');
		self.displaySaida2           = ko.observable(saida2);
		self.entradaPeriodo3         = ko.observable(entrada3);//('16:20:00');
		self.displayEntrada3         = ko.observable(entrada3);
		self.saidaPeriodo3           = ko.observable(saida3);//("00:00:00");
		self.displaySaida3           = ko.observable(saida3);
		self.entradaPeriodo4         = ko.observable(entrada4);//("00:00:00");
		self.displayEntrada4         = ko.observable(entrada4);
		self.saidaPeriodo4           = ko.observable(saida4);//("00:00:00");
		self.displaySaida4           = ko.observable(saida4);
		self.entradaPeriodo5         = ko.observable(entrada5);//("00:00:00");
		self.displayEntrada5         = ko.observable(entrada5);      
		self.saidaPeriodo5           = ko.observable(saida5);//("00:00:00");
		self.displaySaida5           = ko.observable(saida5);
		self.horasContratadas        = ko.observable("08:00:00");
		self.saidaMinima             = ko.observable("16:00:00"); 
		self.previsaoHorasExtras     = ko.observable("00:00:00"); 




		//		
		self.totalAusencias = ko.pureComputed(function()
		{
		   return self.timeAdd(  self.totalAusenciaPeriodo12()
								,self.totalAusenciaPeriodo23()
								,self.totalAusenciaPeriodo34()
								,self.totalAusenciaPeriodo45()
								,"00:00:00"); 
		},this);


		self.horasTotais = ko.pureComputed(function()
		{
		   
		   return self.timeAdd(   self.totalHorasPeriodo1()
								, self.totalHorasPeriodo2()
								, self.totalHorasPeriodo3()
								, self.totalHorasPeriodo4()
								, self.totalHorasPeriodo5());
		},this);


		self.horasRestantes = ko.pureComputed(function()
		{
				var a = self.timeAdd(self.horasContratadas(), self.previsaoHorasExtras(),"00:00:00","00:00:00","00:00:00");
				return self.dateDiff(self.totalTrabalhadoAteAgora(),a);
		},this);


		self.horasExtras = ko.pureComputed(function()
		{            
			   return self.dateDiff(self.horasContratadas(), self.horasTotais());            
		},this);
		
		
		self.agora = new Relogio();


		self.totalTrabalhadoAteAgora = ko.pureComputed(function()
		{
			
			if(self.entradaPeriodo1() != undefined)
			{   
				var temposaida1 = self.saidaPeriodo1();             
				var temposaida2 = self.saidaPeriodo2();
				var temposaida3 = self.saidaPeriodo3();
				var temposaida4 = self.saidaPeriodo4();
				var compara  = new Date();
				var total1, total2, total3, total4, total;

				if (temposaida1 == "") temposaida1 = "00:00:00";
				if (temposaida2 == "") temposaida2 = "00:00:00";
				if (temposaida3 == "") temposaida3 = "00:00:00";
				if (temposaida4 == "") temposaida4 = "00:00:00";                

				calculotemposaida1 = temposaida1.split(":");
				var saida1 = new Date();
				saida1.setHours(calculotemposaida1[0]);
				saida1.setMinutes(calculotemposaida1[1]);
				saida1.setSeconds(calculotemposaida1[2]);

				calculotemposaida2 = temposaida2.split(":");
				var saida2 = new Date();
				saida2.setHours(calculotemposaida2[0]);
				saida2.setMinutes(calculotemposaida2[1]);
				saida2.setSeconds(calculotemposaida2[2]);

				calculotemposaida3 = temposaida3.split(":");
				var saida3 = new Date();
				saida3.setHours(calculotemposaida3[0]);
				saida3.setMinutes(calculotemposaida3[1]);
				saida3.setSeconds(calculotemposaida3[2]);

				calculotemposaida4 = temposaida4.split(":");
				var saida4 = new Date();
				saida4.setHours(calculotemposaida4[0]);
				saida4.setMinutes(calculotemposaida4[1]);
				saida4.setSeconds(calculotemposaida4[2]);

				if (saida1.getTime() < compara.getTime()) total1 = self.totalAusenciaPeriodo12(); else total1 = "00:00:00";                
				if (saida2.getTime() < compara.getTime()) total2 = self.totalAusenciaPeriodo23(); else total2 = "00:00:00";                
				if (saida3.getTime() < compara.getTime()) total3 = self.totalAusenciaPeriodo34(); else total3 = "00:00:00";                
				if (saida4.getTime() < compara.getTime()) total4 = self.totalAusenciaPeriodo45(); else total4 = "00:00:00";  
				
				total = self.timeAdd(total1, total2, total3, total4, "00:00:00");
				
				return self.dateDiff(total, self.dateDiff(self.entradaPeriodo1(),self.agora.hora()));
			}
			else
				return "00:00:00"
		},this);

		self.previsaoSaida  = ko.pureComputed(function()
		{  
			var previsao = self.timeAdd(self.agora.hora(),self.horasRestantes(),"00:00:00","00:00:00","00:00:00");             
			previsao = previsao.split(":");
			if (parseFloat(previsao[0]) > 24)
				previsao[0] = previsao[0]-24;
			if (previsao[0] < 10)
				previsao[0] = "0" + previsao[0].toString();
			return  previsao[0]+":"+previsao[1].toString()+":"+previsao[2].toString();
		},this);

		self.totalAusenciaPeriodo12 = ko.pureComputed(function()
		{
			var tempoEntrada = self.saidaPeriodo1()||"00:00:00";
			var tempoSaida = self.entradaPeriodo2()||"00:00:00";

			if (tempoEntrada == "") tempoEntrada = "00:00:00"
			if (tempoSaida == "") tempoSaida = "00:00:00"
			if (tempoEntrada != "00:00:00"  && tempoSaida == "00:00:00" ) tempoSaida = self.agora.hora();
			var totalAusenciaPeriodo12 =  self.dateDiff(tempoEntrada, tempoSaida);
			return totalAusenciaPeriodo12;
		},this);


		self.totalAusenciaPeriodo23 = ko.pureComputed(function()
		{
			var tempoEntrada = self.saidaPeriodo2()||"00:00:00";
			var tempoSaida = self.entradaPeriodo3()||"00:00:00";

			if (tempoEntrada == "") tempoEntrada = "00:00:00"
			if (tempoSaida == "") tempoSaida = "00:00:00"
			if (tempoEntrada != "00:00:00"  && tempoSaida == "00:00:00" ) tempoSaida = self.agora.hora();
			var totalAusenciaPeriodo23 =  self.dateDiff(tempoEntrada, tempoSaida);
			return totalAusenciaPeriodo23;
		},this);


		self.totalAusenciaPeriodo34 = ko.pureComputed(function()
		{
			var tempoEntrada = self.saidaPeriodo3()||"00:00:00";
			var tempoSaida = self.entradaPeriodo4()||"00:00:00";

			if (tempoEntrada == "") tempoEntrada = "00:00:00"
			if (tempoSaida == "") tempoSaida = "00:00:00"
			if (tempoEntrada != "00:00:00"  && tempoSaida == "00:00:00" ) tempoSaida = self.agora.hora();
			var totalAusenciaPeriodo34 =  self.dateDiff(tempoEntrada, tempoSaida);
			return totalAusenciaPeriodo34;
		},this);


		self.totalAusenciaPeriodo45 = ko.pureComputed(function()
		{
			var tempoEntrada = self.saidaPeriodo4()||"00:00:00";
			var tempoSaida = self.entradaPeriodo5()||"00:00:00"; 

			if (tempoEntrada == "") tempoEntrada = "00:00:00"
			if (tempoSaida == "") tempoSaida = "00:00:00"
			if (tempoEntrada != "00:00:00"  && tempoSaida == "00:00:00" ) tempoSaida = self.agora.hora();
			var totalAusenciaPeriodo45 =  self.dateDiff(tempoEntrada, tempoSaida);
			return totalAusenciaPeriodo45;
		},this);


		self.totalHorasPeriodo1 = ko.pureComputed(function()
		{
			
			var tempoEntrada = self.entradaPeriodo1()||"00:00:00";            
			var tempoSaida = self.saidaPeriodo1()||"00:00:00";            
			
			if (tempoEntrada == "") tempoEntrada = "00:00:00"
			if (tempoSaida == "") tempoSaida = "00:00:00"
			if (tempoEntrada != "00:00:00"  && tempoSaida == "00:00:00" ) tempoSaida = self.agora.hora();
			var totalHorasPeriodo1 =  self.dateDiff(tempoEntrada, tempoSaida);
			return totalHorasPeriodo1;

		},this);


		self.totalHorasPeriodo2 = ko.pureComputed(function()
		{
			var tempoEntrada = self.entradaPeriodo2()||"00:00:00";
			var tempoSaida = self.saidaPeriodo2()||"00:00:00";

			if (tempoEntrada == "") tempoEntrada = "00:00:00"
			if (tempoSaida == "") tempoSaida = "00:00:00"
			if (tempoEntrada != "00:00:00"  && tempoSaida == "00:00:00" ) tempoSaida = self.agora.hora();
			var totalHorasPeriodo2 =  self.dateDiff(tempoEntrada, tempoSaida);
			return totalHorasPeriodo2;          

		},this);


		self.totalHorasPeriodo3 = ko.pureComputed(function()
		{
			var tempoEntrada = self.entradaPeriodo3()||"00:00:00";
			var tempoSaida = self.saidaPeriodo3()||"00:00:00";

			if (tempoEntrada == "") tempoEntrada = "00:00:00"
			if (tempoSaida == "") tempoSaida = "00:00:00"
			if (tempoEntrada != "00:00:00"  && tempoSaida == "00:00:00" ) tempoSaida = self.agora.hora();
			var totalHorasPeriodo3 =  self.dateDiff(tempoEntrada, tempoSaida);
			return totalHorasPeriodo3; 
		},this);


		self.totalHorasPeriodo4 = ko.pureComputed(function()
		{
			var tempoEntrada = self.entradaPeriodo4()||"00:00:00";
			var tempoSaida = self.saidaPeriodo4()||"00:00:00";

			if (tempoEntrada == "") tempoEntrada = "00:00:00"
			if (tempoSaida == "") tempoSaida = "00:00:00"
			if (tempoEntrada != "00:00:00"  && tempoSaida == "00:00:00" ) tempoSaida = self.agora.hora();
			var totalHorasPeriodo4 =  self.dateDiff(tempoEntrada, tempoSaida);
			return totalHorasPeriodo4; 
		},this);


		self.totalHorasPeriodo5 = ko.pureComputed(function()
		{
			var tempoEntrada = self.entradaPeriodo5()||"00:00:00";
			var tempoSaida = self.saidaPeriodo5()||"00:00:00";

			if (tempoEntrada == "") tempoEntrada = "00:00:00"
			if (tempoSaida == "") tempoSaida = "00:00:00"
			if (tempoEntrada != "00:00:00"  && tempoSaida == "00:00:00" ) tempoSaida = self.agora.hora();
			var totalHorasPeriodo5 =  self.dateDiff(tempoEntrada, tempoSaida);
			return totalHorasPeriodo5; 
		},this);


		self.hora = function()
		{
			var data = new Date();
			var hora    = data.getHours()   <10 ? "0"+data.getHours()   : data.getHours();
			var minuto  = data.getMinutes() <10 ? "0"+data.getMinutes() : data.getMinutes();
			var segundo = data.getSeconds() <10 ? "0"+data.getSeconds() : data.getSeconds();
			var display = hora+":"+minuto+":"+segundo;
			return display;            
		}


		self.setEntrada1 = function()
		{			 
			self.entradaPeriodo1(self.hora());
			// setTimeout(function(){
			 		self.salvar();
			// }, 5000);
		};

		self.setEntrada2 = function()
		{                        
			self.entradaPeriodo2( self.hora() );
		};

		self.setEntrada3 = function()
		{                        
			self.entradaPeriodo3( self.hora() );
		};

		self.setEntrada4 = function()
		{            
			self.entradaPeriodo4( self.hora() );
		};

		self.setEntrada5 = function()
		{            
			self.entradaPeriodo5( self.hora() );
		};

		self.setSaida1 = function()
		{
			self.saidaPeriodo1( self.hora() );
		};

		self.setSaida2 = function()
		{            
			self.saidaPeriodo2( self.hora() );
		};

		self.setSaida3 = function()
		{            
			self.saidaPeriodo3( self.hora() );
		};

		self.setSaida4 = function()
		{            
			self.saidaPeriodo4( self.hora() );
		};

		self.setSaida5 = function()
		{            
			self.saidaPeriodo5( self.hora() );
		};


		self.dateDiff = function (date1, date2)
		{
			tempoEntrada = date1.split(':');                                
			var entrada = new Date();
			entrada.setHours(tempoEntrada[0]);
			entrada.setMinutes(tempoEntrada[1]);
			entrada.setSeconds(tempoEntrada[2]); 
			  
			tempoSaida = date2.split(':');                
			var saida = new Date();
			saida.setHours(tempoSaida[0]);
			saida.setMinutes(tempoSaida[1]);
			saida.setSeconds(tempoSaida[2]);  

			var compara = new Date();
			
			if(saida.getTime() <= entrada.getTime()) //|| entrada.getTime() > compara.getTime() )
			{                
				return '00:00:00';
			}
			
			var diff = saida - entrada, sign = diff < 0 ? -1 : 1, milliseconds, seconds, minutes, hours, days;

			if (isNaN(diff))
			{ 
				return '00:00:00';
			}
			
			try
			{                
				diff /= sign; 
				diff = ( diff - ( milliseconds = diff % 1000 )) / 1000;
				diff = ( diff - ( seconds      = diff % 60   )) / 60;
				diff = ( diff - ( minutes      = diff % 60   )) / 60;
				days = ( diff - ( hours        = diff % 24   )) / 24;
				daysInHours = ( diff - ( hours = diff % 24   ));

				hours += daysInHours;
				hours   = hours.toString().length   == 1 ? '0'+hours   : hours;
				minutes = minutes.toString().length == 1 ? '0'+minutes : minutes;
				seconds = seconds.toString().length == 1 ? '0'+seconds : seconds;
				
				return hours+':'+minutes+':'+seconds;
			}
			catch(ex)
			{
				console.log('entrei no catch do erro', ex);
				return '00:00:00';
			}
		};  


		self.timeAdd = function (time1, time2, time3, time4, time5)
		{            
			time1 = time1.split(':');              
			time2 = time2.split(':');
			time3 = time3.split(':');            
			time4 = time4.split(':');            
			time5 = time5.split(':');  

			var horas    = parseFloat(time1[0]) + parseFloat(time2[0]) + parseFloat(time3[0]) + parseFloat(time4[0]) + parseFloat(time5[0]);            
			var minutos  = parseFloat(time1[1]) + parseFloat(time2[1]) + parseFloat(time3[1]) + parseFloat(time4[1]) + parseFloat(time5[1]);              
			var segundos = parseFloat(time1[2]) + parseFloat(time2[2]) + parseFloat(time3[2]) + parseFloat(time4[2]) + parseFloat(time5[2]);

			try
			{
				while (segundos > 59) {segundos = segundos - 60; minutos = minutos + 1;}
				while (minutos > 59)  {minutos  = minutos  - 60; horas   = horas   + 1;}          
				if (horas    < 10) horas    = "0"+ horas.toString();
				if (minutos  < 10) minutos  = "0"+ minutos.toString();
				if (segundos < 10) segundos = "0"+ segundos.toString(); 
				return horas+':'+minutos+':'+segundos;
			}
			catch(ex)
			{
				return '00:00:00';
			}
		}; 


		self.salvar = function()
		{
			var entradaPeriodo1 = self.entradaPeriodo1() || "";
			var entradaPeriodo2 = self.entradaPeriodo2() || "";
			var entradaPeriodo3 = self.entradaPeriodo3() || "";
			var entradaPeriodo4 = self.entradaPeriodo4() || "";
			var entradaPeriodo5 = self.entradaPeriodo5() || "";
			var saidaPeriodo1   = self.saidaPeriodo1()   || "";
			var saidaPeriodo2   = self.saidaPeriodo2()   || "";
			var saidaPeriodo3   = self.saidaPeriodo3()   || "";
			var saidaPeriodo4   = self.saidaPeriodo4()   || "";
			var saidaPeriodo5   = self.saidaPeriodo5()   || "";            

			var callback = function(result)
			{
				if(result !=null && result.status != undefined )
				{
					if(result.status == 1)
					{                        
						//console.log("voltei do callback"); 
						//console.log("dentro do callback, o timer id é: ",result.response.timer_id); 
						self.timerId(result.response.timer_id);
						self.entradaPeriodo1(result.response.entrada_1);
						self.entradaPeriodo2(result.response.entrada_2);
						self.entradaPeriodo3(result.response.entrada_3);
						self.entradaPeriodo4(result.response.entrada_4);
						self.entradaPeriodo5(result.response.entrada_5);
						self.saidaPeriodo1(result.response.saida_1);
						self.saidaPeriodo2(result.response.saida_2);
						self.saidaPeriodo3(result.response.saida_3);
						self.saidaPeriodo4(result.response.saida_4);
						self.saidaPeriodo5(result.response.saida_5);
						location.reload();
					}
					if(result.status == 0)
					{  
						alert(result.message);
						alert('deu ruim');
					}
				}               
			}                      
			dadosPost = 
			{
				'timer_id' : self.timerId(),
				'timer_key': usuario.usu_id.toString()+usuario.per_id.toString()+data.replace(/\D/g,''),
				'entrada_1': entradaPeriodo1,
				'entrada_2': entradaPeriodo2,
				'entrada_3': entradaPeriodo3,
				'entrada_4': entradaPeriodo4,
				'entrada_5': entradaPeriodo5,
				'saida_1'  : saidaPeriodo1,
				'saida_2'  : saidaPeriodo2,
				'saida_3'  : saidaPeriodo3,
				'saida_4'  : saidaPeriodo4,
				'saida_5'  : saidaPeriodo5
			};                        
			globalViewModel.submit("{{Route('salvar.timer')}}", dadosPost,callback);
		} 


		self.visualizar = ko.computed(function()
		{            
			self.visuSaida1(self.entradaPeriodo1() != undefined && self.entradaPeriodo1()!= "" && self.entradaPeriodo1()!= "00:00:00"); 
			self.visuEntrada2(self.saidaPeriodo1() != undefined && self.saidaPeriodo1()  != "" && self.saidaPeriodo1()  != "00:00:00");
			self.visuSaida2(self.entradaPeriodo2() != undefined && self.entradaPeriodo2()!= "" && self.entradaPeriodo2()!= "00:00:00");
			self.visuEntrada3(self.saidaPeriodo2() != undefined && self.saidaPeriodo2()  != "" && self.saidaPeriodo2()  != "00:00:00");
			self.visuSaida3(self.entradaPeriodo3() != undefined && self.entradaPeriodo3()!= "" && self.entradaPeriodo3()!= "00:00:00");
			self.visuEntrada4(self.saidaPeriodo3() != undefined && self.saidaPeriodo3()  != "" && self.saidaPeriodo3()  != "00:00:00");
			self.visuSaida4(self.entradaPeriodo4() != undefined && self.entradaPeriodo4()!= "" && self.entradaPeriodo4()!= "00:00:00");
			self.visuEntrada5(self.saidaPeriodo4() != undefined && self.saidaPeriodo4()  != "" && self.saidaPeriodo4()  != "00:00:00");
			self.visuSaida5(self.entradaPeriodo5() != undefined && self.entradaPeriodo5()!= "" && self.entradaPeriodo5()!= "00:00:00");
			//
			self.focoEntrada1(self.visuEntrada1());
			self.focoSaida1(  self.visuSaida1());
			self.focoEntrada2(self.visuEntrada2());
			self.focoSaida2(  self.visuSaida2());
			self.focoEntrada3(self.visuEntrada3());
			self.focoSaida3(  self.visuSaida3());
			self.focoEntrada4(self.visuEntrada4());
			self.focoSaida4(  self.visuSaida4());
			self.focoEntrada5(self.visuEntrada5());
			self.focoSaida5(  self.visuSaida5()); 
		});
	}
			
	//-----------------------------------------------------------------------------------------------------------------------
	function ViewModel()
	{
		var self = this;
		//		
		if (time.status == 0 || time.response == null) self.timer = new Timer("","","","","","","","","","");
		else self.timer = new Timer( time.response.timer_id,
									 time.response.entrada_1,
									 time.response.entrada_2,
									 time.response.entrada_3,
									 time.response.entrada_4,
									 time.response.entrada_5,
									 time.response.saida_1,
									 time.response.saida_2,
									 time.response.saida_3,
									 time.response.saida_4,
									 time.response.saida_5
									);
		self.limpar = function()
		{
			if(self.timer.entradaPeriodo1() == "00:00:00") self.timer.entradaPeriodo1(""); 
			if(self.timer.saidaPeriodo1()   == "00:00:00") self.timer.saidaPeriodo1("");
			if(self.timer.entradaPeriodo2() == "00:00:00") self.timer.entradaPeriodo2(""); 
			if(self.timer.saidaPeriodo2()   == "00:00:00") self.timer.saidaPeriodo2("");
			if(self.timer.entradaPeriodo3() == "00:00:00") self.timer.entradaPeriodo3(""); 
			if(self.timer.saidaPeriodo3()   == "00:00:00") self.timer.saidaPeriodo3("");
			if(self.timer.entradaPeriodo4() == "00:00:00") self.timer.entradaPeriodo4(""); 
			if(self.timer.saidaPeriodo4()   == "00:00:00") self.timer.saidaPeriodo4("");
			if(self.timer.entradaPeriodo5() == "00:00:00") self.timer.entradaPeriodo5(""); 
			if(self.timer.saidaPeriodo5()   == "00:00:00") self.timer.saidaPeriodo5("");   
		}  
		self.limpar();    
		self.focar = function()
		{
			setTimeout(function()
			{
				self.timer.focoEntrada1(self.timer.visuEntrada1());
				self.timer.focoSaida1(  self.timer.visuSaida1());
				self.timer.focoEntrada2(self.timer.visuEntrada2());
				self.timer.focoSaida2(  self.timer.visuSaida2());
				self.timer.focoEntrada3(self.timer.visuEntrada3());
				self.timer.focoSaida3(  self.timer.visuSaida3());
				self.timer.focoEntrada4(self.timer.visuEntrada4());
				self.timer.focoSaida4(  self.timer.visuSaida4());
				self.timer.focoEntrada5(self.timer.visuEntrada5());
				self.timer.focoSaida5(  self.timer.visuSaida5());
			}, 010);
		}
		self.focar();
	}
	//-------------------------------------------------------------------------------------------------------------------------- 
	viewModel = new ViewModel;
	viewModel.focar();
	$(function(){
		ko.applyBindings(viewModel, document.getElementById('idtimer'));
	});

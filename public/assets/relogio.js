function Relogio()
  {
      var self = this;
      self.data = ko.observable();
      self.hora = ko.observable();
  }
  ko.bindingHandlers.relogio = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        //value acessor deve ser um objeto com as propriedades, {data, hora}
        var objeto = ko.utils.unwrapObservable(valueAccessor());

        var agora = new Date();
        var tmp = {};
        tmp.dia = agora.getDate();
        tmp.mes = agora.getMonth();
        tmp.ano = agora.getFullYear();
        tmp.hor = agora.getHours();
        tmp.min = agora.getMinutes();
        tmp.sec = agora.getSeconds();
        tmp.sem = agora.getDay();
        tmp.pad = function(s, n) {
        s = '0000' + s;
        return (s.substring(s.length - n, s.length));

        }
        tmp.NomeSem = function() {
            var aDia = ['Domingo', 'Segunda Feira', 'Terça Feira', 'Quarta Feira', 'Quinta Feira', 'Sexta Feira', 'Sábado'];
            return aDia[tmp.sem];
        }
        tmp.NomeMes = function() {
            var aMes = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
            return aMes[tmp.mes];
        }
        objeto.data(tmp.NomeSem() + ', ' + tmp.dia + ' de ' + tmp.NomeMes() + ' de ' + tmp.pad(tmp.ano, 4));
        objeto.hora(tmp.pad(tmp.hor, 2) + ':' + tmp.pad(tmp.min, 2)+ ':' + tmp.pad(tmp.sec, 2));

        // função responsavel por atualizar o horario na div no handler setInterval
        function updateClock ( )
        {
          var currentTime = new Date ( );

          var currentHours   = currentTime.getHours ( );
          var currentMinutes = currentTime.getMinutes ( );
          var currentSeconds = currentTime.getSeconds ( );

          // Pad the minutes and seconds with leading zeros, if required
          currentHours   = ( currentHours   < 10 ? "0" : "" ) + currentHours;
          currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
          currentSeconds = ( currentSeconds < 10 ? "0" : "" ) + currentSeconds;

          // Choose either "AM" or "PM" as appropriate
          var timeOfDay = ( currentHours < 24 ) ? "" : "";

          // Convert the hours component to 12-hour format if needed
          currentHours = ( currentHours > 24 ) ? currentHours - 12 : currentHours;

          // Convert an hours component of "0" to "12"
          currentHours = ( currentHours == 0 ) ? 24 : currentHours;

          // Compose the string for display
          var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;

          // Update the time display
          objeto.hora(currentTimeString);
        }

        setInterval(updateClock, 1000 );
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        // This will be called once when the binding is first applied to an element,
        // and again whenever any observables/computeds that are accessed change
        // Update the DOM element based on the supplied values here.
    }
  };
ko.bindingHandlers.masked = 
{
    init: function (element, valueAccessor, allBindingsAccessor) 
    {
        var mask = allBindingsAccessor().mask || {};
        var placeholder = allBindingsAccessor().placeholder;
        if (placeholder) 
        {
            $(element).mask(mask, { placeholder: placeholder });
        } 
        else 
        {
            $(element).mask(mask);
        }
        ko.utils.registerEventHandler(element, "change", function () 
        {
            var observable = valueAccessor();
            observable($(element).val());
        });
    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).val(value);
    }
};

/*
    DATEPICKER MODO DE USO:
    <input type="text" class="form-control" data-bind="
        datepicker: <ko.observable>,
        dpotions:{callback:function(usado_quando_mudar_a_data){}},
        attr: { placeholder: '{{Lang::get('sac.screens.historic.dateLastrequest')}}' }
    ">
*/
ko.bindingHandlers.datepicker = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var options = allBindings.get('dpotions') || {};
        options.format = 'dd/mm/yyyy'; // esperando customizacao para funcionar 
        options.clearBtn = options.clearBtn || true;
        options.language = options.language || 'pt-BR';
        options.multidate = options.multidate || false;
        options.disableTouchKeyboard = options.disableTouchKeyboard || false;
        options.enableOnReadonly = options.enableOnReadonly || true;
        options.keyboardNavigation = options.keyboardNavigation || false;
        options.autoclose = options.autoclose || true;
        options.forceParse = options.forceParse || true;
        options.orientation = options.orientation || 'auto';
        options.todayHighlight = options.todayHighlight || true;
        options.toggleActive = options.toggleActive || true;

        $(element).datepicker(options)
            .on('changeDate', function (e) {
                var obs = valueAccessor();
                if (typeof (e.date) != 'undefined') {
                    var _obsdate = moment(new Date(e.date.getFullYear(), e.date.getMonth(), e.date.getDate(), 12)).format('YYYY-MM-DD');
                    if (ko.isObservable(obs)) {
                        obs(_obsdate);
                    } else {
                        valueAccessor(_obsdate);
                    }
                    if (typeof (options.callback) == 'function') options.callback();
                }
                if (typeof (e.date) == 'undefined') {
                    if (ko.isObservable(obs)) {
                        obs(null);
                    } else {
                        valueAccessor(null);
                    }
                }
            });
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var val = ko.unwrap(valueAccessor());
        if (!moment.isMoment(val)) val = moment(val, 'YYYY-MM-DD');
        $(element).datepicker('update', new Date(val.format('MM/DD/YYYY', 12)));
    }
};

ko.bindingHandlers.datepicker2 = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var options = allBindings.get('dpotions') || {};
        options.format = 'dd/mm/yyyy';// esperando customizacao para funcionar
        options.clearBtn = options.clearBtn || true;
        options.language = options.language || 'pt';
        options.multidate = options.multidate || false;
        options.disableTouchKeyboard = options.disableTouchKeyboard || false;
        options.enableOnReadonly = options.enableOnReadonly || true;
        options.keyboardNavigation = options.keyboardNavigation || false;
        options.autoclose = options.autoclose || true;
        options.forceParse = options.forceParse || true;
        options.orientation = options.orientation || 'auto';
        options.todayHighlight = options.todayHighlight || true;
        options.toggleActive = options.toggleActive || true;

        $(element).datepicker(options)
            .on('hide', function (e) {
                var value = valueAccessor();
                if (moment(new Date(e.date.getFullYear(), e.date.getMonth(), e.date.getDate(), 12)).format('YYYY-MM-DD').length == 10) {
                    // value(newDate);
                    value(moment(new Date(e.date.getFullYear(), e.date.getMonth(), e.date.getDate(), 12)).format('YYYY-MM-DD'));
                }
            });
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var date = ko.utils.unwrapObservable(valueAccessor());
        if (date != null) {
            if (date.length == 10) {
                date = moment(date);
                $(element).datepicker('setDate', new Date(date.format('MM/DD/YYYY', 12)));
            }
        }
    }
};

ko.bindingHandlers.cuttext = {
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var length = allBindings().length || 20; //Valor default que será usado para cortar o teste
        var trailing = allBindings().trailing || "";
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (length < value.length) {
            value = value.substr(0, length) + trailing;
        }
        $(element).text(value);
    }
};

ko.bindingHandlers.enterkey = {
    init: function (element, valueAccessor, allBindings, viewModel) {
        var callback = valueAccessor();
        $(element).keypress(function (event) {
            var keyCode = (event.which ? event.which : event.keyCode);
            if (keyCode === 13) {
                callback.call(viewModel);
            }
        });
    }
};

ko.bindingHandlers.numerico = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var precisao = allBindings.get('precisao')||0;
        var sobrescrever = allBindings.get('sobrescrever')||true;

        var valor = ko.utils.unwrapObservable(valueAccessor());
        var checker = typeof(valor) == 'string' || !valor;
        
        valor = valor == null || isNaN(valor) ? 0 : valor;
        valor = parseFloat(parseFloat(valor.toString()).toFixed(precisao));
        element.style.textAlign = 'right';
        
        if(element.tagName == 'INPUT')
        {
            element.value = valor.toLocaleString("pt-BR", { minimumFractionDigits: precisao, maximumFractionDigits: precisao });
            // definindo handlers para forçar o cursor permanecer a direita do input
            ko.utils.registerEventHandler(element, 'click', function(){
                setTimeout((function(element) {
                    var strLength = element.value.length;
                    return function() {
                        if(element.setSelectionRange !== undefined) {
                            element.setSelectionRange(strLength, strLength);
                        } else {
                            element.value = element.value;
                        }
                    }}(this)), 5);
            });
            ko.utils.registerEventHandler(element, 'focus', function(){
                setTimeout((function(element) {
                    var strLength = element.value.length;
                    return function() {
                        if(element.setSelectionRange !== undefined) {
                            element.setSelectionRange(strLength, strLength);
                        } else {
                            element.value = element.value;
                        }
                    }}(this)), 5);
            });
            // =======================================================================
            ko.utils.registerEventHandler(element, 'input', function()
            {
                var valor = element.value.replace(/\D/g,'');
                // ajuste de bug. quando o tamanho do munero é menor que a precisão, estava mudando o valor do input.
                // para solucionar, coloquei esse 'pad' para artificialmente aumentar o tamanho da strig com zeros a esquerda e 
                // o parseFloat elimine os zeros desnecessários e
                var pad = '00000000000000000';

                if(valor == null || valor == '')
                {
                    valor = '0';
                }

                if(precisao > 0)
                {
                    if(valor.length < precisao)
                    {
                        valor = pad + valor;
                    }
                    valor = parseFloat(valor.substr(0, valor.length - precisao) + '.' + valor.substr(valor.length - precisao, valor.length));
                }
                else
                {
                    valor = parseFloat(parseFloat(valor).toFixed(precisao));
                }
                
                element.value = valor.toLocaleString("pt-BR", { minimumFractionDigits: precisao, maximumFractionDigits: precisao }); 
                
                if(ko.isWriteableObservable(valueAccessor()))
                {
                    valueAccessor()(valor);
                }
            });
        }
        else
        {
            element.innerHTML = valor.toLocaleString("pt-BR", { minimumFractionDigits: precisao, maximumFractionDigits: precisao });
        }
        
        if(ko.isWriteableObservable(valueAccessor()) && checker && sobrescrever === true)
        {
            valueAccessor()(valor);
        }
    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
        var precisao = allBindings.get('precisao')||0;
        var sobrescrever = allBindings.get('sobrescrever')||true;
        var valor = ko.utils.unwrapObservable(valueAccessor());
        var checker = typeof(valor) == 'string' || !valor;
        
        valor = valor == null ? 0 : valor;
        valor = typeof(valor) == 'string' && valor.indexOf(",") != -1 ? valor.replace(/\./g,'').replace(",",".") : valor;
        valor = parseFloat(valor).toFixed(precisao);
        valor = isNaN(valor) ? valor.toString().replace(/\D/g,'') : valor;
        
        if(valor == null || valor == '')
        {
            valor = 0;
        }
        
        valor = parseFloat(valor);
        
        if(element.tagName == 'INPUT')
        {
            element.value = valor.toLocaleString("pt-BR", { minimumFractionDigits: precisao, maximumFractionDigits: precisao }); 
        }
        else
        {
            element.innerHTML = valor.toLocaleString("pt-BR", { minimumFractionDigits: precisao, maximumFractionDigits: precisao }); 
        }
        
        if(ko.isWriteableObservable(valueAccessor()) && checker && sobrescrever === true)
        {
            valueAccessor()(valor);
        }
    }
};

ko.bindingHandlers.multiplefiles = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var conf = {
            input: $(element)[0],// o input type file
            value: valueAccessor(),// o observable que receberá o resultado do filereader
            ext: allBindings.get('ext') || [],// parametro adicional opcional para limitar as extenções válidas
            max: allBindings.get('max') || 1024 * 1024 * 5// parametro adicional opcional para limitar o tamanho do arquivo
        };
        var removebase64key = allBindings.get('removebase64key') || false;

        ko.utils.registerEventHandler(element, 'change', function () {
            if (conf.input.files && !!conf.input.files) {
                var keys = Object.keys(conf.input.files);
                var returnFiles = [];
                var qtd = keys.length;
                var start = 0;
                var injectfiles = function () {
                    conf.value(returnFiles);
                }
                ko.utils.arrayForEach(keys, function (k) {
                    var FR = new FileReader();
                    var tmp = {
                        'originalName': conf.input.files[k].name,
                        'file': null,
                        'mimeType': conf.input.files[k].type,
                        'size': conf.input.files[k].size
                    };
                    FR.onload = function (e) {
                        var tmpfile = e.target.result;
                        if (removebase64key) {
                            tmpfile = tmpfile.split(';base64,')[1];
                        }

                        tmp.file = tmpfile;
                        returnFiles.push(tmp);
                        start++;
                        if (start == qtd) injectfiles();
                    }
                    FR.readAsDataURL(conf.input.files[k]);
                });
            }
        });
    }
};

ko.bindingHandlers.livesearch = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var url = allBindings.get('url');
        var params = allBindings.get('params') || {};
        var full = allBindings.get('full') || false;
        var loading = allBindings.get('loading') || false;
        var isWriteble = ko.isWriteableObservable(valueAccessor());
        $(element).autocomplete({
            deferRequestBy: 250,
            serviceUrl: url,
            lookupLimit: 5,
            showNoSuggestionNotice: true,
            autoSelectFirst: true,
            enable: true,
            noSuggestionNotice: 'Nenhum Resultado Encontrado.',
            minChars: 3,
            noCache: true,
            params: params,
            onSearchStart: function () {
                if (isWriteble && !!valueAccessor()()) {
                    valueAccessor()(null);
                }
                if (loading) {
                    $(`#${loading}`).show();
                }
            },
            onSelect: function (suggestion) {
                var value = full === true ? suggestion : suggestion.value;
                if (isWriteble) {
                    valueAccessor()(value);
                }
            },
            onSearchComplete: function () {
                if (loading) {
                    $(`#${loading}`).hide();
                }
            },
            onInvalidateSelection: function () {
                if (isWriteble) {
                    valueAccessor()(null);
                }
            }
        })
    },
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        $(element).val(value || '');
    }
};
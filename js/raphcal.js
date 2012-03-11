
window.onload = function(){
  
  document.raphCal = function(){
//Variables privadas
    var diasCurrMth = 28, //dias del mes actual
    currentTime = new Date ( ),
    currH,currM ,currS,timeState,clkH,clkM,clkS,//reloj
    cals = new Array;
    
    getCurrMthDays = function (){diasCurrMth = new Date(2012,(new Date().getMonth()+1),0).getDate();}(); //count 
    
    /* raph : Objecto publico para la gestión de los gráficos:
     methods:
        rphArc -> path generator (a_start,a_end,centro_x,centro_y,radio,grosor)
        rphArcGenP -> animate arc creation (ang_ini,ang_fin,mainCentroX,mainCentroY,mainRadius,gros,pasos,tiempo
        rphArcMth -> generate arcs for days (day, level, grosor, horaINI, horaEND)
          **clock
       rphClk  -> the clock set
       clckKill  -> stop the clock and clear the clock set
       clckStart  -> start the clock if it's not
       clckStart  -> stops the clock and shows only the hours circle (even if there was no clock)
    ------------------------------------------------------*/
    
    var raph = function(){
      var papelX =800,//tamaño del canvas
      papelY=700,
      mainCentroX = 400,//centro generico
      mainCentroY = 330, mainRadius = 300,
      angH = (Math.PI *2) / 12,angM = (Math.PI *2) / 60,angS = (Math.PI *2) / 60,
      pasosINI = 50; //pasos y tiempo estandar de animación
      tiempoINI = 500;
    
      var paper = Raphael(document.getElementById('main_rph'),papelX, papelY),
      raphCalui = paper.set();
      rphClk = paper.set();//reloj
      rphCal = paper.set();//reloj
      
//simplifica angulos (elimina vueltas extras) 
      var aSimpli = function(ang){
        if (ang > 2*Math.PI){ ang=ang%(Math.floor(ang/(2*Math.PI))*2*Math.PI);return ang;};
        if (ang < -(2*Math.PI)){ ang=ang%(Math.ceil(ang/(2*Math.PI))*2*Math.PI);return ang;};
        return ang;
     }
     
//generador de arcos -> devuelve trazado!
     var rphArc  = function (a_start,a_end,centro_x,centro_y,radio,grosor){
          
      //si uno de los dos arcos es > que un círculo quitamos las vueltas extras
     var a_start = aSimpli(a_start),
     a_end= aSimpli(a_end);
     
     //generamos desde el angulo menor al mayor
     if(a_start>a_end) {var tmp = a_end; a_end= a_start; a_start= tmp;}
     
     //valor de svg large-arc-flag
     a_end-a_start>Math.PI ? large = 1 : large = 0;
     
     var radio2= radio+grosor;
      path='M'+(centro_x+Math.cos(a_start)*radio)+','+(centro_y+Math.sin(a_start)*radio)+
        ' A'+radio+','+radio+' 0 '+ large +',1 '+(centro_x+Math.cos(a_end)*radio)+','+(centro_y+Math.sin(a_end)*radio)+
        ' L'+(centro_x+Math.cos(a_end)*radio2)+','+(centro_y+Math.sin(a_end)*radio2)+
        ' A'+radio2+','+radio2+' 0 ' + large + ',0 ' +(centro_x+Math.cos(a_start)*radio2)+','+(centro_y+Math.sin(a_start)*radio2)+'Z';
      return path;
     };
     
//generador de arcos con animación -> devuelve arco generado
     var rphArcGenP = function(ang_ini,ang_fin,mainCentroX,mainCentroY,mainRadius,gros,pasos,tiempo){
      if (ang_ini>ang_fin){var tmp = ang_ini; ang_ini = ang_fin;ang_fin = tmp;}
      var baseTiempo = tiempo / pasos,
      ang_paso = (ang_fin-ang_ini)/pasos,
      line = paper.path();
      var rphArcGenPTime = function(i){
        linepath = rphArc(ang_ini,(ang_ini+(i*ang_paso)),mainCentroX,mainCentroY,mainRadius,gros);
        line.attr({'path':linepath,'fill':'#ccc','stroke':'none',});
        if (i<pasos+1){window.setTimeout(rphArcGenPTime,baseTiempo,++i);}else{line.glow({'color':'#ddd'});};
      };
      rphArcGenPTime(1);
      line.hover(function(){this.attr('fill','#3cc')},function(){this.attr('fill','#ccc')});
      return line;
    };
    
//genera entorno
    var rphBaseMthP = function (days){ 
          //contenedor
      var base = paper.set();
      
          //círculo base
      var circ_base = paper.circle(mainCentroX,mainCentroY,mainRadius-10),
      circ_glow = circ_base.attr({'stroke-dasharray':'- ', 'stroke':'#bbb'}).glow({'color':'#ddd'});
      base.push(circ_base);
      base.push(circ_glow);
      
          //elementos radiales
      ang_base = ((1/days)*2*Math.PI);
      
      for (i=0; i<days;i++){
      
        var ang=  i*ang_base;
        
          //lineas
        var days_line= paper.path('M' + (mainCentroX  + Math.cos(ang) * (mainRadius -15)) + ',' + (mainCentroY  +Math.sin(ang) * (mainRadius -15)) + 
          'l' + Math.cos(ang)*5 + ',' + Math.sin(ang)*5 );
        days_line.attr({'stroke-dasharray':'- ', 'stroke':'#bbb'});
        base.push(days_line);
          
          //texto dias
        t_dist = 30 ;
        
        t = paper.text(mainCentroX  + Math.cos(ang+(ang_base/2)) * (mainRadius-t_dist), mainCentroY  + Math.sin(ang+(ang_base/2)) * (mainRadius-t_dist), i+1);
        t.attr({'stroke-width':0,'fill':'#666','font-family':"'Wire One', sans-serif",'font-size':26});
        t.hover(function(){this.attr({'fill':'#3cc','font-weight':'800'})},function(){this.attr({'fill':'#666','font-weight':'100'})});
        base.push(t);
        
      };
    return base;
    };
    
//genera arco para dia completo o hora
    var rphArcMthP = function (day, level, grosor, horaINI, horaEND){
      var angDia = (Math.PI *2) / diasCurrMth,
      diaIni = day *angDia,
      diaFin = diaIni + angDia;
      
      if (arguments.length==3){
        // asumimos que solo se pasa dia
        return rphArcGenP(diaIni,diaFin,mainCentroX,mainCentroY,mainRadius+level,grosor,pasosINI,tiempoINI);
      } else if (arguments.length==5){
        // asumimos que se pasa dia y hora
        var angINI, angEND;
        if(horaEND == horaINI){return rphArcGenP(diaIni+(angDia*angINI),(diaIni+(angDia*angINI)+0.05),mainCentroX,mainCentroY,mainRadius+level,grosor,pasosINI,tiempoINI);;};
        if(horaEND < horaINI) { var tmp = horaINI; horaINI = horaEND; horaEND = tmp;};
        if (horaINI > 19) {angINI = 0.95} else if (horaINI< 9) {angINI = 0} else{angINI = (horaINI-8)/13};
        if (horaEND < 9) {angEND = 0.05} else if (horaEND> 20) {angEND = 1} else{angEND = (horaEND-8)/13};
        return rphArcGenP((diaIni+(angDia*angINI)),(diaIni+(angDia*angEND)),mainCentroX,mainCentroY,mainRadius+level,grosor,pasosINI,tiempoINI);
      }
    }
   
                          //Clock methods
  //genera elementos del reloj
    var rphArcClckP = function (){
      if(!rphClk.length){ // if rphClk is empty (no clock)
      
        for (var i=0;i<3; i++){ rphClk.push(paper.path().attr({'fill':'#ccc','stroke':'#bbb'})
          .hover(function(){console.log( clkH + ' ' + clkM + ' ' + clkS);this.attr({'fill':'#3cc'});},function(){this.attr({'fill':'#ddd'});}  // pending -> hover clck
        ))};
        
          //círculo base
        var circ_base = paper.circle(mainCentroX,mainCentroY,mainRadius-85),
        circ_glow = circ_base.attr({'stroke-dasharray':'- ', 'stroke':'#bbb'}).glow({'color':'#ddd'});
        rphClk.push(circ_base);
        rphClk.push(circ_glow); 
        
         //elementos radiales 
         
         var ang_base = (2*Math.PI/60);
        
        for (i=0; i<60;i++){
          var ang=  i*ang_base;
            //lineas
          var days_line= paper.path('M' + (mainCentroX  + Math.cos(ang) * (mainRadius -85)) + ',' + (mainCentroY  +Math.sin(ang) * (mainRadius -85)) + 
            'l' + (-Math.cos(ang)*5 )+ ',' + (-Math.sin(ang)*5 ));
          days_line.attr({'stroke-dasharray':'- ', 'stroke':'#bbb'});
          rphClk.push(days_line);
        }
        var ang_base = (2*Math.PI/12);
        
        for (i=0; i<12;i++){
          var ang=  i*ang_base;
            //lineas
          var days_line= paper.path('M' + (mainCentroX  + Math.cos(ang) * (mainRadius -80)) + ',' + (mainCentroY  +Math.sin(ang) * (mainRadius -80)) + 
            'l' + (-Math.cos(ang)*25 )+ ',' + (-Math.sin(ang)*25 ));
          days_line.attr({'stroke-dasharray':'- ', 'stroke':'#bbb'});
          rphClk.push(days_line);
        }
            //texto horas
        var ang_base = (2*Math.PI/4);
        for (var i=0; i<4;i++){
          var ang=  i*ang_base;
          t_dist = 60 ;
          
          t = paper.text(mainCentroX  + Math.cos(ang) * (mainRadius-t_dist), mainCentroY  + Math.sin(ang) * (mainRadius-t_dist), (i+1)*3);
          t.attr({'stroke-width':0,'fill':'#666','font-family':"'Wire One', sans-serif",'font-size':36});
          t.hover(function(){this.attr({'fill':'#3cc','font-weight':'800'})},function(){this.attr({'fill':'#666','font-weight':'100'})});
          rphClk.push(t);      
        };
        return rphClk;
      } else {return 0;}
    };
    
//inicializa REloj  
    function rphArcClckTimeP () {
      var currentTime = new Date ( );
      clkH = currentTime.getHours ( );
      clkM = currentTime.getMinutes ( );
      clkS = currentTime.getSeconds ( );
      if(!(clkH==currH)){rphClk[0].attr({'path': rphArc((-Math.PI/2+angH/2+clkH*angH),(-Math.PI/2-angH/2+clkH*angH),mainCentroX,mainCentroY,mainRadius-95,5)}).toFront();currH = clkH;  }
      if(!(clkM==currM)){rphClk[1].attr({'path':  rphArc((-Math.PI/2+angM/2+clkM*angM),(-Math.PI/2-angM/2+clkM*angM),mainCentroX,mainCentroY,mainRadius-105,15)}).toFront();currM = clkM;}
      if(!(clkS==currS)){rphClk[2].attr({'path':  rphArc((-Math.PI/2+0.008+clkS*angS),(-Math.PI/2-0.008+clkS*angS),mainCentroX,mainCentroY,mainRadius-110,30)}).toFront();currS = clkS; }
      timeState = window.setTimeout(rphArcClckTimeP,1000);
    };
    
// quita REloj  
    var clckKillP = function(){
      if(rphClk.length){
        currH = currM = currS = 0;
        window.clearTimeout(timeState);
        rphClk.forEach(function(ths){if(!ths.removed){ths.remove();}})
        rphClk.clear();
      }
    }
    
// oculta REloj  like kill, but keep the hours circle
    var clckHideP = function(){
      if(rphClk.length){
        currH = currM = currS = 0;
        window.clearTimeout(timeState);
        rphClk.forEach(function(ths){if(!ths.removed){ths.remove();}})
        rphClk.clear();
      }
      rphArcClckP();    
    }
    
//  lanza REloj  
    var clckStartP = function(){
      rphArcClckP();
      rphArcClckTimeP();
    }

//objeto público
      return {
        rphArcMth:rphArcMthP,
          // clock methods
        rphClk : rphClk, // the clock set of objects
        clckKill : clckKillP,// stop the clock and clear the clock set
        clckStart : clckStartP,// start the clock if rphlClik is empty
        clckHide:clckHideP,// hide the clock but shows only the hours circle
        
          // calendar methods
        rphBaseMth:rphBaseMthP,
        clearBase : function(){
          elmsBase.forEach(function(ths){
            if(!ths.removed){ths.remove()};
          });
          elmsBase.clear();
        },
      };
    }()
    
    /* ui : Objecto publico para gestion de la interfaz:*/
    var ui = function(){
    
          //event to check if auth is ok and then display the page with the calendar list
      $('.main-ini .butt').bind('click',function(){
        if(handleClientLoad2()){// TEMP -> 
          $('.main-ini').fadeOut(400,function(){$('#main_selCal').fadeIn(400)});
        }else{
          $('.main-ini .msj').html('Sorry, but there was an error login into your accont. Please try again')
        };
      }); 
    }()
    
          //event to check if calendar is selected, in that case, generate the calendar.
    $('#main_selCal .butt').bind('click',function(){
      var calsClickd = $('#selCal input:checked');
      if (calsClickd.length){
        cals.splice(cals.length);
        for (var i = 0; i<calsClickd.length;i++){cals.push(calsClickd[i].id);};
      } else{
        $('#main_selCal .msj').html('You have to select at least one calendar.');
      }
    });
    
    return {
      raph:raph,
      ui:ui,
      diasCurrMth:diasCurrMth,
    };
  }();
    
    //samples
 /*console.log(rphArc(3.6,1.9,mainCentroX,mainCentroY,mainRadius,10).attr({'fill':'#ccc','stroke':'none',}).glow({'color':'#ddd'}).hover(function(){this.attr('fill','#3cc')},function(){this.attr('fill','#ccc')}));
  
  console.log(document.raphCal.raph.rphArcMth(1,0,7));
  console.log(document.raphCal.raph.rphArcMth(1,10,7,21,22));
  console.log(document.raphCal.raph.rphArcMth(1,20,7,18,19));
  console.log(document.raphCal.raph.rphArcMth(1,30,7,19,20));
  console.log(document.raphCal.raph.rphArcMth(1,40,7,20,21));
  
  document.raphCal.raph.clckStart()
  document.raphCal.raph.rphArcClckTime()
  document.raphCal.raph.rphBaseMth(28)
  */
 //document.raphCal.raph.rphBaseMth(document.raphCal.diasCurrMth)
  }
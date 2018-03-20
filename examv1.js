  //=======================================//
 //     Examen nivel v 1.0                //
//=======================================//

//Variables que se van a usar después

var timeline = [];
var nivel = [];
var boton = "Continuar";
var iniTime = [];
var guardar = [];
var mensaje_final = [];

//Variables contador de respuestas
var contador_A1 = 0;
var contador_A2 = 0;
var contador_B1 = 0;
var contador_B2 = 0;
var contador_C1 = 0;

// Tiempo limite del Examen en milisegundos.

var tiempoLimite = 1800000; // 30 minutos

// generate a random subject ID with 5 characters
var subject_id = jsPsych.randomization.randomID(5);

// Funcion save_data
function save_data() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/write_data.php'); // change 'write_data.php' to point to php script.
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
  xhr.onload = function() {
    if(xhr.status == 200){
      var response = JSON.parse(xhr.responseText);
      console.log(response.success);
    }
  };
  xhr.send(jsPsych.data.get().json());
}

// Funciones contadores
//Contador A1
function contadorCorrectoA1(trial_data, opciones){
  var resp_dad_com = trial_data.responses;
  var resp_dad = resp_dad_com.slice(11);
  var resp_cor = opciones[0]+'"}';
  var correct = (resp_dad == resp_cor);
  var correct_txt = correct.toString();
  jsPsych.data.addDataToLastTrial({es_correct: correct_txt});
  if (correct == true) {
    contador_A1 = contador_A1+1;
   };
};

//Contador A2
function contadorCorrectoA2(trial_data, opciones){
  var resp_dad_com = trial_data.responses;
  var resp_dad = resp_dad_com.slice(11);
  var resp_cor = opciones[0]+'"}';
  var correct = (resp_dad == resp_cor);
  var correct_txt = correct.toString();
  jsPsych.data.addDataToLastTrial({es_correct: correct_txt});
  if (correct == true) {
    contador_A2 = contador_A2+1;
   };
};

//Contador b1
function contadorCorrectoB1(trial_data, opciones){
  var resp_dad_com = trial_data.responses;
  var resp_dad = resp_dad_com.slice(11);
  var resp_cor = opciones[0]+'"}';
  var correct = (resp_dad == resp_cor);
  var correct_txt = correct.toString();
  jsPsych.data.addDataToLastTrial({es_correct: correct_txt});
  if (correct == true) {
    contador_B1 = contador_B1+1;
   };
};

//Contador b2
function contadorCorrectoB2(trial_data, opciones){
  var resp_dad_com = trial_data.responses;
  var resp_dad = resp_dad_com.slice(11);
  var resp_cor = opciones[0]+'"}';
  var correct = (resp_dad == resp_cor);
  var correct_txt = correct.toString();
  jsPsych.data.addDataToLastTrial({es_correct: correct_txt});
  if (correct == true) {
    contador_B2 = contador_B2+1;
   };
};


//Contador c1
function contadorCorrectoC1(trial_data, opciones){
  var resp_dad_com = trial_data.responses;
  var resp_dad = resp_dad_com.slice(11);
  var resp_cor = opciones[0]+'"}';
  var correct = (resp_dad == resp_cor);
  var correct_txt = correct.toString();
  jsPsych.data.addDataToLastTrial({es_correct: correct_txt});
  if (correct == true) {
    contador_C1 = contador_C1+1;
   };
};

// Funcion: evaluar nivel y sumar nivel a columna
function generateLevelName(){
  if (contador_A1 < 6) { nivel = "inferior a A1"
} else if (contador_A2 < 7) {nivel = "A1"
} else if (contador_B1 < 8) {nivel = "A2"
} else if (contador_B2 < 10) {nivel = "B1"
} else if (contador_C1 < 10) {nivel = "B2"
} else                      {nivel = "C1"
};
mensaje_final = ["Se ha terminado el tiempo para realizar la prueba de nivel.<br> Sus respuestas han sido guardadas. Su nivel es: "+ nivel ];
jsPsych.data.addProperties({
       nivelObtenido: nivel
     });
jsPsych.data.addDataToLastTrial({
       niveles: nivel
     });
};


// Función chequear tiempo y terminar si se acaba
function checkTime(){
  var tiempo = jsPsych.totalTime()-iniTime;
   if (tiempo > tiempoLimite) {
    generateLevelName();
    save_data();
     jsPsych.endExperiment(mensaje_final);
     }
}

// Función mostrar alerta final

function alertTimeout(){
  alert('Se ha terminado el tiempo. Puede cerrar el navegador.')
}


function finalAlert(){

  var tiempoFinal = jsPsych.totalTime()-iniTime;
  if (tiempoFinal > tiempoLimite) {
    setTimeout(alertTimeout, 1500)
  } else {
    alert('Ha terminado el examen. Puede cerrar el navegador.')
  }

}

/* ---------------------------------------------------------------------------
!              Pantallas y preguntas                                         !
!                                                                            !
-----------------------------------------------------------------------------*/


// Bienvenida
var bienvenida = {
    type: 'html-keyboard-response',
    stimulus: "<p style='padding-top:10%'>Bienvenido a la prueba de nivel.<br></p><p> Presione cualquier tecla para comenzar.</p>"
}


//Nombre
var pedirNombre = {
  type: 'survey-text',
  questions: [{prompt: "Escriba su nombre"}, {prompt: "<p>Escriba su apellido</p>"}, {prompt: "<p>&nbsp;</p>Escriba su correo electrónico"}],
  button_label: boton,
  // Función para sumar el nombre en todos los estímulos como código en una columna
    on_finish: function (trial_data){var nameData = trial_data.responses;
      //Limpiar el texto
      var nameData2 = nameData.replace(/{"Q0":"/gi, "");
      var nameData3 = nameData2.replace(/","Q1":"/gi, "_");
    var nameData1 = nameData3.replace(/"}/gi, "");
    var nombre = nameData1.replace(/","Q2":"/gi, "_ma:");
    // Con esto se suma a todas las respuestas
    jsPsych.data.addProperties({
           alumno: nombre + "_" + subject_id
         });}
};


// Instrucciones

var instrucciones = {
  type: 'instructions',
  pages: ['<span style="text-align: justify;"><p><b>Instrucciones:</b></p><p>- Esta prueba contiene 60 preguntas de opción múltiple.<br>- Tiene 30 minutos para realizar la prueba.</p></span>',
    '<span style="text-align: justify;"><p><b>Instrucciones:</b></p><p>- Usted debe elegir la opción correcta para cada pregunta. <br>- Debe seleccionar una sola respuesta (a, b o c) en cada pregunta. <br>- Una vez enviada la respuesta, no podrá volver hacia atrás en las preguntas.</span>','<p style="text-align:center; padding-top:40px;"><b>Al presionar siguiente comenzará la prueba</b></p>'],
  show_clickable_nav: true,on_finish: function(){
    // Mostrar texto de timer
    document.getElementById('timerTxt').className = "timerTxtShow";
    // Iniciar Timer del examen
    document.getElementById('timer').innerHTML =
      30 + ":" + 0;
    startTimer();
    function startTimer() {
      var presentTime = document.getElementById('timer').innerHTML;
      var timeArray = presentTime.split(/[:]+/);
      var m = timeArray[0];
      var s = checkSecond((timeArray[1] - 1));
      if(s==59){m=m-1}
      if(m<0){var m=0; var s=0};
      document.getElementById('timer').innerHTML =
        m + ":" + s;
      setTimeout(startTimer, 1000);
    }
    function checkSecond(sec) {
      if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
      if (sec < 0) {sec = "59"};
      return sec;
    }
    // Setear variable tiempo de inicio
    iniTime = jsPsych.totalTime();
  }

}



//Crear banco de preguntas

//A1
var preguntas_A1G1 = ["<p><b>Elija la opción correcta: </b></p><p>Mi hermano nunca _______ temprano por la mañana porque trabaja por la tarde.</p><p>&nbsp;<br><b>Opciones:</b></p>"];
var opciones_A1G1 = ["se levanta", "te levantas", "le levantas"];
var opciones_A1G1_RND = jsPsych.randomization.repeat(opciones_A1G1, 1);
var opciones_A1G1_final = [" a) "+opciones_A1G1_RND[0], " b) "+opciones_A1G1_RND[1] , " c) "+opciones_A1G1_RND[2]];
var codigo_A1G1 =  "A1G1";

var preguntas_A1G2 = ["<p><b>Elija la opción correcta: </b></p><p>Creo que tu casa es ________ bonita.</p><p>&nbsp;<br><b>Opciones:</b></p>"];
var opciones_A1G2 = ["muy", "mucho", "mucha"];
var opciones_A1G2_RND = jsPsych.randomization.repeat(opciones_A1G2, 1);
var opciones_A1G2_final = [" a) "+opciones_A1G2_RND[0], " b) "+opciones_A1G2_RND[1] , " c) "+opciones_A1G2_RND[2]];
var codigo_A1G2 =  "A1G2";


var codigo_A1G3 = "A1G3";
var opciones_A1G3 = ["venir",  "vienes",   "venimos"];
var opciones_A1G3_RND = jsPsych.randomization.repeat(opciones_A1G3, 1);
var opciones_A1G3_final = [" a) "+opciones_A1G3_RND[0], " b) "+opciones_A1G3_RND[1], " c) "+opciones_A1G3_RND[2]];
var preguntas_A1G3 = ["<p><b>Elija la opción correcta: </b></p><p>¿Quieres _______ a mi casa para estudiar?</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_A1L1 = "A1L1";
var opciones_A1L1 = ["hay",  "está",   "es"];
var opciones_A1L1_RND = jsPsych.randomization.repeat(opciones_A1L1, 1);
var opciones_A1L1_final = [" a) "+opciones_A1L1_RND[0], " b) "+opciones_A1L1_RND[1], " c) "+opciones_A1L1_RND[2]];
var preguntas_A1L1 = ["<p><b>Elija la opción correcta: </b></p><p>¿Sabes dónde ______ una farmacia cerca de aquí?</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_A1L2 = "A1L2";
var opciones_A1L2 = ["El",  "En",   "De"];
var opciones_A1L2_RND = jsPsych.randomization.repeat(opciones_A1L2, 1);
var opciones_A1L2_final = [" a) "+opciones_A1L2_RND[0], " b) "+opciones_A1L2_RND[1], " c) "+opciones_A1L2_RND[2]];
var preguntas_A1L2 = ["<p><b>Elija la opción correcta: </b></p><p>______ sábado voy al teatro.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_A1L3 = "A1L3";
var opciones_A1L3 = ["profesor",  "abogado",   "jefe"];
var opciones_A1L3_RND = jsPsych.randomization.repeat(opciones_A1L3, 1);
var opciones_A1L3_final = [" a) "+opciones_A1L3_RND[0], " b) "+opciones_A1L3_RND[1], " c) "+opciones_A1L3_RND[2]];
var preguntas_A1L3 = ["<p><b>Elija la opción correcta: </b></p><p>Mi hermano es __________ de Química en la universidad y tiene estudiantes de todo el mundo.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_A1F1 = "A1F1";
var opciones_A1F1 = ["¿De dónde eres?",  "¿Cómo te llamas?",   "¿A qué te dedicas?"];
var opciones_A1F1_RND = jsPsych.randomization.repeat(opciones_A1F1, 1);
var opciones_A1F1_final = [" a) "+opciones_A1F1_RND[0], " b) "+opciones_A1F1_RND[1], " c) "+opciones_A1F1_RND[2]];
var preguntas_A1F1 = ["<p><b>Elija la opción correcta: </b></p><p>- __________________</p><p>- Soy francesa, ¿y tú?</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_A1F2 = "A1F2";
var opciones_A1F2 = ["- Yo también.",  "- Yo tampoco.",   "- Yo sí."];
var opciones_A1F2_RND = jsPsych.randomization.repeat(opciones_A1F2, 1);
var opciones_A1F2_final = [" a) "+opciones_A1F2_RND[0], " b) "+opciones_A1F2_RND[1], " c) "+opciones_A1F2_RND[2]];
var preguntas_A1F2 = ["<p><b>Elija la opción correcta: </b></p><p>- Creo que estudiar español es muy importante.</p><p>- ________________________.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

// A2
var codigo_A2G1 = "A2G1";
var opciones_A2G1 = ["eras",  "fuiste",   "has sido"];
var opciones_A2G1_RND = jsPsych.randomization.repeat(opciones_A2G1, 1);
var opciones_A2G1_final = [" a) "+opciones_A2G1_RND[0], " b) "+opciones_A2G1_RND[1], " c) "+opciones_A2G1_RND[2]];
var preguntas_A2G1 = ["<p><b>Elija la opción correcta: </b></p><p>- Sandra, ¿qué te gustaba hacer cuando ______ niña?</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_A2G2 = "A2G2";
var opciones_A2G2 = ["despertarme",  "me despierto",   "despertándome"];
var opciones_A2G2_RND = jsPsych.randomization.repeat(opciones_A2G2, 1);
var opciones_A2G2_final = [" a) "+opciones_A2G2_RND[0], " b) "+opciones_A2G2_RND[1], " c) "+opciones_A2G2_RND[2]];
var preguntas_A2G2 = ["<p><b>Elija la opción correcta: </b></p><p>- ¿Qué vas a hacer este domingo?</p><p>- Voy a ___________ temprano para correr un rato en el parque y luego voy a almorzar con mis padres. ¿Y tú?</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_A2G3 = "A2G3";
var opciones_A2G3 = ["ciérrala",  "ciérrela",   "cerrarla"];
var opciones_A2G3_RND = jsPsych.randomization.repeat(opciones_A2G3, 1);
var opciones_A2G3_final = [" a) "+opciones_A2G3_RND[0], " b) "+opciones_A2G3_RND[1], " c) "+opciones_A2G3_RND[2]];
var preguntas_A2G3 = ["<p><b>Elija la opción correcta: </b></p><p>- Hace mucho frío aquí.</p><p>- Sí, está abierta la ventana. Por favor, ________ tú. Yo no llego porque está muy alta.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_A2G4 = "A2G4";
var opciones_A2G4 = ["nada",  "ningún",   "algo"];
var opciones_A2G4_RND = jsPsych.randomization.repeat(opciones_A2G4, 1);
var opciones_A2G4_final = [" a) "+opciones_A2G4_RND[0], " b) "+opciones_A2G4_RND[1], " c) "+opciones_A2G4_RND[2]];
var preguntas_A2G4 = ["<p><b>Elija la opción correcta: </b></p><p>¿Qué cenamos hoy?</p><p>No sé, no hay _______ para cocinar. Podemos comprar un poco de queso y tomate para hacer una pizza.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_A2L1 = "A2L1";
var opciones_A2L1 = ["ya",  "todavía",   "ahora"];
var opciones_A2L1_RND = jsPsych.randomization.repeat(opciones_A2L1, 1);
var opciones_A2L1_final = [" a) "+opciones_A2L1_RND[0], " b) "+opciones_A2L1_RND[1], " c) "+opciones_A2L1_RND[2]];
var preguntas_A2L1 = ["<p><b>Elija la opción correcta: </b></p><p>Julián, mañana es el concierto, ¿_____ has comprado las entradas?</p><p>No, no he tenido tiempo.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_A2L2 = "A2L2";
var opciones_A2L2 = ["mayor",  "mejor",   "viejo"];
var opciones_A2L2_RND = jsPsych.randomization.repeat(opciones_A2L2, 1);
var opciones_A2L2_final = [" a) "+opciones_A2L2_RND[0], " b) "+opciones_A2L2_RND[1], " c) "+opciones_A2L2_RND[2]];
var preguntas_A2L2 = ["<p><b>Elija la opción correcta: </b></p><p>Mis padres y mi hermano menor viven en Colombia, pero mi hermano _____ vive en México porque está estudiando allí.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_A2L3 = "A2L3";
var opciones_A2L3 = ["tocar",  "jugar",   "oír"];
var opciones_A2L3_RND = jsPsych.randomization.repeat(opciones_A2L3, 1);
var opciones_A2L3_final = [" a) "+opciones_A2L3_RND[0], " b) "+opciones_A2L3_RND[1], " c) "+opciones_A2L3_RND[2]];
var preguntas_A2L3 = ["<p><b>Elija la opción correcta: </b></p><p>¿Cuándo aprendiste a _________la guitarra?</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_A2F1 = "A2F1";
var opciones_A2F1 = ["¿Qué te gustaría hacer?",  "¿Qué tienes que hacer?",  "¿Qué puedes hacer?"];
var opciones_A2F1_RND = jsPsych.randomization.repeat(opciones_A2F1, 1);
var opciones_A2F1_final = [" a) "+opciones_A2F1_RND[0], " b) "+opciones_A2F1_RND[1], " c) "+opciones_A2F1_RND[2]];
var preguntas_A2F1 = ["<p><b>Elija la opción correcta: </b></p><p>Tengo tiempo libre este fin de semana, ¿y tú?</p><p>¡Yo también! __________________</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_A2F2 = "A2F2";
var opciones_A2F2 = ["tengo que",  "creo que",   "quiero que"];
var opciones_A2F2_RND = jsPsych.randomization.repeat(opciones_A2F2, 1);
var opciones_A2F2_final = [" a) "+opciones_A2F2_RND[0], " b) "+opciones_A2F2_RND[1], " c) "+opciones_A2F2_RND[2]];
var preguntas_A2F2 = ["<p><b>Elija la opción correcta: </b></p><p>Ricardo, hoy no voy a poder ir al concierto contigo porque _______ estudiar para un examen.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_A2F3 = "A2F3";
var opciones_A2F3 = ["La sala tiene una ventana con vista a un pequeño jardín.",  "Un día me senté a leer un rato en el jardín.",   "Es muy importante tener un jardín en casa."];
var opciones_A2F3_RND = jsPsych.randomization.repeat(opciones_A2F3, 1);
var opciones_A2F3_final = [" a) "+opciones_A2F3_RND[0], " b) "+opciones_A2F3_RND[1], " c) "+opciones_A2F3_RND[2]];
var preguntas_A2F3 = ["<p><b>Elija la opción correcta: </b></p><p style='text-align:justify;'>Mi casa es muy pequeña, pero me encanta vivir allí. Está en un barrio tranquilo pero cerca del centro. Tiene dos habitaciones, una sala, una cocina y un baño. ___________________. En verano es muy bonito porque hay muchas plantas y flores de todos los colores.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

//B1
var codigo_B1G1 = "B1G1";
var opciones_B1G1 = ["había olvidado",  "olvidé",   "he olvidado"];
var opciones_B1G1_RND = jsPsych.randomization.repeat(opciones_B1G1, 1);
var opciones_B1G1_final = [" a) "+opciones_B1G1_RND[0], " b) "+opciones_B1G1_RND[1], " c) "+opciones_B1G1_RND[2]];
var preguntas_B1G1 = ["<p><b>Elija la opción correcta: </b></p><p>- ¿Qué pasó anoche? ¿Por qué llegaste tan tarde a la cena?</p><p style='text-align:justify;'>- Cuando llegué a casa, me di cuenta de que _________ las llaves en la oficina, entonces tuve que volver a buscarlas. Luego me duché y fui al restaurante, pero ya era tarde.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B1G2 = "B1G2";
var opciones_B1G2 = ["acabe",  "acaba",   "acabará"];
var opciones_B1G2_RND = jsPsych.randomization.repeat(opciones_B1G2, 1);
var opciones_B1G2_final = [" a) "+opciones_B1G2_RND[0], " b) "+opciones_B1G2_RND[1], " c) "+opciones_B1G2_RND[2]];
var preguntas_B1G2 = ["<p><b>Elija la opción correcta: </b></p><p>- Te ves cansado. ¿Cuándo tienes vacaciones?</p><p>Cuando ___________ este proyecto. ¡Estamos trabajando mucho para terminarlo pronto!</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B1G3 = "B1G3";
var opciones_B1G3 = ["que",  "quien",   "cual"];
var opciones_B1G3_RND = jsPsych.randomization.repeat(opciones_B1G3, 1);
var opciones_B1G3_final = [" a) "+opciones_B1G3_RND[0], " b) "+opciones_B1G3_RND[1], " c) "+opciones_B1G3_RND[2]];
var preguntas_B1G3 = ["<p><b>Elija la opción correcta: </b></p><p>- ¿Con quién estabas hablando ayer por la noche en la puerta del cine?</p><p>- Con Marcos, un hombre __________ trabaja con mi padre.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B1G4 = "B1G4";
var opciones_B1G4 = ["se",  "te",   "le"];
var opciones_B1G4_RND = jsPsych.randomization.repeat(opciones_B1G4, 1);
var opciones_B1G4_final = [" a) "+opciones_B1G4_RND[0], " b) "+opciones_B1G4_RND[1], " c) "+opciones_B1G4_RND[2]];
var preguntas_B1G4 = ["<p><b>Elija la opción correcta: </b></p><p>- ¿Podrías enviarle un correo al director de la empresa para explicarle lo que pasó ayer?</p><p>- Ya ___________ lo envié hoy temprano.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B1L1 = "B1L1";
var opciones_B1L1 = ["repasar",  "corregir",   "explicar"];
var opciones_B1L1_RND = jsPsych.randomization.repeat(opciones_B1L1, 1);
var opciones_B1L1_final = [" a) "+opciones_B1L1_RND[0], " b) "+opciones_B1L1_RND[1], " c) "+opciones_B1L1_RND[2]];
var preguntas_B1L1 = ["<p><b>Elija la opción correcta: </b></p><p>El examen es muy difícil, por eso necesito __________ todas las unidades del libro.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B1L2 = "B1L2";
var opciones_B1L2 = ["al día siguiente",  "mañana",   "desde entonces"];
var opciones_B1L2_RND = jsPsych.randomization.repeat(opciones_B1L2, 1);
var opciones_B1L2_final = [" a) "+opciones_B1L2_RND[0], " b) "+opciones_B1L2_RND[1], " c) "+opciones_B1L2_RND[2]];
var preguntas_B1L2 = ["<p><b>Elija la opción correcta: </b></p><p>- ¿Cómo fue tu primera entrevista de trabajo?</p><p style='text-align:justify';>- ¡Muy difícil! Me preguntaron si alguna vez había trabajado en una empresa de medios, ¡pero yo no tenía experiencia! Por suerte, ____________ me dieron el puesto.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B1L3 = "B1L3";
var opciones_B1L3 = ["me puse triste",  "me aburrí",   "me alegré"];
var opciones_B1L3_RND = jsPsych.randomization.repeat(opciones_B1L3, 1);
var opciones_B1L3_final = [" a) "+opciones_B1L3_RND[0], " b) "+opciones_B1L3_RND[1], " c) "+opciones_B1L3_RND[2]];
var preguntas_B1L3 = ["<p><b>Elija la opción correcta: </b></p><p>Cuando me avisaron que había reprobado el examen, __________.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B1L4 = "B1L4";
var opciones_B1L4 = ["ganó",  "logró",   "intentó"];
var opciones_B1L4_RND = jsPsych.randomization.repeat(opciones_B1L4, 1);
var opciones_B1L4_final = [" a) "+opciones_B1L4_RND[0], " b) "+opciones_B1L4_RND[1], " c) "+opciones_B1L4_RND[2]];
var preguntas_B1L4 = ["<p><b>Elija la opción correcta: </b></p><p>Juan Carlos está contento porque ________ una beca y el próximo semestre va a ir a estudiar a Francia.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B1F1 = "B1F1";
var opciones_B1F1 = ["Estoy de acuerdo.",  "Está claro.",   "Sí, yo también."];
var opciones_B1F1_RND = jsPsych.randomization.repeat(opciones_B1F1, 1);
var opciones_B1F1_final = [" a) "+opciones_B1F1_RND[0], " b) "+opciones_B1F1_RND[1], " c) "+opciones_B1F1_RND[2]];
var preguntas_B1F1 = ["<p><b>Elija la opción correcta: </b></p><p>- Me contaron que Mariana dejó la universidad y se va de viaje por un año. A mí no me parece mal, ¿tú qué opinas?</p><p>- __________________</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B1F2 = "B1F2";
var opciones_B1F2 = ["puede que estén",  "no estoy seguro de que estén",   "probablemente estarían"];
var opciones_B1F2_RND = jsPsych.randomization.repeat(opciones_B1F2, 1);
var opciones_B1F2_final = [" a) "+opciones_B1F2_RND[0], " b) "+opciones_B1F2_RND[1], " c) "+opciones_B1F2_RND[2]];
var preguntas_B1F2 = ["<p><b>Elija la opción correcta: </b></p><p>- No encuentro mis llaves, ¿las viste?</p><p>- No, pero ___________ en el auto.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B1F3 = "B1F3";
var opciones_B1F3 = ["te parece",  "me parece",   "se parece"];
var opciones_B1F3_RND = jsPsych.randomization.repeat(opciones_B1F3, 1);
var opciones_B1F3_final = [" a) "+opciones_B1F3_RND[0], " b) "+opciones_B1F3_RND[1], " c) "+opciones_B1F3_RND[2]];
var preguntas_B1F3 = ["<p><b>Elija la opción correcta: </b></p><p>- ¿Qué ___________ este vestido para la fiesta del sábado?</p><p>¡Me encanta!</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B1F4 = "B1F4";
var opciones_B1F4 = ["Con la voz segura pero amable, le pregunté si había tomado por error un teléfono que no era suyo.",  "En general los ladrones son rápidos porque deben escaparse antes de que llegue la policía.",   "Estaba muy cansada porque había tenido un mal día; por eso no estaba prestando atención."];
var opciones_B1F4_RND = jsPsych.randomization.repeat(opciones_B1F4, 1);
var opciones_B1F4_final = [" a) "+opciones_B1F4_RND[0], " b) "+opciones_B1F4_RND[1], " c) "+opciones_B1F4_RND[2]];
var preguntas_B1F4 = ["<p><b>Elija la opción correcta: </b></p><p style='text-align:justify;'>Anoche, mientras cenaba con mis amigas, me pasó algo muy loco. Un ladrón tomó mi teléfono y salió corriendo. En cuanto me di cuenta, me levanté y lo seguí. Corrí muy rápido y por eso pude encontrarlo en segundos. ____________ El ladrón se puso muy nervioso porque no estaba esperando algo así. Al final dijo: 'Ah, ¡sí! Pensé que era mío' y me lo devolvió. Cuando volví al restaurante, todas las mujeres me felicitaron.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

// B2
var codigo_B2G1 = "B2G1";
var opciones_B2G1 = ["hubiera comprado",  "compre",   "comprara"];
var opciones_B2G1_RND = jsPsych.randomization.repeat(opciones_B2G1, 1);
var opciones_B2G1_final = [" a) "+opciones_B2G1_RND[0], " b) "+opciones_B2G1_RND[1], " c) "+opciones_B2G1_RND[2]];
var preguntas_B2G1 = ["<p><b>Elija la opción correcta: </b></p><p>- ¿Has visto los precios de los vuelos a Asia? ¡Subieron muchísimo!</p><p>- Sí, yo quería viajar este año pero lamentablemente no tengo suficiente dinero. Ojalá los _________ con anticipación.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B2G2 = "B2G2";
var opciones_B2G2 = ["siempre y cuando",  "solo si",   "salvo que"];
var opciones_B2G2_RND = jsPsych.randomization.repeat(opciones_B2G2, 1);
var opciones_B2G2_final = [" a) "+opciones_B2G2_RND[0], " b) "+opciones_B2G2_RND[1], " c) "+opciones_B2G2_RND[2]];
var preguntas_B2G2 = ["<p><b>Elija la opción correcta: </b></p><p>- Necesito pedirte un favor, ¿me prestarías tu coche para salir con una chica que conocí en una fiesta?</p><p>- Claro, _____________ me lo devuelvas el domingo antes del mediodía.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B2G3 = "B2G3";
var opciones_B2G3 = ["tenga",  "tendrá",   "tiene"];
var opciones_B2G3_RND = jsPsych.randomization.repeat(opciones_B2G3, 1);
var opciones_B2G3_final = [" a) "+opciones_B2G3_RND[0], " b) "+opciones_B2G3_RND[1], " c) "+opciones_B2G3_RND[2]];
var preguntas_B2G3 = ["<p><b>Elija la opción correcta: </b></p><p>- Buenos días, ¿en qué puedo ayudarlo?</p><p>- Buen día, estoy buscando un libro de cocina que _______ recetas bajas en calorías, y si es posible también recetas vegetarianas. ¿Tiene alguno?</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B2G4 = "B2G4";
var opciones_B2G4 = ["Se me cayó",  "Le cayó",   "Me cayó"];
var opciones_B2G4_RND = jsPsych.randomization.repeat(opciones_B2G4, 1);
var opciones_B2G4_final = [" a) "+opciones_B2G4_RND[0], " b) "+opciones_B2G4_RND[1], " c) "+opciones_B2G4_RND[2]];
var preguntas_B2G4 = ["<p><b>Elija la opción correcta: </b></p><p>- ¿Qué pasó aquí?</p><p>- _________ la jarra con el jugo y se rompió. Pero limpiaré todo, no te preocupes.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B2G5 = "B2G5";
var opciones_B2G5 = ["puesto que",  "como",   "para que"];
var opciones_B2G5_RND = jsPsych.randomization.repeat(opciones_B2G5, 1);
var opciones_B2G5_final = [" a) "+opciones_B2G5_RND[0], " b) "+opciones_B2G5_RND[1], " c) "+opciones_B2G5_RND[2]];
var preguntas_B2G5 = ["<p><b>Elija la opción correcta: </b></p><p>Los socios del club están enfadados ___________ el mejor jugador sufrió una lesión grave en el entrenamiento y no jugará en el campeonato.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B2L1 = "B2L1";
var opciones_B2L1 = ["concluyen",  "anuncian",   "proponen"];
var opciones_B2L1_RND = jsPsych.randomization.repeat(opciones_B2L1, 1);
var opciones_B2L1_final = [" a) "+opciones_B2L1_RND[0], " b) "+opciones_B2L1_RND[1], " c) "+opciones_B2L1_RND[2]];
var preguntas_B2L1 = ["<p><b>Elija la opción correcta: </b></p><p>Las investigaciones ______ que, incluso en la época durante la que se escribían más cartas en el Reino Unido, el ciudadano medio solo recibía una carta cada dos semanas.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B2L2 = "B2L2";
var opciones_B2L2 = ["aumentó",  "cayó",   "disminuyó"];
var opciones_B2L2_RND = jsPsych.randomization.repeat(opciones_B2L2, 1);
var opciones_B2L2_final = [" a) "+opciones_B2L2_RND[0], " b) "+opciones_B2L2_RND[1], " c) "+opciones_B2L2_RND[2]];
var preguntas_B2L2 = ["<p><b>Elija la opción correcta: </b></p><p>Cada vez más gente utiliza los teléfonos inteligentes para realizar compras por internet. El año pasado, el porcentaje de compras realizadas con teléfonos inteligentes ___________ un 10%.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B2L3 = "B2L3";
var opciones_B2L3 = ["factura",  "línea",   "red"];
var opciones_B2L3_RND = jsPsych.randomization.repeat(opciones_B2L3, 1);
var opciones_B2L3_final = [" a) "+opciones_B2L3_RND[0], " b) "+opciones_B2L3_RND[1], " c) "+opciones_B2L3_RND[2]];
var preguntas_B2L3 = ["<p><b>Elija la opción correcta: </b></p><p>- Carlos, la _______ del teléfono de este mes es bastante más alta, ¿qué ha pasado?</p><p>- He tenido que hacer algunas llamadas internacionales, pero no te preocupes. A partir de ahora las haré por Internet.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B2L4 = "B2L4";
var opciones_B2L4 = ["un analgésico",  "un antibiótico",   "una pomada"];
var opciones_B2L4_RND = jsPsych.randomization.repeat(opciones_B2L4, 1);
var opciones_B2L4_final = [" a) "+opciones_B2L4_RND[0], " b) "+opciones_B2L4_RND[1], " c) "+opciones_B2L4_RND[2]];
var preguntas_B2L4 = ["<p><b>Elija la opción correcta: </b></p><p>- No puedo trabajar más, me duele mucho la cabeza.</p><p>- Toma, aquí tienes _________. Esto te va a ayudar.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B2L5 = "B2L5";
var opciones_B2L5 = ["diputados",  "votantes",   "candidatos"];
var opciones_B2L5_RND = jsPsych.randomization.repeat(opciones_B2L5, 1);
var opciones_B2L5_final = [" a) "+opciones_B2L5_RND[0], " b) "+opciones_B2L5_RND[1], " c) "+opciones_B2L5_RND[2]];
var preguntas_B2L5 = ["<p><b>Elija la opción correcta: </b></p><p>Ayer por la noche en el congreso, los ___________ aprobaron una ley que regula la producción y la gestión de residuos en las ciudades.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B2F1 = "B2F1";
var opciones_B2F1 = ["además de",  "para finalizar",   "por otro lado"];
var opciones_B2F1_RND = jsPsych.randomization.repeat(opciones_B2F1, 1);
var opciones_B2F1_final = [" a) "+opciones_B2F1_RND[0], " b) "+opciones_B2F1_RND[1], " c) "+opciones_B2F1_RND[2]];
var preguntas_B2F1 = ["<p><b>Elija la opción correcta: </b></p><p style='text-align:justify;'>Las entrevistas de trabajo son un proceso que genera nervios y ansiedad en el candidato. Durante el encuentro, se evalúan conocimientos relacionados con el puesto en cuestión, ________ habilidades y competencias generales.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B2F2 = "B2F2";
var opciones_B2F2 =["Qué lástima",  "Lo siento",   "Ojalá"];
var opciones_B2F2_RND = jsPsych.randomization.repeat(opciones_B2F2, 1);
var opciones_B2F2_final = [" a) "+opciones_B2F2_RND[0], " b) "+opciones_B2F2_RND[1], " c) "+opciones_B2F2_RND[2]];
var preguntas_B2F2 = ["<p><b>Elija la opción correcta: </b></p><p>- Ayer fui a ver la nueva exposición en el Museo de Arte Moderno. Iba a ir con un amigo pero tuvo que trabajar hasta tarde, así que fui solo.</p><p>- ¡ _________ que no me hayas dicho nada! Yo iré el próximo fin de semana, pero podría haber ido contigo.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B2F3 = "B2F3";
var opciones_B2F3 = ["Le agradecería muchísimo",  "Sería muy importante",   "Le importaría"];
var opciones_B2F3_RND = jsPsych.randomization.repeat(opciones_B2F3, 1);
var opciones_B2F3_final = [" a) "+opciones_B2F3_RND[0], " b) "+opciones_B2F3_RND[1], " c) "+opciones_B2F3_RND[2]];
var preguntas_B2F3 = ["<p><b>Elija la opción correcta: </b></p><p>He finalizado mi carrera de grado y quisiera comenzar un máster el próximo año. ___________ que me enviara información sobre el proceso de solicitud de beca.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B2F4 = "B2F4";
var opciones_B2F4 = ["Habrá perdido",  "Ha perdido",   "Había perdido"];
var opciones_B2F4_RND = jsPsych.randomization.repeat(opciones_B2F4, 1);
var opciones_B2F4_final = [" a) "+opciones_B2F4_RND[0], " b) "+opciones_B2F4_RND[1], " c) "+opciones_B2F4_RND[2]];
var preguntas_B2F4 = ["<p><b>Elija la opción correcta: </b></p><p>- ¿Dónde está Pedro? ¿No ha llegado aún? Ayer me dijo que vendría a las 17:00 y ya son las 17:30.</p><p>- No, todavía no ha llegado y no puedo comunicarme con él. ¿_____________ el tren?</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_B2F5 = "B2F5";
var opciones_B2F5 = ["Cordialmente",  "Con afecto",   "Hasta pronto"];
var opciones_B2F5_RND = jsPsych.randomization.repeat(opciones_B2F5, 1);
var opciones_B2F5_final = [" a) "+opciones_B2F5_RND[0], " b) "+opciones_B2F5_RND[1], " c) "+opciones_B2F5_RND[2]];
var preguntas_B2F5 = ["<p><b>Elija la opción correcta: </b></p><p>Estimado Sr. García:</p><p>Tengo el gusto de dirigirme a Ud. con el objeto de postularme al puesto ofrecido en el anuncio publicado el día 3 de junio en el sitio web de la empresa.<br>[…]<br>Quedo a su disposición para facilitarle cualquier otra información.</p><p>___________,</p><p>M. Herrera</p><p>&nbsp;<br><b>Opciones:</b></p>"];

//C1
var codigo_C1G1 = "C1G1";
var opciones_C1G1 = ["cuyas",  "que las",   "cuales"];
var opciones_C1G1_RND = jsPsych.randomization.repeat(opciones_C1G1, 1);
var opciones_C1G1_final = [" a) "+opciones_C1G1_RND[0], " b) "+opciones_C1G1_RND[1], " c) "+opciones_C1G1_RND[2]];
var preguntas_C1G1 = ["<p><b>Elija la opción correcta: </b></p><p style='text-align:justify;'>Según información difundida por la Organización Mundial de la Salud, la inactividad física representa un peligro para la salud de las personas, particularmente para aquellos _________ edades oscilan entre los 30 y los 70 años.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_C1G2 = "C1G2";
var opciones_C1G2 = ["con el fin de que",  "de ahí que",  "por más que"];
var opciones_C1G2_RND = jsPsych.randomization.repeat(opciones_C1G2, 1);
var opciones_C1G2_final = [" a) "+opciones_C1G2_RND[0], " b) "+opciones_C1G2_RND[1], " c) "+opciones_C1G2_RND[2]];
var preguntas_C1G2 = ["<p><b>Elija la opción correcta: </b></p><p style='text-align:justify;'>Los trabajadores con más experiencia en puestos de responsabilidad desarrollan ciertas estrategias para poner límites, ______ las obligaciones del mundo del trabajo alteren lo menos posible la vida familiar.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_C1G3 = "C1G3";
var opciones_C1G3 = ["aun cuando",  "si bien",   "siempre y cuando"];
var opciones_C1G3_RND = jsPsych.randomization.repeat(opciones_C1G3, 1);
var opciones_C1G3_final = [" a) "+opciones_C1G3_RND[0], " b) "+opciones_C1G3_RND[1], " c) "+opciones_C1G3_RND[2]];
var preguntas_C1G3 = ["<p><b>Elija la opción correcta: </b></p><p style='text-align:justify;'>A partir de ahora, los teléfonos celulares pueden utilizarse en los colegios secundarios con fines pedagógicos __________ algunos especialistas en la materia no estén de acuerdo con esa decisión.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_C1G4 = "C1G4";
var opciones_C1G4 = ["está limpio",  "es limpio",   "es limpiado"];
var opciones_C1G4_RND = jsPsych.randomization.repeat(opciones_C1G4, 1);
var opciones_C1G4_final = [" a) "+opciones_C1G4_RND[0], " b) "+opciones_C1G4_RND[1], " c) "+opciones_C1G4_RND[2]];
var preguntas_C1G4 = ["<p><b>Elija la opción correcta: </b></p><p style='text-align:justify;'>Los resultados de una encuesta indican que las mujeres tienen una visión más negativa del sistema de salud que los hombres. Hilda, paciente del Hospital Rivadavia, dice que el edificio está en muy mal estado, pero reconoce que al menos ahora _________.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_C1G5 = "C1G5";
var opciones_C1G5 = ["llegó a ser",  "fue a ser",   "llevó a ser"];
var opciones_C1G5_RND = jsPsych.randomization.repeat(opciones_C1G5, 1);
var opciones_C1G5_final = [" a) "+opciones_C1G5_RND[0], " b) "+opciones_C1G5_RND[1], " c) "+opciones_C1G5_RND[2]];
var preguntas_C1G5 = ["<p><b>Elija la opción correcta: </b></p><p style='text-align:justify;'>El libro sobre el famoso empresario fue un éxito de ventas en 2011. Su vida sirve de ejemplo para emprendedores jóvenes que quieren buscar un modelo a seguir. Con más de 40 entrevistas hechas durante dos años, este libro relata la historia de un muchacho que, después de inventar su primera computadora en su garaje, _______ uno de los empresarios más reconocidos del mundo.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_C1L1 = "C1L1";
var opciones_C1L1 = ["carecen",  "faltan",   "escasean"];
var opciones_C1L1_RND = jsPsych.randomization.repeat(opciones_C1L1, 1);
var opciones_C1L1_final = [" a) "+opciones_C1L1_RND[0], " b) "+opciones_C1L1_RND[1], " c) "+opciones_C1L1_RND[2]];
var preguntas_C1L1 = ["<p><b>Elija la opción correcta: </b></p><p>Los sistemas educativos de éxito han encontrado maneras de distribuir los recursos para igualar las condiciones de los estudiantes que ________ de los recursos materiales y humanos de los que sí disponen los estudiantes de entornos privilegiados.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_C1L2 = "C1L2";
var opciones_C1L2 = ["ajustarse",  "asimilarse",   "incorporarse"];
var opciones_C1L2_RND = jsPsych.randomization.repeat(opciones_C1L2, 1);
var opciones_C1L2_final = [" a) "+opciones_C1L2_RND[0], " b) "+opciones_C1L2_RND[1], " c) "+opciones_C1L2_RND[2]];
var preguntas_C1L2 = ["<p><b>Elija la opción correcta: </b></p><p>Los estudiantes que realicen prácticas profesionales en otros organismos deberán ___________ a los horarios, normas y reglamentos del mismo.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_C1L3 = "C1L3";
var opciones_C1L3 = ["quiebra",  "ruinas",   "blanco"];
var opciones_C1L3_RND = jsPsych.randomization.repeat(opciones_C1L3, 1);
var opciones_C1L3_final = [" a) "+opciones_C1L3_RND[0], " b) "+opciones_C1L3_RND[1], " c) "+opciones_C1L3_RND[2]];
var preguntas_C1L3 = ["<p><b>Elija la opción correcta: </b></p><p style='text-align:justify;'>La ciudad estadounidense de Detroit se declaró en ______. Con una deuda de 18.500 millones de dólares, tiene 78.000 edificios abandonados, solo funciona un tercio de las ambulancias por falta de presupuesto, el 40% del alumbrado público no funciona y hay problemas graves en los servicios públicos básicos.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_C1L4 = "C1L4";
var opciones_C1L4 = ["trama",  "interpretación",   "escena"];
var opciones_C1L4_RND = jsPsych.randomization.repeat(opciones_C1L4, 1);
var opciones_C1L4_final = [" a) "+opciones_C1L4_RND[0], " b) "+opciones_C1L4_RND[1], " c) "+opciones_C1L4_RND[2]];
var preguntas_C1L4 = ["<p><b>Elija la opción correcta: </b></p><p>Los personajes y temáticas pasaron a ser el foco del interés de los grandes estudios, desplazando a las figuras que ganan fortunas. Una estrella altamente cotizada ya no es la única respuesta para la vertiginosa velocidad del actual mundo del espectáculo. Ahora, la estrella es la ____.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_C1L5 = "C1L5";
var opciones_C1L5 = ["comprobada",  "analizada",   "planteada"];
var opciones_C1L5_RND = jsPsych.randomization.repeat(opciones_C1L5, 1);
var opciones_C1L5_final = [" a) "+opciones_C1L5_RND[0], " b) "+opciones_C1L5_RND[1], " c) "+opciones_C1L5_RND[2]];
var preguntas_C1L5 = ["<p><b>Elija la opción correcta: </b></p><p style='text-align:justify;'>Para plantear una hipótesis adecuada, se deben emplear términos claros y concretos. Una hipótesis sin referencia empírica constituye un juicio de valor. Si no puede ser __________ empíricamente, desde el punto de vista científico no tiene validez.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_C1F1 = "C1F1";
var opciones_C1F1 = ["por el contrario",  "no obstante",   "con todo"];
var opciones_C1F1_RND = jsPsych.randomization.repeat(opciones_C1F1, 1);
var opciones_C1F1_final = [" a) "+opciones_C1F1_RND[0], " b) "+opciones_C1F1_RND[1], " c) "+opciones_C1F1_RND[2]];
var preguntas_C1F1 = ["<p><b>Elija la opción correcta: </b></p><p>Una investigación reveló que mantener una temperatura cálida constante en un ambiente cerrado no es favorable para la salud del organismo. __________, la variación gradual del clima puede servir para combatir la obesidad y la diabetes tipo 2.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_C1F2 = "C1F2";
var opciones_C1F2 = ["Más aun",  "Más bien",   "Es decir"];
var opciones_C1F2_RND = jsPsych.randomization.repeat(opciones_C1F2, 1);
var opciones_C1F2_final = [" a) "+opciones_C1F2_RND[0], " b) "+opciones_C1F2_RND[1], " c) "+opciones_C1F2_RND[2]];
var preguntas_C1F2 = ["<p><b>Elija la opción correcta: </b></p><p style='text-align:justify;'>Una investigación reveló que mantener una temperatura cálida constante en un ambiente cerrado no es favorable para la salud del organismo. __________, la variación gradual del clima puede servir para combatir la obesidad y la diabetes tipo 2.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_C1F3 = "C1F3";
var opciones_C1F3 = ["Siento perdérmela",  "No hay inconveniente",   "Ni hablar"];
var opciones_C1F3_RND = jsPsych.randomization.repeat(opciones_C1F3, 1);
var opciones_C1F3_final = [" a) "+opciones_C1F3_RND[0], " b) "+opciones_C1F3_RND[1], " c) "+opciones_C1F3_RND[2]];
var preguntas_C1F3 = ["<p><b>Elija la opción correcta: </b></p><p>- Mariela, qué suerte que te encuentro, ¿qué haces este fin de semana? Estoy organizando una fiesta, ¿quieres venir?</p><p>- ____________, pero justamente este sábado tengo una reunión familiar a la que no puedo faltar. ¡Gracias de todos modos!</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_C1F4 = "C1F4";
var opciones_C1F4 = ["lo que está claro es",  "da la impresión de",   "lo ideal sería"];
var opciones_C1F4_RND = jsPsych.randomization.repeat(opciones_C1F4, 1);
var opciones_C1F4_final = [" a) "+opciones_C1F4_RND[0], " b) "+opciones_C1F4_RND[1], " c) "+opciones_C1F4_RND[2]];
var preguntas_C1F4 = ["<p><b>Elija la opción correcta: </b></p><p>La cena es la última comida del día y no debe ser una comida abundante. Es recomendable comer alimentos livianos como verduras y cereales. De todas formas, más allá del tipo de alimentos que se consuman, ________ que el control calórico de la cena es importante si queremos adelgazar.</p><p>&nbsp;<br><b>Opciones:</b></p>"];

var codigo_C1F5 = "C1F5";
var opciones_C1F5 = ["Sin embargo, con esto no alcanza para preservar nuestro planeta, ya que también crecerá la demanda de combustibles fósiles.",  "Las proyecciones energéticas indican que dentro de 20 años los humanos emitiremos un 13% más de gases contaminantes que hoy.",   "Esto significa que en las próximas dos décadas habrá un crecimiento del consumo energético provocado por el aumento en la población y la duplicación del PBI mundial."];
var opciones_C1F5_RND = jsPsych.randomization.repeat(opciones_C1F5, 1);
var opciones_C1F5_final = [" a) "+opciones_C1F5_RND[0], " b) "+opciones_C1F5_RND[1], " c) "+opciones_C1F5_RND[2]];
var preguntas_C1F5 = ["<p><b>Elija la opción correcta: </b></p><p style='text-align:justify;'><b>El aumento del riesgo climático</b><br>En los últimos tiempos, hemos estado recibiendo alertas muy graves acerca del calentamiento global, que ya no se pueden ignorar. Por ejemplo, la superficie de hielo en el Ártico existente en enero de este año fue la menor en los últimos 38 años.<br> Es cierto que hay un rápido desarrollo de las energías limpias cuya utilización crecerá mucho más rápido que el resto de las energías, ya que se prevé que hacia el 2035 las energías renovables crecerán 300 por ciento sobre el nivel actual. ________________________________. </p><p>&nbsp;<br><b>Opciones:</b></p>"];


// Crear estimulos grupo A1
var bloque_A1 = [];
var bloque_A2 = [];
var bloque_B1 = [];
var bloque_B2 = [];
var bloque_C1 = [];

// CREAR ITEMS MULTI CHOICE

// Items A1
var stim_A1G1 = {
      type: 'survey-multi-choice',
      questions: [{prompt: preguntas_A1G1, options: opciones_A1G1_final, horizontal: false}],
      data: {pregunta: codigo_A1G1, opciones_mostradas: opciones_A1G1_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){
          contadorCorrectoA1(trial_data, opciones_A1G1);
          checkTime();
        }
        };
bloque_A1.push(stim_A1G1)

var stim_A1G2 = {
      type: 'survey-multi-choice',
      questions: [{prompt: preguntas_A1G2, options: opciones_A1G2_final, horizontal: false}],
      data: {pregunta: codigo_A1G2, opciones_mostradas: opciones_A1G2_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){
            contadorCorrectoA1(trial_data, opciones_A1G2);
            checkTime();
        }
    };
bloque_A1.push(stim_A1G2)

    var stim_A1G3 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A1G3,
       options: opciones_A1G3_final, horizontal: false}],
       data: {pregunta: codigo_A1G3, opciones_mostradas: opciones_A1G3_final.toString()},
        button_label: boton,
        on_finish: function (trial_data){contadorCorrectoA1(trial_data, opciones_A1G3); checkTime();}};

bloque_A1.push(stim_A1G3)


    var stim_A1L1 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A1L1,
      options: opciones_A1L1_final, horizontal: false}],
      data: {pregunta: codigo_A1L1, opciones_mostradas: opciones_A1L1_final.toString()},
      button_label: boton,
       on_finish: function (trial_data){contadorCorrectoA1(trial_data, opciones_A1L1); checkTime();}};
bloque_A1.push(stim_A1L1)

    var stim_A1L2 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A1L2,
       options: opciones_A1L2_final, horizontal: false}],
       data: {pregunta: codigo_A1L2, opciones_mostradas: opciones_A1L2_final.toString()},
        button_label: boton,
        on_finish: function (trial_data){contadorCorrectoA1(trial_data, opciones_A1L2); checkTime();}};
bloque_A1.push(stim_A1L2)

    var stim_A1L3 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A1L3,
      options: opciones_A1L3_final, horizontal: false}],
      data: {pregunta: codigo_A1L3, opciones_mostradas: opciones_A1L3_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoA1(trial_data, opciones_A1L3); checkTime();}};
bloque_A1.push(stim_A1L3)

    var stim_A1F1 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A1F1,
      options: opciones_A1F1_final, horizontal: false}],
      data: {pregunta: codigo_A1F1, opciones_mostradas: opciones_A1F1_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoA1(trial_data, opciones_A1F1); checkTime();}};
bloque_A1.push(stim_A1F1)

    var stim_A1F2 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A1F2,
      options: opciones_A1F2_final, horizontal: false}],
      data: {pregunta: codigo_A1F2, opciones_mostradas: opciones_A1F2_final.toString()},
      button_label: boton,
       on_finish: function (trial_data){contadorCorrectoA1(trial_data, opciones_A1F2); checkTime();}};
bloque_A1.push(stim_A1F2)



// Items A2
    var stim_A2G1 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A2G1,
      options: opciones_A2G1_final, horizontal: false}],
      data: {pregunta: codigo_A2G1, opciones_mostradas: opciones_A2G1_final.toString()},
       button_label: boton,
       on_finish: function (trial_data){contadorCorrectoA2(trial_data, opciones_A2G1); checkTime();}};

bloque_A2.push(stim_A2G1)

    var stim_A2G2 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A2G2,
      options: opciones_A2G2_final, horizontal: false}],
      data: {pregunta: codigo_A2G2, opciones_mostradas: opciones_A2G2_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoA2(trial_data, opciones_A2G2); checkTime();}};

bloque_A2.push(stim_A2G2)

    var stim_A2G3 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A2G3,
       options: opciones_A2G3_final, horizontal: false}],
       data: {pregunta: codigo_A2G3, opciones_mostradas: opciones_A2G3_final.toString()},
       button_label: boton,
       on_finish: function (trial_data){contadorCorrectoA2(trial_data, opciones_A2G3); checkTime();}};

bloque_A2.push(stim_A2G3)

    var stim_A2G4 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A2G4,
      options: opciones_A2G4_final, horizontal: false}],
      data: {pregunta: codigo_A2G4, opciones_mostradas: opciones_A2G4_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoA2(trial_data, opciones_A2G4); checkTime();}};
bloque_A2.push(stim_A2G4)

    var stim_A2L1 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A2L1,
      options: opciones_A2L1_final, horizontal: false}],
      data: {pregunta: codigo_A2L1, opciones_mostradas: opciones_A2L1_final.toString()},
       button_label: boton,
       on_finish: function (trial_data){contadorCorrectoA2(trial_data, opciones_A2L1); checkTime();}};
bloque_A2.push(stim_A2L1)

    var stim_A2L2 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A2L2,
      options: opciones_A2L2_final, horizontal: false}],
      data: {pregunta: codigo_A2L2, opciones_mostradas: opciones_A2L2_final.toString()},
       button_label: boton,
        on_finish: function (trial_data){contadorCorrectoA2(trial_data, opciones_A2L2); checkTime();}};
bloque_A2.push(stim_A2L2)

    var stim_A2L3 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A2L3,
      options: opciones_A2L3_final, horizontal: false}],
      data: {pregunta: codigo_A2L3, opciones_mostradas: opciones_A2L3_final.toString()},
      button_label: boton,
       on_finish: function (trial_data){contadorCorrectoA2(trial_data, opciones_A2L3); checkTime();}};
bloque_A2.push(stim_A2L3)

    var stim_A2F1 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A2F1,
      options: opciones_A2F1_final, horizontal: false}],
      data: {pregunta: codigo_A2F1, opciones_mostradas: opciones_A2F1_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoA2(trial_data, opciones_A2F1); checkTime();}};
bloque_A2.push(stim_A2F1)

    var stim_A2F2 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A2F2,
      options: opciones_A2F2_final, horizontal: false}],
      data: {pregunta: codigo_A2F2, opciones_mostradas: opciones_A2F2_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoA2(trial_data, opciones_A2F2); checkTime();}};
bloque_A2.push(stim_A2F2)

    var stim_A2F3 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_A2F3,
      options: opciones_A2F3_final, horizontal: false}],
      data: {pregunta: codigo_A2F3, opciones_mostradas: opciones_A2F3_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoA2(trial_data, opciones_A2F3); checkTime();}};
bloque_A2.push(stim_A2F3)

// Items B1
    var stim_B1G1 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B1G1,
      options: opciones_B1G1_final, horizontal: false}],
      data: {pregunta: codigo_B1G1, opciones_mostradas: opciones_B1G1_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB1(trial_data, opciones_B1G1); checkTime();}};
bloque_B1.push(stim_B1G1)

    var stim_B1G2 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B1G2,
      options: opciones_B1G2_final, horizontal: false}],
      data: {pregunta: codigo_B1G2, opciones_mostradas: opciones_B1G2_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB1(trial_data, opciones_B1G2); checkTime();}};
bloque_B1.push(stim_B1G2)

    var stim_B1G3 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B1G3,
      options: opciones_B1G3_final, horizontal: false}],
      data: {pregunta: codigo_B1G3, opciones_mostradas: opciones_B1G3_final.toString()},
       button_label: boton,
       on_finish: function (trial_data){contadorCorrectoB1(trial_data, opciones_B1G3); checkTime();}};
bloque_B1.push(stim_B1G3)

    var stim_B1G4 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B1G4,
      options: opciones_B1G4_final, horizontal: false}],
      data: {pregunta: codigo_B1G4, opciones_mostradas: opciones_B1G4_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB1(trial_data, opciones_B1G4); checkTime();}};
bloque_B1.push(stim_B1G4)

    var stim_B1L1 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B1L1,
      options: opciones_B1L1_final, horizontal: false}],
      data: {pregunta: codigo_B1L1, opciones_mostradas: opciones_B1L1_final.toString()},
       button_label: boton,
       on_finish: function (trial_data){contadorCorrectoB1(trial_data, opciones_B1L1); checkTime();}};
bloque_B1.push(stim_B1L1)

    var stim_B1L2 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B1L2,
      options: opciones_B1L2_final, horizontal: false}],
      data: {pregunta: codigo_B1L2, opciones_mostradas: opciones_B1L2_final.toString()},
       button_label: boton,
       on_finish: function (trial_data){contadorCorrectoB1(trial_data, opciones_B1L2); checkTime();}};
bloque_B1.push(stim_B1L2)

    var stim_B1L3 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B1L3,
      options: opciones_B1L3_final, horizontal: false}],
      data: {pregunta: codigo_B1L3, opciones_mostradas: opciones_B1L3_final.toString()},
       button_label: boton,
       on_finish: function (trial_data){contadorCorrectoB1(trial_data, opciones_B1L3); checkTime();}};
bloque_B1.push(stim_B1L3)

    var stim_B1L4 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B1L4,
      options: opciones_B1L4_final, horizontal: false}],
      data: {pregunta: codigo_B1L4, opciones_mostradas: opciones_B1L4_final.toString()},
       button_label: boton,
       on_finish: function (trial_data){contadorCorrectoB1(trial_data, opciones_B1L4); checkTime();}};
bloque_B1.push(stim_B1L4)

    var stim_B1F1 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B1F1,
      options: opciones_B1F1_final, horizontal: false}],
      data: {pregunta: codigo_B1F1, opciones_mostradas: opciones_B1F1_final.toString()},
       button_label: boton,
       on_finish: function (trial_data){contadorCorrectoB1(trial_data, opciones_B1F1); checkTime();}};
bloque_B1.push(stim_B1F1)

    var stim_B1F2 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B1F2,
      options: opciones_B1F2_final, horizontal: false}],
      data: {pregunta: codigo_B1F2, opciones_mostradas: opciones_B1F2_final.toString()},
       button_label: boton,
       on_finish: function (trial_data){contadorCorrectoB1(trial_data, opciones_B1F2); checkTime();}};
bloque_B1.push(stim_B1F2)

    var stim_B1F3 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B1F3,
      options: opciones_B1F3_final, horizontal: false}],
      data: {pregunta: codigo_B1F3, opciones_mostradas: opciones_B1F3_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB1(trial_data, opciones_B1F3); checkTime();}};
bloque_B1.push(stim_B1F3)

    var stim_B1F4 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B1F4,
      options: opciones_B1F4_final, horizontal: false}],
      data: {pregunta: codigo_B1F4, opciones_mostradas: opciones_B1F4_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB1(trial_data, opciones_B1F4); checkTime();}};
bloque_B1.push(stim_B1F4)

// Items B2
    var stim_B2G1 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B2G1,
      options: opciones_B2G1_final, horizontal: false}],
      data: {pregunta: codigo_B2G1, opciones_mostradas: opciones_B2G1_final.toString()},
       button_label: boton,
       on_finish: function (trial_data){contadorCorrectoB2(trial_data, opciones_B2G1); checkTime();}};
bloque_B2.push(stim_B2G1)


    var stim_B2G2 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B2G2,
      options: opciones_B2G2_final, horizontal: false}],
      data: {pregunta: codigo_B2G2, opciones_mostradas: opciones_B2G2_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB2(trial_data, opciones_B2G2); checkTime();}};
bloque_B2.push(stim_B2G2)

    var stim_B2G3 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B2G3,
      options: opciones_B2G3_final, horizontal: false}],
      data: {pregunta: codigo_B2G3, opciones_mostradas: opciones_B2G3_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB2(trial_data, opciones_B2G3); checkTime();}};
bloque_B2.push(stim_B2G3)

    var stim_B2G4 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B2G4,
      options: opciones_B2G4_final, horizontal: false}],
      data: {pregunta: codigo_B2G4, opciones_mostradas: opciones_B2G4_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB2(trial_data, opciones_B2G4); checkTime();}};
bloque_B2.push(stim_B2G4)

    var stim_B2G5 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B2G5,
      options: opciones_B2G5_final, horizontal: false}],
      data: {pregunta: codigo_B2G5, opciones_mostradas: opciones_B2G5_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB2(trial_data, opciones_B2G5); checkTime();}};
bloque_B2.push(stim_B2G5)

    var stim_B2L1 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B2L1,
      options: opciones_B2L1_final, horizontal: false}],
      data: {pregunta: codigo_B2L1, opciones_mostradas: opciones_B2L1_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB2(trial_data, opciones_B2L1); checkTime();}};
bloque_B2.push(stim_B2L1)

    var stim_B2L2 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B2L2,
      options: opciones_B2L2_final, horizontal: false}],
      data: {pregunta: codigo_B2L2, opciones_mostradas: opciones_B2L2_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB2(trial_data, opciones_B2L2); checkTime();}};
bloque_B2.push(stim_B2L2)

    var stim_B2L3 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B2L3,
      options: opciones_B2L3_final, horizontal: false}],
      data: {pregunta: codigo_B2L3, opciones_mostradas: opciones_B2L3_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB2(trial_data, opciones_B2L3); checkTime();}};
bloque_B2.push(stim_B2L3)

    var stim_B2L4 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B2L4,
      options: opciones_B2L4_final, horizontal: false}],
      data: {pregunta: codigo_B2L4, opciones_mostradas: opciones_B2L4_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB2(trial_data, opciones_B2L4); checkTime();}};
bloque_B2.push(stim_B2L4)

    var stim_B2L5 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B2L5,
      options: opciones_B2L5_final, horizontal: false}],
      data: {pregunta: codigo_B2L5, opciones_mostradas: opciones_B2L5_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB2(trial_data, opciones_B2L5); checkTime();}};
bloque_B2.push(stim_B2L5)

    var stim_B2F1 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B2F1,
      options: opciones_B2F1_final, horizontal: false}],
      data: {pregunta: codigo_B2F1, opciones_mostradas: opciones_B2F1_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB2(trial_data, opciones_B2F1); checkTime();}};
bloque_B2.push(stim_B2F1)

    var stim_B2F2 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B2F2,
      options: opciones_B2F2_final, horizontal: false}],
      data: {pregunta: codigo_B2F2, opciones_mostradas: opciones_B2F2_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB2(trial_data, opciones_B2F2); checkTime();}};
bloque_B2.push(stim_B2F2)

    var stim_B2F3 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B2F3,
      options: opciones_B2F3_final, horizontal: false}],
      data: {pregunta: codigo_B2F3, opciones_mostradas: opciones_B2F3_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB2(trial_data, opciones_B2F3); checkTime();}};
bloque_B2.push(stim_B2F3)

    var stim_B2F4 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B2F4,
      options: opciones_B2F4_final, horizontal: false}],
      data: {pregunta: codigo_B2F4, opciones_mostradas: opciones_B2F4_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB2(trial_data, opciones_B2F4); checkTime();}};
bloque_B2.push(stim_B2F4)

    var stim_B2F5 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_B2F5,
      options: opciones_B2F5_final, horizontal: false}],
      data: {pregunta: codigo_B2F5, opciones_mostradas: opciones_B2F5_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoB2(trial_data, opciones_B2F5); checkTime();}};
bloque_B2.push(stim_B2F5)

// Items C1
    var stim_C1G1 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_C1G1,
      options: opciones_C1G1_final, horizontal: false}],
      data: {pregunta: codigo_C1G1, opciones_mostradas: opciones_C1G1_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoC1(trial_data, opciones_C1G1); checkTime();}};
bloque_C1.push(stim_C1G1)


    var stim_C1G2 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_C1G2,
      options: opciones_C1G2_final, horizontal: false}],
      data: {pregunta: codigo_C1G2, opciones_mostradas: opciones_C1G2_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoC1(trial_data, opciones_C1G2); checkTime();}};
bloque_C1.push(stim_C1G2)

    var stim_C1G3 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_C1G3,
      options: opciones_C1G3_final, horizontal: false}],
      data: {pregunta: codigo_C1G3, opciones_mostradas: opciones_C1G3_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoC1(trial_data, opciones_C1G3); checkTime();}};
bloque_C1.push(stim_C1G3)

    var stim_C1G4 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_C1G4,
      options: opciones_C1G4_final, horizontal: false}],
      data: {pregunta: codigo_C1G4, opciones_mostradas: opciones_C1G4_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoC1(trial_data, opciones_C1G4); checkTime();}};
bloque_C1.push(stim_C1G4)

    var stim_C1G5 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_C1G5,
      options: opciones_C1G5_final, horizontal: false}],
      data: {pregunta: codigo_C1G5, opciones_mostradas: opciones_C1G5_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoC1(trial_data, opciones_C1G5); checkTime();}};
bloque_C1.push(stim_C1G5)

    var stim_C1L1 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_C1L1,
      options: opciones_C1L1_final, horizontal: false}],
      data: {pregunta: codigo_C1L1, opciones_mostradas: opciones_C1L1_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoC1(trial_data, opciones_C1L1); checkTime();}};
bloque_C1.push(stim_C1L1)

    var stim_C1L2 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_C1L2,
      options: opciones_C1L2_final, horizontal: false}],
      data: {pregunta: codigo_C1L2, opciones_mostradas: opciones_C1L2_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoC1(trial_data, opciones_C1L2); checkTime();}};
bloque_C1.push(stim_C1L2)

    var stim_C1L3 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_C1L3,
      options: opciones_C1L3_final, horizontal: false}],
      data: {pregunta: codigo_C1L3, opciones_mostradas: opciones_C1L3_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoC1(trial_data, opciones_C1L3); checkTime();}};
bloque_C1.push(stim_C1L3)

    var stim_C1L4 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_C1L4,
      options: opciones_C1L4_final, horizontal: false}],
      data: {pregunta: codigo_C1L4, opciones_mostradas: opciones_C1L4_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoC1(trial_data, opciones_C1L4); checkTime();}};
bloque_C1.push(stim_C1L4)

    var stim_C1L5 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_C1L5,
      options: opciones_C1L5_final, horizontal: false}],
      data: {pregunta: codigo_C1L5, opciones_mostradas: opciones_C1L5_final.toString()},
      button_label: boton,
       on_finish: function (trial_data){contadorCorrectoC1(trial_data, opciones_C1L5); checkTime();}};
bloque_C1.push(stim_C1L5)

    var stim_C1F1 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_C1F1,
      options: opciones_C1F1_final, horizontal: false}],
      data: {pregunta: codigo_C1F1, opciones_mostradas: opciones_C1F1_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoC1(trial_data, opciones_C1F1); checkTime();}};
bloque_C1.push(stim_C1F1)

    var stim_C1F2 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_C1F2,
      options: opciones_C1F2_final, horizontal: false}],
      data: {pregunta: codigo_C1F2, opciones_mostradas: opciones_C1F2_final.toString()},
      button_label: boton,
       on_finish: function (trial_data){contadorCorrectoC1(trial_data, opciones_C1F2); checkTime();}};
bloque_C1.push(stim_C1F2)

    var stim_C1F3 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_C1F3,
      options: opciones_C1F3_final, horizontal: false}],
      data: {pregunta: codigo_C1F3, opciones_mostradas: opciones_C1F3_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoC1(trial_data, opciones_C1F3); checkTime();}};
bloque_C1.push(stim_C1F3)

    var stim_C1F4 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_C1F4,
      options: opciones_C1F4_final, horizontal: false}],
      data: {pregunta: codigo_C1F4, opciones_mostradas: opciones_C1F4_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoC1(trial_data, opciones_C1F4); checkTime();}};
bloque_C1.push(stim_C1F4)

    var stim_C1F5 = {type: 'survey-multi-choice', questions: [{prompt: preguntas_C1F5,
      options: opciones_C1F5_final, horizontal: false}],
      data: {pregunta: codigo_C1F5, opciones_mostradas: opciones_C1F5_final.toString()},
      button_label: boton,
      on_finish: function (trial_data){contadorCorrectoC1(trial_data, opciones_C1F5); checkTime();}};
bloque_C1.push(stim_C1F5)



// Randomizar orden de preguntas dentro de bloque
var bloque_A1_RND = jsPsych.randomization.repeat(bloque_A1, 1);
var bloque_A2_RND = jsPsych.randomization.repeat(bloque_A2, 1);
var bloque_B1_RND = jsPsych.randomization.repeat(bloque_B1, 1);
var bloque_B2_RND = jsPsych.randomization.repeat(bloque_B2, 1);
var bloque_C1_RND = jsPsych.randomization.repeat(bloque_C1, 1);

//Trial final para marcar nivel una vez
var preSave = {
  type: 'html-keyboard-response',
  stimulus: '',
  trial_duration: 10,
  on_finish: function(trial_data){
    if (contador_A1 < 4) { nivel = "inferior a A1"
  } else if (contador_A2 < 4) {nivel = "A1"
  } else if (contador_B1 < 4) {nivel = "A2"
  } else if (contador_B2 < 4) {nivel = "B1"
  } else if (contador_C1 < 4) {nivel = "B2"
  } else                      {nivel = "C1"
  };
  jsPsych.data.addDataToLastTrial({
         niveles: nivel
       });
  }
}


// Call function savedata para guardar data completa

var saveFinal = {
    type: 'call-function',
    func: function(){
      if (contador_A1 < 6) { nivel = "inferior a A1"
  } else if (contador_A2 < 7) {nivel = "A1"
  } else if (contador_B1 < 8) {nivel = "A2"
  } else if (contador_B2 < 10) {nivel = "B1"
  } else if (contador_C1 < 10) {nivel = "B2"
  } else                      {nivel = "C1"
  };
  jsPsych.data.addProperties({
         nivelObtenido: nivel
       });
  save_data();

    }
}

// Cierre

var cierre = {
    type: 'html-keyboard-response',
    stimulus: function(){
      var nivel = [];
    if (contador_A1 < 6) { nivel = "inferior a A1"
  } else if (contador_A2 < 7) {nivel = "A1"
  } else if (contador_B1 < 8) {nivel = "A2"
  } else if (contador_B2 < 10) {nivel = "B1"
  } else if (contador_C1 < 10) {nivel = "B2"
  } else                      {nivel = "C1"
  };
  return "<div style='padding-top:20px;'><p>Se ha terminado el examen. Su nivel es "+ nivel + "</p><p> Presione cualquier tecla para terminar.</p></div>";

},

};


// Crear timeline

timeline.push(bienvenida)
timeline.push(pedirNombre)
timeline.push(instrucciones)


for (i=0; i<=7; i++){
  timeline = timeline.concat(bloque_A1_RND[i]);
}
/*
 for (i=0; i<=9; i++){
 timeline = timeline.concat(bloque_A2_RND[i]);
 }

 for (i=0; i<=11; i++){
   timeline = timeline.concat(bloque_B1_RND[i]);
 }

 for (i=0; i<=14; i++){
   timeline = timeline.concat(bloque_B2_RND[i]);
 }

 for (i=0; i<=14; i++){
   timeline = timeline.concat(bloque_C1_RND[i]);
 }
*/

timeline.push(preSave)
timeline.push(saveFinal)
timeline.push(cierre)


    /* Empezar el examen*/
jsPsych.init({
  show_progress_bar: true,
  timeline: timeline,
  on_finish: function(){
  finalAlert();
 //jsPsych.data.displayData();
  }

});

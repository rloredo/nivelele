var bienvenida = {
  type: 'html-keyboard-response',
  stimulus: "<div class='g-recaptcha' data-sitekey='6LfI4lEUAAAAAG4od5BtmzBmrH5unjPEy0R6gDmP'></div><p style='padding-top:10%'>La credencial ingresada es correcta.<br></p><p> Presione cualquier tecla para comenzar.</p>"
};

function enableBtn(){
    captcha = true;
    document.getElementById("continuar").disabled = false;
    console.log('Se ha completado el captcha')
   }

var trial = {
    type: 'html-button-response-captcha',
    stimulus: "<p> Complete el captcha para continuar</p><div class='g-recaptcha' data-sitekey='6LfI4lEUAAAAAG4od5BtmzBmrH5unjPEy0R6gDmP' data-callback='enableBtn'></div>",
    choices: ['Continuar'],
};





var timeline = [];
timeline.push(bienvenida)
timeline.push(trial)

jsPsych.init({
show_progress_bar: true,
timeline: timeline,
on_finish: function(){
//jsPsych.data.displayData();
}
});

var memes =
{
	0: {
		text: 'LOL',
		img: 'img/lol.jpg#IMAGE'
	},
	1: {
		text: 'FUCK YEAH',
		img: 'img/fuckyeah.jpg#IMAGE'
	},
	2: {
		text: 'For Ever Alone',
		img: 'img/fea.jpg#IMAGE'
	},
	3: {
		text: 'problem?',
		img: 'img/problem.jpg#IMAGE'
	},
	4: {
		text: 'OKAY',
		img: 'img/okay.jpg#IMAGE'
	},
	5: {
		text: 'Me gusta',
		img: 'img/like.jpg#IMAGE'
	}
} // N Cantidad de pares.

var memesLength = 0;

//Cantidad de pares a mostrar
var blocks = 6;

//Guarda items escogidos al azar de N totales
var validMemes = new Array;

//Original para guardar elementos
var gameLogicI = [['-','-','-','-'],['-','-','-','-'],['-','-','','']]; //Agregar según: T = N / 2 | N= # pares.  

//Copiar de original
var gameLogic = gameLogicI;

//Guarda locacion lineal de elementos
var whereAre = new Array;


//Guarda coordenadas (temporal en ejecucion)
var memesCoords = new Array;

//Tiempo limite
var tPlay = 10;
var tTotal = 180;

//Guarda informacion de juego
var statusGame = {
	selected: 0,
	selectedOne: null,
	selectedTwo: null,
}

for(meme in memes)
{
	memesLength += 1;
}

$(function (){
	mixMemes();
})

//Mezclar memes y seleccionar N (blocks) segun se establezca
function mixMemes()
{
	var rCoords;
	var bckp_memes = $.extend(true,{},memes);

	//Seleccionar aleatoriamente solo BLOCKS memes
	for(var i=0;i<blocks;i++)
	{
		validMemes.push(selectMeme());
	}

	//Recorrer memes
	$.each(bckp_memes,function(it,val)
	{
		var memin = 0;

		//Si no esta el numero de iterador en los memes seleccionados segun BLOCKS (cantidad) continua
		if( $.inArray(parseInt(it),validMemes) < 0)
			return true;
		var valC = $.extend(true,{},val);
		//Para obtener relacion1 y relacion2 del meme. Pasa dos veces
		while(memin<2)
		{
			memin++;
			//Obtener coordenadas aleatorias no repetidas
			rCoords = setCoords();

			//Si NO se ha usado el texto
			if(val.text)
			{	
				gameLogic[rCoords.y][rCoords.x] = {rel1:val.text,rel2:valC.img};
				val.text = false;
			}
			else if(val.img) //Si ya se uso el texto pero la imagen no
			{
				gameLogic[rCoords.y][rCoords.x] = {rel1:val.img,rel2:valC.text};
				val.img = false;
			}
		}
	});

	//Mostrar elementos
	putView();

}

/* --------------- FUNCIONES PARA MEZCLAR ITEMS ---------------    */
function selectMeme()
{
	var r = Math.floor( Math.random() * memesLength );
	var it = 0;
	//Si el numero aleatorio ya esta seleccionado
	while($.inArray(r,validMemes) >= 0)
	{
		//Generar un nuevo aleatorio
		r = Math.floor( Math.random() * memesLength );
	}
	return r;
}

function setCoords()
{

	//Genera coordenadas
	var coords = getCoords();
	var sCoords = String(coords.y+','+coords.x);


	//Si ya existen en el arreglo de coordenadas se repite hasta encontrar unas que no estén.
	while($.inArray(sCoords,memesCoords) >= 0 )
	{
		//Generar nuevas coordenadas (a probar)
		coords = getCoords();
		sCoords = String(coords.y+','+coords.x);
	}


	//Coordenadas inexistentes se agregan
	memesCoords.push(String(coords.y+','+coords.x));
	return coords;
}

function getCoords()
{	
	//Generar coordenadas aleatorias
	var x = Math.floor( Math.random() * 4 );
	var y = Math.floor( Math.random() * 3 );

	return {x:x,y:y};
}

/* --------------- FUNCIONES PARA MEZCLAR ITEMS ---------------    */

//Reiniciar juego
function resetElements()
{
	validMemes = new Array;
	gameLogic = gameLogicI;
	memesCoords = new Array;	

	mixMemes();
}


// Poner vista
function putView()
{
	var i,j,lim,blcks,stageH;
	var stage = $('#gameStage');
	i = j = stageH = 0;

	blcks = blocks * 2;

	//Pure logic :)
	lim = Math.floor(blcks/4)%2?Math.floor(blcks / 4 ) + 1 : Math.floor(blcks / 4 );


	for(i;i< lim -1 ; i++)
	{
		for(j=0;j<4;j++)
		{
			var val = gameLogic[i][j].rel1;
			var item;

			whereAre.push(gameLogic[i][j]);

			if(val.indexOf('#IMAGE')>0)
				item = $('<article class="mitem mhdn"><img src="'+val+'" alt="Clic para voltear"/></article>');
			else
				item = $('<article class="mitem mhdn"><span>'+val+'</span></article>');
			stage.append(item);
		}

		stageH += 125;
	}
	stage.css('height',stageH)



	var times = $('<span>Tiempo restante: </span> <time>'+formatTime(tTotal)+'</time><span>Tiempo por jugada</span>  <time>'+formatTime(tPlay)+'</time> ');

	$('#gameTimers').append(times);

	setEvents();
}


function setEvents()
{
	$('#gameStage').fadeIn();


	$('.mitem').on('click',function()
	{	


		console.log(whereAre)

		if(statusGame.selected >= 2)
			return;

		var me = $(this).index() - 1;


		if(statusGame.selected===0)
		{
			statusGame.selectedOne = whereAre[me];
			statusGame.selected++;
		}
		else if(statusGame.selected === 1)
		{

			statusGame.selectedTwo = whereAre[me];

			console.log(statusGame.selectedOne.rel1 +'==='+ statusGame.selectedTwo.rel2)

			if(statusGame.selectedOne.rel1 === statusGame.selectedTwo.rel2)
			{
				console.log('IDENTICOS')
			}	
			else
				console.log('FALLASTE')

			statusGame.selected = 0;
		}


	})
}


//Extras

function formatTime(time)
{
	var s = Math.floor(time%60);
	var min = Math.floor(time/60);

	var timeText;

	if(s<10)
		s = '0'+s;

	if(min<10)
		min = '0'+min;

	timeText = min+':'+s;

	return timeText;
}
var memes =
{
	0: {
		text: 'LOL',
		img: 'img/lol.jpg'
	},
	1: {
		text: 'FUCK YEAH',
		img: 'img/fuckyeah.jpg'
	},
	2: {
		text: 'For Ever Alone',
		img: 'img/fea.jpg'
	},
	3: {
		text: 'problem?',
		img: 'img/problem.jpg'
	},
	4: {
		text: 'OKAY',
		img: 'img/okay.jpg'
	},
	5: {
		text: 'Me gusta',
		img: 'img/like.jpg'
	},
	6: {
		text: 'Hola',
		img: 'Cara de Bola'
	},
	7: {
		text: 'asdf',
		img: 'Casdf'
	}
} // N Cantidad de pares.

var memesLength = 0;
var blocks = 6;
var validMemes = new Array;
var gameLogicI = [['-','-','-','-'],['-','-','-','-'],['-','-','','']]; //Agregar según: T = N / 2 | N= # pares.  
var gameLogic = gameLogicI;
var memesLogic = new Array;
var memesLogic2 = new Array;
var memesCoords = new Array;

for(meme in memes)
{
	memesLength += 1;
}

$(function (){
	mixMemes();
})

													//TEMPORAL || Repite
													var ite = 0;

function mixMemes()
{
	var rCoords;
	var bckp_memes = $.extend(true,{},memes);

	for(var i=0;i<blocks;i++)
	{
		validMemes.push(selectMeme());
	}

	$.each(bckp_memes,function(it,val)
	{
		var memin = 0;

		if( $.inArray(parseInt(it),validMemes) < 0)
			return true;

		while(memin<2)
		{
			memin++;
			rCoords = setCoords();

			if(val.text)
			{	
				gameLogic[rCoords.y][rCoords.x] = val.text;
				val.text = false;
			}
			else if(val.img)
			{
				gameLogic[rCoords.y][rCoords.x] = val.img;
				val.img = false;
			}
		}
	});

		
																//TEMPORAL || Repite
																resetElements();

}


function selectMeme()
{
	var r = Math.floor( Math.random() * memesLength );
	var it = 0;

	while($.inArray(r,validMemes) >= 0)
	{
		it++;
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

function resetElements()
{
	ite++;

	validMemes = new Array;
	gameLogic = gameLogicI;
	memesLogic = new Array;
	memesLogic2 = new Array;
	memesCoords = new Array;	

	if(ite>4)
		return false;
	mixMemes();
}
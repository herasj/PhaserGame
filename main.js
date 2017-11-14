//Dimensiones del juego (Ancho,Alto)
 var juego = new Phaser.Game(768, 1000, Phaser.AUTO, '', {preload: preload, create: create, update: update});
//Error corregido
                             
// Preload, todo lo que se encuentre dentro de esta funcion se ejecutará mientras se cargan los componentes

function preload(){
  //juego.load.image("Id","Ruta");
juego.load.image('Block','Sprites/Blocks/Block1.gif');
juego.load.image('BlockD', 'Sprites/Blocks/Block_D.gif');
juego.load.image('Bg','Sprites/Background/Background.jpg');
// 'Id','Ruta',Ancho,Alto,Numero de imagenes (-1 la busca automaticamente),espacio entre imagenes, espacio del margen
juego.load.spritesheet('Enemies','Sprites/Enemy/Enemies.png', 32,32,-1,0,0);  
juego.load.spritesheet('Pj','Sprites/Pj/Mario.png',16,16,3,0,0)

}

var Jugador;
var Bloque;
var BloqueD;
var Spiny;
var Score;
var MostrarScore;
var Salto;
var PosBlock=0; //Defininir la posicion de los bloques
var piso;
var Pmovil;
//Controlar los enemigos en un array
var VSpiny = [];

//Create, todo lo que se encuentre aqui se ejecutara cuando se haya cargado todo
function create(){
  // Cargar las fisicas para un juego arcade
 juego.add.sprite(0, 0, 'Block');
 //juego.add.sprite(100, 100, 'BlockD');
juego.physics.startSystem(Phaser.Physics.ARCADE);
juego.world.setBounds(0, 0, 768, 1000); //Establecer limites del juego
Bloque = juego.add.group();
BloqueD = juego.add.group();
Bloque.enableBody = true;
BloqueD.enableBody= true;
/*var Pmovil= BloqueD.create(64,64,'BlockD');
Pmovil.body.immovable=false;*/
//var piso = Bloque.create(32,32 , 'Block');

for (var i = 0 ; i <24; i++) {
  //Llenar piso de bloques
  PosBlock=32*i;
  piso = Bloque.create(PosBlock,968,'Block');
  piso.body.immovable = true;//No se puede mover
  //Modificar el sprite
  //juego.add.sprite (PosBlock, 0, 'Block');
}
 Jugador = juego.add.sprite(32, 836, 'Pj');
 Jugador.scale.setTo(2,2);

 //No se puede mover

//Bloque.body.immovable = true;



juego.physics.arcade.enable(Jugador);//Activar fisicas al Jugador

Jugador.body.bounce.y = 0; //El Jugador no puede rebotar
Jugador.body.gravity.y = 400;//Gravedad del Jugador
Jugador.body.collideWorldBounds = true;//Colision con los bordes

//Añadir animaciones

//Jugador.animations.add('left', [0,1,2,3], 10, true); Falta animacion hacia la izquierda D:
Jugador.animations.add('right', [0,1], 10, true);
Jugador.animations.add('left', [0,1], 10, true);
Jugador.animations.add('jump', [2], 10, true);
Tecla = juego.input.keyboard.createCursorKeys();
var LocacionPtos = juego.add.sprite(0, 0);
LocacionPtos.fixedToCamera = true;

}


//Update, un loop equivalente a un step en juegomaker
function update(){

//  Reseteamos la velocidad del Jugador en x, esto nos permitirá evitar que se acelere
  Jugador.body.velocity.x = 0;                
  // Colision
  juego.physics.arcade.collide(Jugador,Bloque);

if (Tecla.right.isDown)// Si presionamos RIGHT
{
 //  Mover a la derecha
Jugador.body.velocity.x = 150;
Jugador.animations.play('right');
}
else{
	if(Tecla.left.isDown){
		Jugador.body.velocity.x=-150;
		Jugador.animations.play('left');


	}
	else{
		Jugador.animations.stop();

	}
  
}
	if(Tecla.up.isDown && Jugador.body.touching.down){

		Jugador.body.velocity.y= -300;
		Jugador.animations.play('jump');

	}
}
/*
function render() {
juego.debug.cameraInfo(juego.camera, 32, 32);
juego.debug.spriteCoords(Jugador, 32, 500);
}	
*/
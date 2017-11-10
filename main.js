//Dimensiones del juego (Ancho,Alto)
 var juego = new Phaser.Game(768, 1000, Phaser.AUTO, '', ({preload: preload, create: create, update: update, render: render});
//Error corregido
                             
// Preload, todo lo que se encuentre dentro de esta funcion se ejecutará mientras se cargan los componentes

function preload(){
  //juego.load.image("Id","Ruta");
juego.load.image('Block','Sprites/Blocks/Block1.gif');
juego.load.image('BlockD', 'Sprites/Blocks/Block_D.gif');
juego.load.image('Bg','Sprites/Background/Background.jpg');
// 'Id','Ruta',Ancho,Alto,Numero de imagenes (-1 la busca automaticamente),espacio entre imagenes, espacio del margen
juego.load.spritesheet('Spiny','Sprites/Enemy/Spiny.png', 16, 16,2,0,0);  
juego.load.spritesheet('Pj','Sprites/Pj/Mario.png',16,16,7,4,1)

}

var Jugador;
var Bloque;
var BlockD;
var Spiny;
var Score;
var MostrarScore;
var Salto;
var PosBlock=0; //Defininir la posicion de los bloques

//Controlar los enemigos en un array
var VSpiny = [];

//Create, todo lo que se encuentre aqui se ejecutara cuando se haya cargado todo
function create(){
  // Cargar las fisicas para un juego arcade
juego.physics.startSystem(Phaser.Physics.ARCADE);
juego.world.setBounds(0, 0, 768, 1000); //Establecer limites del juego
Bloque = juego.add.group();
Bloque.enableBody = true;
for (var i = 0 ; i >24; i++) {
  //Llenar piso de bloques
  PosBlock=32*i;
  var piso = Bloque.create(PosBlock,32 , 'Block');
  //juego.add.sprite (PosBlock, 0, 'Block');
}
piso.body.immovable = true; //No se puede mover
Bloque.body.immovable = true;

Jugador = juego.add.sprite(32,40, 'Pj');//Añadir jugador

juego.physics.arcade.enable(Jugador);//Activar fisicas al jugador

Jugador.body.bounce.y = 0; //El jugador no puede rebotar
Jugador.body.gravity.y = 500;//Gravedad del jugador
Jugador.body.collideWorldBounds = true;//Colision con los bordes

//Añadir animaciones

//Jugador.animations.add('left', [0,1,2,3], 10, true); Falta animacion hacia la izquierda D:
Jugador.animations.add('right', [0, 1,2,3], 10, true);
Jugador.animations.add('jump', [5], 10, true);
Tecla = juego.input.keyboard.createCursorKeys();
}


//Update, un loop equivalente a un step en juegomaker
function update(){

//  Reseteamos la velocidad del jugador en x, esto nos permitirá evitar que se acelere
Jugador.body.velocity.x = 0;                
  // Hacemos colisionar al jugador con las plataformas
juego.physics.arcade.collide(Jugador, plataformas);

if (Tecla.right.isDown)// Si presionamos RIGHT
{
 //  Mover a la derecha
jugador.body.velocity.x = 150;
jugador.animations.play('right');
}
else{
  Jugador.animation.stop();
}

}

function render() {
juego.debug.cameraInfo(juego.camera, 32, 32);
juego.debug.spriteCoords(jugador, 32, 500);
}	

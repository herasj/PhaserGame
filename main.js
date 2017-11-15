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
juego.load.spritesheet('Pj','Sprites/Pj/Mario.png',16,16,3,0,0);
juego.load.spritesheet('Coin','Sprites/Npc/Coin.gif',28,32,4,0,0);

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
var MonedaV = [];
//Controlar los enemigos en un array
var VSpiny = [];
var plataforma;
var PosPlat;
var Txt;
var Score=0;
CMonedas=0;

//Create, todo lo que se encuentre aqui se ejecutara cuando se haya cargado todo
function create(){
  // Cargar las fisicas para un juego arcade
// Añadir sprite juego.add.sprite(0, 0, 'Block');
 //juego.add.sprite(100, 100, 'BlockD');
juego.physics.startSystem(Phaser.Physics.ARCADE);
juego.world.setBounds(0, 0, 768, 1000); //Establecer limites del juego
Bloque = juego.add.group();
BloqueD = juego.add.group();
Moneda = juego.add.group();

Bloque.enableBody = true;
BloqueD.enableBody= true;
/*var Pmovil= BloqueD.create(64,64,'BlockD');
Pmovil.body.immovable=false;*/
//var piso = Bloque.create(32,32 , 'Block');

//Crear Plataforma
for (var i = 0; i <11; i++) {
  PosPlat=((juego.world.height-82)-(80*i))
  for (var j = 0; j <6 ; j++) {

      plataforma = Bloque.create(16*j,PosPlat,'Block');
      plataforma.scale.setTo(0.5,0.5);
      plataforma.body.immovable=true;
}
}
for (var i = 0 ; i <48; i++) {
  //Llenar piso de bloques
  PosBlock=16*i;
  MonedaV[i] = Moneda.create(PosBlock+32,960,'Coin')
  piso = Bloque.create(PosBlock,984,'Block');
  piso.body.immovable = true;//No se puede mover
  piso.scale.setTo(0.7,0.7)
  //Modificar el sprite
  //juego.add.sprite (PosBlock, 0, 'Block');
}
 Jugador = juego.add.sprite(32, 885, 'Pj');
 Jugador.scale.setTo(1.42,1.42); //No Cambia

 //No se puede mover

//Bloque.body.immovable = true;



juego.physics.arcade.enable(Jugador);//Activar fisicas al Jugador

Jugador.body.bounce.y = 0; //El Jugador no puede rebotar
Jugador.body.gravity.y = 400;//Gravedad del Jugador
Jugador.body.collideWorldBounds = true;//Colision con los bordes

//Añadir animaciones
for (var i = 0; i < MonedaV.length; i++) {
  MonedaV[i].animations.add('casual',[0,1,2,3],10,true);
  MonedaV[i].animations.play('casual');
  MonedaV[i].scale.setTo(0.5,0.5);
}

//Jugador.animations.add('left', [0,1,2,3], 10, true); Falta animacion hacia la izquierda D:
Jugador.animations.add('right', [0,1], 10, true);
Jugador.animations.add('left', [0,1], 10, true);
Jugador.animations.add('jump', [2], 10, true);
Tecla = juego.input.keyboard.createCursorKeys();
var LocacionPtos = juego.add.sprite(0, 0);
LocacionPtos.fixedToCamera = true;
juego.add.text(juego.world.width-100, 16, 'Score', {fontSize: '27px', fill: 'white'});
 Txt = juego.add.text(juego.world.width-80, 40, '0', {fontSize: '27px', fill: 'white'});
 LocacionPtos.addChild(Txt);
 LocacionPtos.cameraOffset.x = 10;
 LocacionPtos.cameraOffset.y = 10;
}


//Update, un loop equivalente a un step en juegomaker
function update(){

//  Reseteamos la velocidad del Jugador en x, esto nos permitirá evitar que se acelere
  Jugador.body.velocity.x = 0;
  // Colision
  juego.physics.arcade.collide(Jugador,Bloque);
//Colision con Moneda
for (var i = 0; i <MonedaV.length; i++) {
  if (Compara_Colision(Jugador,MonedaV[i])==true) {
    MonedaV[i].kill();
    Score=Score++;
    Txt.text=Score;
  }
}

if (Tecla.right.isDown)// Si presionamos RIGHT
{
 //  Mover a la derecha
Jugador.body.velocity.x = 80;
Jugador.animations.play('right');
}
else{
	if(Tecla.left.isDown){
		Jugador.body.velocity.x=-80;
		Jugador.animations.play('left');


	}
	else{
		Jugador.animations.stop();

	}

}
	if(Tecla.up.isDown && Jugador.body.touching.down){

		Jugador.body.velocity.y= -230;
		Jugador.animations.play('jump');

	}
}

function Compara_Colision (Jugador,Objeto){
  var Colisiona;
  if ((Jugador.position.y + Jugador.height) > Objeto.position.y) {
      Colisiona = true;
  }
  else{
      Colisiona=false;
  }
  return Colisiona;
}

/*
function render() {
juego.debug.cameraInfo(juego.camera, 32, 32);
juego.debug.spriteCoords(Jugador, 32, 500);
}
*/

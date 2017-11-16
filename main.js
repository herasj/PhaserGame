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
juego.load.spritesheet('Pj','Sprites/Pj/Mario.png',17,16,10,0,0);
juego.load.spritesheet('Coin','Sprites/Npc/Coin.gif',28,32,4,1,0);
juego.load.spritesheet('Star_s','Sprites/Npc/Star.png',14,16,4,0,0);
juego.load.spritesheet('Bowser','Sprites/Enemy/Bowser.png',32,32,4,0,0);
juego.load.spritesheet('FB','Sprites/Enemy/Ball.png',14,16,2,0,0);
juego.load.image('S_Bloqueo','Sprites/Blocks/Bloqueo.png');
juego.load.audio('s_coin','Sfx/Coin.wav');
juego.load.audio('s_jump','Sfx/Jump.wav');
juego.load.audio('s_cho','Sfx/Bump.wav');
juego.load.audio('sbg','Sfx/Underworld.mp3');
juego.load.audio('s_star','Sfx/1up.wav');
juego.load.audio('s_boom','Sfx/Boom.wav');}


//MonedaV
var Ball;
var CBall;
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
var MonedaO
var MonedaV = [];
var Jefe;
var VSpiny = [];
var plataforma;
var PosPlat;
var Txt;
var sndCoin;
var sndJump;
var sndchoque;
var sndBg;
var snd1up;
var Score=0;
var CMonedas=0;
var CJefe;
var Estrella;
var Star;
var Bloqueo;
var CBloqueo;
var Boom;
var NumStar=0;
//Create, todo lo que se encuentre aqui se ejecutara cuando se haya cargado todo
function create(){
  // Cargar las fisicas para un juego arcade
// Añadir sprite juego.add.sprite(0, 0, 'Block');
 //juego.add.sprite(100, 100, 'BlockD');
juego.physics.startSystem(Phaser.Physics.ARCADE);
juego.world.setBounds(0, 0, 768, 1000); //Establecer limites del juego
Bloque = juego.add.group();
BloqueD = juego.add.group();
Estrella = juego.add.group();
Moneda = juego.add.group();
Jefe = juego.add.group();
Ball = juego.add.group();
Bloqueo= juego.add.group();
sndCoin= juego.add.audio('s_coin');
sndJump = juego.add.audio('s_jump');
sndchoque= juego.add.audio('s_cho');
sndBg=juego.add.audio('sbg');
snd1up=juego.add.audio('s_star');
Boom=juego.add.audio('s_boom');
Bloque.enableBody = true;
BloqueD.enableBody= true;
Moneda.enableBody=true;
Estrella.enableBody=true;
Bloqueo.enableBody=true;
Jefe.enableBody=true;
/*var Pmovil= BloqueD.create(64,64,'BlockD');
Pmovil.body.immovable=false;*/
//var piso = Bloque.create(32,32 , 'Block');

//Crear Plataforma

for (var i = 0; i <7 ; i++) {
    PosPlat=((juego.world.height-150)-(120*i))
  for (var j = 0; j< 16 ; j++) {

    plataforma = Bloque.create(265+(16*j),PosPlat,'Block');
    plataforma.scale.setTo(0.5,0.5);

    plataforma.body.immovable=true;

    MonedaV = Moneda.create(plataforma.x,PosPlat-16,'Coin'); // Crea moneda
    MonedaV.animations.add('casual',[0,1,2,3],10,true);
    MonedaV.animations.play('casual');
    MonedaV.scale.setTo(0.5,0.5);
  }
}
for (var i = 0; i <7; i++) {
  PosPlat=((juego.world.height-120)-(120*i));
  for (var j = 0; j<11 ; j++) {

      plataforma = Bloque.create(16*j,PosPlat,'Block');
      plataforma.scale.setTo(0.5,0.5);
      plataforma.body.immovable=true;

      MonedaV = Moneda.create(plataforma.x,PosPlat-16,'Coin'); // Crea moneda
      MonedaV.animations.add('casual',[0,1,2,3],10,true);
      MonedaV.animations.play('casual');
      MonedaV.scale.setTo(0.5,0.5);
}
}

for (var i = 0; i <7; i++) {
  PosPlat=((juego.world.height-120)-(120*i));
  for (var j = 0; j<11 ; j++) {

      plataforma = Bloque.create(600+(16*j),PosPlat,'Block');
      plataforma.scale.setTo(0.5,0.5);
      plataforma.body.immovable=true;

      MonedaV = Moneda.create(plataforma.x,PosPlat-16,'Coin'); // Crea moneda
      MonedaV.animations.add('casual',[0,1,2,3],10,true);
      MonedaV.animations.play('casual');
      MonedaV.scale.setTo(0.5,0.5);
}

}
for (var i = 0 ; i <48; i++) {
  //Llenar piso de bloques
  PosBlock=16*i;
  MonedaV = Moneda.create(PosBlock+32,960,'Coin')
  piso = Bloque.create(PosBlock,984,'Block');
  piso.body.immovable = true;//No se puede mover
  piso.scale.setTo(0.7,0.7);
  MonedaV.animations.add('casual',[0,1,2,3],10,true);
  MonedaV.animations.play('casual');
  MonedaV.scale.setTo(0.5,0.5);
  //Modificar el sprite
  //juego.add.sprite (PosBlock, 0, 'Block');
}
 Jugador = juego.add.sprite(0,952, 'Pj');
 Jugador.scale.setTo(1.42,1.42); //Necesita Ajuste *

 //No se puede mover

//Bloque.body.immovable = true;

//Estrellas :D
Star= Estrella.create(384,904,'Star_s');
Star.animations.add('SM',[0,1,2,3],10,true);
Star.animations.play('SM');
Star.scale.setTo(1.25,1.25);

Star= Estrella.create(704,920,'Star_s');
Star.animations.add('SM',[0,1,2,3],10,true);
Star.animations.play('SM');
Star.scale.setTo(1.25,1.25);


Star= Estrella.create(64,680,'Star_s');
Star.animations.add('SM',[0,1,2,3],10,true);
Star.animations.play('SM');
Star.scale.setTo(1.25,1.25);

Star= Estrella.create(384,650,'Star_s');
Star.animations.add('SM',[0,1,2,3],10,true);
Star.animations.play('SM');
Star.scale.setTo(1.25,1.25);

Star= Estrella.create(704,680,'Star_s');
Star.animations.add('SM',[0,1,2,3],10,true);
Star.animations.play('SM');
Star.scale.setTo(1.25,1.25);

Star= Estrella.create(384,410,'Star_s');
Star.animations.add('SM',[0,1,2,3],10,true);
Star.animations.play('SM');
Star.scale.setTo(1.25,1.25);

Star= Estrella.create(64,320,'Star_s');
Star.animations.add('SM',[0,1,2,3],10,true);
Star.animations.play('SM');
Star.scale.setTo(1.25,1.25);

Star= Estrella.create(704,320,'Star_s');
Star.animations.add('SM',[0,1,2,3],10,true);
Star.animations.play('SM');
Star.scale.setTo(1.25,1.25);

Star= Estrella.create(64,80,'Star_s');
Star.animations.add('SM',[0,1,2,3],10,true);
Star.animations.play('SM');
Star.scale.setTo(1.25,1.25);

Star= Estrella.create(384,50,'Star_s');
Star.animations.add('SM',[0,1,2,3],10,true);
Star.animations.play('SM');
Star.scale.setTo(1.25,1.25);

CBloqueo= Bloqueo.create(620,9,'S_Bloqueo');
CBloqueo.body.immovable = true;
juego.physics.arcade.enable(Jugador);//Activar fisicas al Jugador


Jugador.body.bounce.y = 0; //El Jugador no puede rebotar
Jugador.body.gravity.y = 900;//Gravedad del Jugador
Jugador.body.collideWorldBounds = true;//Colision con los bordes

CJefe= Jefe.create(653,103,'Bowser');
CJefe.scale.setTo(1.75,1.75);
CBloqueo.body.immovable = true;
CJefe.animations.add('B',[0,1,2,3],7,true);
CJefe.animations.play('B');


//Añadir animaciones


//Jugador.animations.add('left', [0,1,2,3], 10, true); Falta animacion hacia la izquierda D:
Jugador.animations.add('right', [0,6,7,8], 10, true);
Jugador.animations.add('left', [4,3,2,1], 10, true);
Jugador.animations.add('jumpl', [5], 10, true);
Jugador.animations.add('jumpr', [9], 10, true);
Jugador.animations.add('mario'[0],10,true);
Tecla = juego.input.keyboard.createCursorKeys();
var LocacionPtos = juego.add.sprite(0, 0);
LocacionPtos.fixedToCamera = true;
juego.add.text(juego.world.width-100, 16, 'Score', {fontSize: '27px', fill: 'white'});
 Txt = juego.add.text(juego.world.width-80, 40, '0', {fontSize: '27px', fill: 'white'});
sndBg.play();
}


//Update, un loop equivalente a un step en juegomaker
function update(){

//  Reseteamos la velocidad del Jugador en x, esto nos permitirá evitar que se acelere
  Jugador.body.velocity.x = 0;
  // Colision
  juego.physics.arcade.collide(Jugador,Bloque);
  juego.physics.arcade.collide(Jugador,Bloqueo);
//Colision con Moneda


if (Tecla.right.isDown)// Si presionamos RIGHT
{
 //  Mover a la derecha
Jugador.body.velocity.x = 120;
if ( !Tecla.up.isDown) {
  Jugador.animations.play('right');
}

}
else{
	if(Tecla.left.isDown){
		Jugador.body.velocity.x=-120;
    if ( !Tecla.up.isDown) {
      Jugador.animations.play('left');
    }



	}
	else{
		Jugador.animations.stop();

	}

}
	if(Tecla.up.isDown && Jugador.body.touching.down ){

		Jugador.body.velocity.y= -450;
		Jugador.animations.stop();
    sndJump.play();

	}
  if(NumStar==10){
    Bloqueo.kill()

  }
//  piso = Bloque.create(PosBlock,984,'Block');
CBall= Ball.create(Jefe.x,Jefe.y,'FB');
juego.physics.arcade.enable(CBall);//Activar fisicas al Jugador
CBall.body.velocity.x = -300;
CBall.body.collideWorldBounds = true;//Colision con los bordes
CBall.body.bounce.x = 300; //El Jugador no puede rebotar
CBall.body.gravity.y = 900;//Gravedad del Jugador


  juego.physics.arcade.overlap(Jugador,Moneda, AddPuntos, null, this);
  //juego.physics.arcade.overlap(Jugador,Bloque,TestChoque,null,this);
  juego.physics.arcade.overlap(Jugador,Estrella,KillStar,null,this);
  juego.physics.arcade.overlap(Bloqueo,Moneda,Nocoins,null,this);
  juego.physics.arcade.overlap(Jefe,Moneda,Nocoins,null,this);

}
function Nocoins (Bloqueo,Moneda){
  Moneda.kill();

}
function KillStar (Jugador,Estrella){
  Estrella.kill();
  Score=Score+30;
  Txt.text=Score;
  snd1up.play();
  NumStar=NumStar+1;


}
function Colision_Bloqueo(Jugador,Bloqueo){
  if(NumStar==10){
    Bloqueo.kill()
    Boom.play();
  }



}
function TestChoque (Jugador,Bloque){
if (Jugador.position.y  < Bloque.position.y+32) {
console.log("Colisiona");
sndchoque.play();
}
}

function AddPuntos (Jugador,Moneda){
  Moneda.kill();
  Score=Score+10;
  Txt.text=Score;
  sndCoin.play();


}

/*function Compara_Colision (Jugador,MonedaV){
  var Colisiona;
  if ((Jugador.position.y + Jugador.height) > MonedaV.position.y) {
      Colisiona = true;
  }
  else{
      Colisiona=false;
  }
  return Colisiona;
}


function render() {
juego.debug.cameraInfo(juego.camera, 32, 32);
juego.debug.spriteCoords(Jugador, 32, 500);
}
*/

//Dimensiones del juego (Ancho,Alto)
 var juego = new Phaser.Game(768, 1000, Phaser.AUTO, '', {preload: preload, create: create, update: update});
//Error corregido
var P2Game = {};
juego.state.add('State1', P2Game.State);
// Preload, todo lo que se encuentre dentro de esta funcion se ejecutará mientras se cargan los componentes

function preload(){
juego.load.image('Block','Sprites/Blocks/Block1.gif');
juego.load.image('BlockD', 'Sprites/Blocks/Block_D.gif');
juego.load.image('Fin','Sprites/Background/Fin_Bg.png');
juego.load.image('s_Blaster','Sprites/Enemy/Blaster.png');
juego.load.image('s_Prin','Sprites/Npc/Prin.png');
// 'Id','Ruta',Ancho,Alto,Numero de imagenes (-1 la busca automaticamente),espacio entre imagenes, espacio del margen
juego.load.spritesheet('Enemies','Sprites/Enemy/Enemies.png', 32,32,-1,0,0);
juego.load.spritesheet('Pj','Sprites/Pj/Mario.png',17,16,10,0,0);
juego.load.spritesheet('Coin','Sprites/Npc/Coin.gif',28,32,4,1,0);
juego.load.spritesheet('Star_s','Sprites/Npc/Star.png',14,16,4,0,0);
juego.load.spritesheet('Bowser','Sprites/Enemy/Bowser.png',32,32,4,0,0);
juego.load.spritesheet('FB','Sprites/Enemy/Ball.png',14,16,2,0,0);
juego.load.spritesheet('FB2','Sprites/Enemy/Ball2.png',14,16,2,0,0);
juego.load.image('S_Bloqueo','Sprites/Blocks/Bloqueo.png');
juego.load.image('S_BlockT','Sprites/Blocks/Test.png');
juego.load.audio('s_coin','Sfx/Coin.wav');
juego.load.audio('s_jump','Sfx/Jump.wav');
juego.load.audio('s_cho','Sfx/Bump.wav');
juego.load.audio('sbg','Sfx/Underworld.mp3');
juego.load.audio('s_star','Sfx/1up.wav');
juego.load.audio('s_boom','Sfx/Boom.wav');
juego.load.audio('s_die','Sfx/Die.wav')
	

}
//MonedaV
var Princesa;
var CPrincesa;
var Blaster;
var CBlaster;
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
var BlockT;
var CBlockT;
var VSpiny = [];
var plataforma;
var PosPlat;
var Txt;
var sndCoin;
var sndJump;
var sndDie;
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
var Cont=0;
var NumStar=0;
var Der;
var Anim;
var Cont2;
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
Blaster=juego.add.group();
Moneda = juego.add.group();
Jefe = juego.add.group();
Ball = juego.add.group();
BlockT= juego.add.group();
Princesa=juego.add.group();
Bloqueo= juego.add.group();
sndCoin= juego.add.audio('s_coin');
sndJump = juego.add.audio('s_jump');
sndchoque= juego.add.audio('s_cho');
sndBg=juego.add.audio('sbg');
sndDie=juego.add.audio('s_die');
snd1up=juego.add.audio('s_star');
Boom=juego.add.audio('s_boom');
Bloque.enableBody = true;
Blaster.enableBody=true;
BloqueD.enableBody= true;
Princesa.enableBody=true;
BlockT.enableBody=true;
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
CJefe.animations.add('B',[2,3,0,1],7,true);
CJefe.animations.add('Ataque',[0,1],7,true);
CJefe.animations.play('B');

CPrincesa= Princesa.create(750,124,'s_Prin');
CPrincesa.scale.setTo(1.5,1.5);
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
// juego.add.text(juego.world.width-100, 16, 'Score', {fontSize: '27px', fill: 'white'});
 Txt = juego.add.text(juego.world.width-180, 22, 'Puntos: 0', {fontSize: '27px', fill: 'white',fontFamily: 'Pixeled'});
sndBg.play();
CBlaster= Blaster.create(0,94,'s_Blaster');

CBall= Ball.create(CJefe.x,CJefe.y+12,'FB');
CBall.scale.setTo(1.5,1.5);
juego.physics.arcade.enable(CBall);//Activar fisicas al Jugador
CBall.body.velocity.x =-290;
CBall.body.bounce.x=1;
CBall.body.collideWorldBounds = true;//Colision con los bordes
//CBall.body.bounce.x = 300; //El Jugador no puede rebotar
CBall.body.gravity.y = 900;//Gravedad del Jugador
CBall.animations.add('BallN', [0,1], 20, true);
CBall.animations.play('BallN');

//TEST
CBlockT=BlockT.create(0,952,'S_BlockT');
CBlockT.body.immovable=true;
CBlockT.scale.setTo(0.1,1);
CBlockT=BlockT.create(0,920,'S_BlockT');
CBlockT.body.immovable=true;
CBlockT.scale.setTo(0.1,1);
CBlockT=BlockT.create(765,920,'S_BlockT');
CBlockT.body.immovable=true;
CBlockT.scale.setTo(0.1,1);
CBlockT=BlockT.create(765,952,'S_BlockT');
CBlockT.body.immovable=true;
CBlockT.scale.setTo(0.1,1);
}


//Update, un loop equivalente a un step en juegomaker
function update(){

  juego.physics.arcade.overlap(Jugador,Moneda, AddPuntos, null, this);
  juego.physics.arcade.overlap(Ball,BlockT,KillB,null,this);
  juego.physics.arcade.overlap(Jugador,Estrella,KillStar,null,this);
  juego.physics.arcade.overlap(Bloqueo,Moneda,Nocoins,null,this);
  juego.physics.arcade.overlap(Jefe,Moneda,Nocoins,null,this);
  juego.physics.arcade.overlap(BlockT,Moneda,Nocoins,null,this);
  juego.physics.arcade.overlap(Jugador,Ball,GameOver,null,this);
  juego.physics.arcade.overlap(CBlaster,Moneda,Nocoins,null,this);
  juego.physics.arcade.overlap(Jugador,Princesa,Coli_P,null,this);
  juego.physics.arcade.overlap(Princesa,Moneda,Nocoins,null,this);
Cont=Cont+1;
var randomV= Math.random()*550;
while (randomV<200){
  randomV= Math.random()*550;
}



console.log(Cont);
//  Reseteamos la velocidad del Jugador en x, esto nos permitirá evitar que se acelere
  Jugador.body.velocity.x = 0;
  // Colision
  juego.physics.arcade.collide(Jugador,Bloque);
  juego.physics.arcade.collide(Jugador,Bloqueo);
  juego.physics.arcade.collide(Ball,Bloque);
//  juego.physics.arcade.collide(Ball,BlockT);
//Colision con Moneda


if (Tecla.right.isDown)// Si presionamos RIGHT
{
 //  Mover a la derecha
Jugador.body.velocity.x = 180;
if ( !Tecla.up.isDown) {
  Jugador.animations.play('right');
  Der=true;
}

}
else{
	if(Tecla.left.isDown){
		Jugador.body.velocity.x=-180;
    Der=false;

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
    sndJump.play();
if (Der==true) {
Jugador.animations.play('jumpr');
}
else{
  if (Der==false) {
  Jugador.animations.play('jumpl');
  }

}




	}

  if(NumStar==10){
    Bloqueo.kill()

  }
//Barriles
  if (Cont>=randomV) {
    CBall= Ball.create(CJefe.x-20,CJefe.y+12,'FB');
    CBall.scale.setTo(1.5,1.5);
    juego.physics.arcade.enable(CBall);//Activar fisicas al Jugador
    CBall.body.velocity.x =-290;
    CBall.body.bounce.x=1;
    CBall.body.collideWorldBounds = true;//Colision con los bordes
    //CBall.body.bounce.x = 300; //El Jugador no puede rebotar
    CBall.body.gravity.y = 900;//Gravedad del Jugador
    CBall.animations.add('BallN', [0,1], 20, true);
    CBall.animations.play('BallN');

    CBall= Ball.create(CBlaster.x+40,CBlaster.y+15,'FB2');
    CBall.scale.setTo(1.5,1.5);
    juego.physics.arcade.enable(CBall);//Activar fisicas al Jugador
    CBall.body.velocity.x =380;
    CBall.body.bounce.x=1;
    CBall.body.collideWorldBounds = true;//Colision con los bordes
    //CBall.body.bounce.x = 300; //El Jugador no puede rebotar
    CBall.body.gravity.y = 900;//Gravedad del Jugador
    CBall.animations.add('BallN', [0,1], 20, true);
    CBall.animations.play('BallN');

    Cont=0;

  }





//  piso = Bloque.create(PosBlock,984,'Block');







}
function GameOver (Jugador,Ball){
  Score=0;
  NumStar=0;
  Jugador.kill();
  sndBg.stop();
  sndDie.play();
  this.game.state.restart();

}
function KillB (Ball,BlockT){
Ball.kill();
console.log("Colisiona");

}
function Nocoins (Bloqueo,Moneda){
  Moneda.kill();

}
function KillStar (Jugador,Estrella){
  Estrella.kill();
  Score=Score+30;
  Txt.text='Puntos: '+Score;
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
  Txt.text='Puntos: '+Score;
  sndCoin.play();


}

function Coli_P (Jugador,Princesa){
  Princesa.kill();
  Jugador.kill();
  sndBg.stop();
  juego.add.sprite(0,0,'Fin');
	


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

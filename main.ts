namespace SpriteKind {
    export const obstacle = SpriteKind.create()
}

// Variables globales
//  -----------------------------
//  Funciones
//  -----------------------------
function set_game() {
    
    //  Inicializa el juego: crea el jugador, establece la gravedad,
    //  el fondo, y mantiene al jugador dentro de la pantalla.
    textSprite2.setFlag(SpriteFlag.Invisible, true)
    bubble = sprites.create(assets.image`
        bubble
        `, SpriteKind.Player)
    bubble.setPosition(40, 60)
    bubble.ay = 300
    bubble.setStayInScreen(true)
    scene.setBackgroundImage(assets.image`
        game_fondo
        `)
    scene.setBackgroundColor(9)
}

controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    //  Función que permite al jugador saltar al presionar la flecha arriba.
    //  Se reproduce un efecto de sonido.
    if (game2) {
        bubble.vy = -100
        music.play(music.createSoundEffect(WaveShape.Sine, 308, 575, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    
})
function FadeToWhite(Time: number) {
    //  Efecto de transición de pantalla blanca.
    color.startFade(color.originalPalette, color.White, Time / 2)
    color.pauseUntilFadeDone()
    color.startFade(color.White, color.originalPalette, Time / 2)
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    //  Inicia el juego desde el menú principal al pulsar A.
    if (start) {
        start = false
        menu = true
        Menu()
    }
    
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.obstacle, function on_on_overlap(player2: Sprite, obstacle2: Sprite) {
    //  Si toca algún obstáculo muere
    game.over(false)
})
function SpawnText(text: string, X: number, Y: number) {
    
    //  Crea un TextSprite con el texto indicado en la posición X, Y.
    textSprite = textsprite.create(text, 0, 1)
    textSprite.setPosition(X, Y)
    textSprite.setOutline(1, 10)
}

function setup_score() {
    
    //  Inicializa la puntuación en pantalla.
    score = 0
    info.setScore(0)
}

function Menu() {
    
    //  Función del menú principal. Transición y inicio de juego.
    if (menu) {
        FadeToWhite(2000)
        game2 = true
        set_game()
        setup_score()
    }
    
}

let bottom_pipe : Sprite = null
let top_pipe : Sprite = null
let center = 0
let score = 0
let menu = false
let game2 = false
let bubble : Sprite = null
let textSprite : TextSprite = null
let textSprite2 : TextSprite = null
let start = false
start = true
let gap = 20
//  -----------------------------
//  Pantalla de inicio
//  -----------------------------
FadeToWhite(2000)
scene.setBackgroundImage(assets.image`
    start background
    `)
textSprite2 = textsprite.create("Bubble", 0, 1)
textSprite2.setPosition(100, 55)
textSprite2.setOutline(1, 10)
music.play(music.createSong(assets.song`
        start_song
        `), music.PlaybackMode.InBackground)
SpawnText("Start (A)", 75, 95)
while (start) {
    textSprite.setFlag(SpriteFlag.Invisible, false)
    pause(1000)
    textSprite.setFlag(SpriteFlag.Invisible, true)
    pause(1000)
}
//  -----------------------------
//  Eventos
//  -----------------------------
game.onUpdateInterval(1500, function on_update_interval() {
    
    let list2 : Sprite[] = []
    //  Genera obstáculos tipo Flappy Bird con un hueco al azar y los añade
    //  a la lista de obstáculos.
    center = randint(20 + Math.idiv(gap, 2), 120 - Math.idiv(gap, 2))
    //  Tubo arriba
    top_pipe = sprites.create(assets.image`
        pipe_top
        `, SpriteKind.obstacle)
    top_pipe.setPosition(160, center - Math.idiv(gap, 2) - 30)
    top_pipe.vx = -50
    top_pipe.setFlag(SpriteFlag.AutoDestroy, true)
    //  Tubo abajo
    bottom_pipe = sprites.create(assets.image`
            pipe_bottom
            `, SpriteKind.obstacle)
    bottom_pipe.setPosition(160, center + Math.idiv(gap, 2) + 30)
    bottom_pipe.vx = -50
    bottom_pipe.setFlag(SpriteFlag.AutoDestroy, true)
    //  Añadimos a la lista
    list2.push(top_pipe)
    list2.push(bottom_pipe)
    //  Incrementa puntuación
    score += 1
    info.setScore(score)
})
forever(function on_forever() {
    //  Comprueba si el jugador toca el suelo para terminar el juego.
    if (bubble.bottom > scene.screenHeight()) {
        game.over(false)
    }
    
})

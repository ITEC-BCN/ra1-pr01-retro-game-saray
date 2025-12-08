namespace SpriteKind {
    export const obstacle = SpriteKind.create()
}

//  Tipo de sprite para obstáculos
//  --- Funciones de juego ---
function set_game() {
    /** Inicializa el juego, el jugador y el fondo */
    
    textSprite2.setFlag(SpriteFlag.Invisible, true)
    //  Oculta el texto del menú
    bubble = sprites.create(assets.image`bubble`, SpriteKind.Player)
    bubble.setPosition(40, 60)
    bubble.ay = 300
    //  Gravedad
    bubble.setStayInScreen(true)
    //  Evita salir de la pantalla
    scene.setBackgroundImage(assets.image`game_fondo`)
    scene.setBackgroundColor(9)
}

controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    /** Hace saltar al jugador y reproduce sonido */
    if (game2) {
        bubble.vy = -100
        music.play(music.createSoundEffect(WaveShape.Sine, 308, 575, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
    
})
function FadeToWhite(Time: number) {
    /** Transición de fundido a blanco y vuelta */
    color.startFade(color.originalPalette, color.White, Time / 2)
    color.pauseUntilFadeDone()
    color.startFade(color.White, color.originalPalette, Time / 2)
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    /** Inicia el juego desde el menú al pulsar A */
    
    if (start) {
        start = false
        menu = true
        Menu()
    }
    
})
function check_game_over() {
    /** Comprueba si el jugador toca el suelo */
    if (bubble.bottom >= scene.screenHeight()) {
        game.over(false)
    }
    
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.obstacle, function on_on_overlap(player2: Sprite, obstacle2: Sprite) {
    /** Comprueba colisión con obstáculos y termina el juego */
    game.over(false)
})
function SpawnText(text: string, X: number, Y: number) {
    /** Crea un textsprite en pantalla */
    
    textSprite = textsprite.create(text, 0, 1)
    textSprite.setPosition(X, Y)
    textSprite.setOutline(1, 10)
}

function Menu() {
    /** Muestra el menú principal y arranca el juego */
    
    if (menu) {
        FadeToWhite(2000)
        game2 = true
        set_game()
    }
    
}

game.onUpdateInterval(1500, function on_update_interval() {
    /** Genera tubos arriba y abajo con hueco aleatorio */
    
    gap = 20
    //  espacio entre tubos
    center = randint(20 + Math.idiv(gap, 2), 120 - Math.idiv(gap, 2))
    //  Tubo superior
    top_pipe = sprites.create(assets.image`pipe_top`, SpriteKind.obstacle)
    top_pipe.setPosition(160, center - Math.idiv(gap, 2) - 30)
    top_pipe.vx = -50
    top_pipe.setFlag(SpriteFlag.AutoDestroy, true)
    //  Tubo inferior
    bottom_pipe = sprites.create(assets.image`pipe_bottom`, SpriteKind.obstacle)
    bottom_pipe.setPosition(160, center + Math.idiv(gap, 2) + 30)
    bottom_pipe.vx = -50
    bottom_pipe.setFlag(SpriteFlag.AutoDestroy, true)
})
forever(function on_forever() {
    /** Loop principal: comprueba constantemente si el jugador toca suelo */
    check_game_over()
})
//  --- Variables globales ---
let bottom_pipe : Sprite = null
let top_pipe : Sprite = null
let center = 0
let gap = 0
let bubble : Sprite = null
let textSprite : TextSprite = null
let textSprite2 : TextSprite = null
let start = false
let menu = false
let game2 = false
let obstacle22 = null
game2 = false
menu = false
start = true
//  --- Inicio del juego ---
FadeToWhite(2000)
scene.setBackgroundImage(assets.image`start background`)
//  Texto del título
textSprite2 = textsprite.create("Bubble", 0, 1)
textSprite2.setPosition(100, 55)
textSprite2.setOutline(1, 10)
//  Reproduce música de inicio
music.play(music.createSong(assets.song`start_song`), music.PlaybackMode.InBackground)
//  Botón Start
SpawnText("Start (A)", 75, 95)
while (start) {
    textSprite.setFlag(SpriteFlag.Invisible, false)
    pause(1000)
    textSprite.setFlag(SpriteFlag.Invisible, true)
    pause(1000)
}

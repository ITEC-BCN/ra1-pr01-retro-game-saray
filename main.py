@namespace
class SpriteKind:
    obstacle = SpriteKind.create()  # Tipo de sprite para obstáculos

# --- Funciones de juego ---
def set_game():
    """Inicializa el juego, el jugador y el fondo"""
    global bubble
    textSprite2.set_flag(SpriteFlag.INVISIBLE, True)  # Oculta el texto del menú
    bubble = sprites.create(assets.image("bubble"), SpriteKind.player)
    bubble.set_position(40, 60)
    bubble.ay = 300  # Gravedad
    bubble.set_stay_in_screen(True)  # Evita salir de la pantalla
    scene.set_background_image(assets.image("game_fondo"))
    scene.set_background_color(9)

def on_up_pressed():
    """Hace saltar al jugador y reproduce sonido"""
    if game2:
        bubble.vy = -100
        music.play(
            music.create_sound_effect(
                WaveShape.SINE, 308, 575, 255, 0, 200,
                SoundExpressionEffect.NONE, InterpolationCurve.LINEAR
            ),
            music.PlaybackMode.IN_BACKGROUND
        )
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def FadeToWhite(Time: number):
    """Transición de fundido a blanco y vuelta"""
    color.start_fade(color.original_palette, color.white, Time / 2)
    color.pause_until_fade_done()
    color.start_fade(color.white, color.original_palette, Time / 2)

def on_a_pressed():
    """Inicia el juego desde el menú al pulsar A"""
    global start, menu
    if start:
        start = False
        menu = True
        Menu()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def check_game_over():
    """Comprueba si el jugador toca el suelo"""
    if bubble.bottom >= scene.screen_height():
        game.over(False)

def on_on_overlap(player2, obstacle2):
    """Comprueba colisión con obstáculos y termina el juego"""
    game.over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.obstacle, on_on_overlap)

def SpawnText(text: str, X: number, Y: number):
    """Crea un textsprite en pantalla"""
    global textSprite
    textSprite = textsprite.create(text, 0, 1)
    textSprite.set_position(X, Y)
    textSprite.set_outline(1, 10)

def Menu():
    """Muestra el menú principal y arranca el juego"""
    global game2
    if menu:
        FadeToWhite(2000)
        game2 = True
        set_game()

def on_update_interval():
    """Genera tubos arriba y abajo con hueco aleatorio"""
    global gap, center, top_pipe, bottom_pipe
    gap = 20  # espacio entre tubos
    center = randint(20 + Math.idiv(gap, 2), 120 - Math.idiv(gap, 2))
    # Tubo superior
    top_pipe = sprites.create(assets.image("pipe_top"), SpriteKind.obstacle)
    top_pipe.set_position(160, center - Math.idiv(gap, 2) - 30)
    top_pipe.vx = -50
    top_pipe.set_flag(SpriteFlag.AUTO_DESTROY, True)
    # Tubo inferior
    bottom_pipe = sprites.create(assets.image("pipe_bottom"), SpriteKind.obstacle)
    bottom_pipe.set_position(160, center + Math.idiv(gap, 2) + 30)
    bottom_pipe.vx = -50
    bottom_pipe.set_flag(SpriteFlag.AUTO_DESTROY, True)
game.on_update_interval(1500, on_update_interval)

def on_forever():
    """Loop principal: comprueba constantemente si el jugador toca suelo"""
    check_game_over()
forever(on_forever)

# --- Variables globales ---
bottom_pipe: Sprite = None
top_pipe: Sprite = None
center = 0
gap = 0
bubble: Sprite = None
textSprite: TextSprite = None
textSprite2: TextSprite = None
start = False
menu = False
game2 = False
obstacle22 = None
game2 = False
menu = False
start = True

# --- Inicio del juego ---
FadeToWhite(2000)
scene.set_background_image(assets.image("start background"))

# Texto del título
textSprite2 = textsprite.create("Bubble", 0, 1)
textSprite2.set_position(100, 55)
textSprite2.set_outline(1, 10)

# Reproduce música de inicio
music.play(music.create_song(assets.song("start_song")),
    music.PlaybackMode.IN_BACKGROUND)

# Botón Start
SpawnText("Start (A)", 75, 95)
while start:
    textSprite.set_flag(SpriteFlag.INVISIBLE, False)
    pause(1000)
    textSprite.set_flag(SpriteFlag.INVISIBLE, True)
    pause(1000)

@namespace
class SpriteKind:
    obstacle = SpriteKind.create()

#Variables globales

# -----------------------------
# Funciones
# -----------------------------
def set_game():
    global bubble
    # Inicializa el juego: crea el jugador, establece la gravedad,
    # el fondo, y mantiene al jugador dentro de la pantalla.
    textSprite2.set_flag(SpriteFlag.INVISIBLE, True)
    bubble = sprites.create(assets.image("""
        bubble
        """), SpriteKind.player)
    bubble.set_position(40, 60)
    bubble.ay = 300
    bubble.set_stay_in_screen(True)
    scene.set_background_image(assets.image("""
        game_fondo
        """))
    scene.set_background_color(9)

def on_up_pressed():
    # Función que permite al jugador saltar al presionar la flecha arriba.
    # Se reproduce un efecto de sonido.
    if game2:
        bubble.vy = -100
        music.play(music.create_sound_effect(WaveShape.SINE,
                308,
                575,
                255,
                0,
                200,
                SoundExpressionEffect.NONE,
                InterpolationCurve.LINEAR),
            music.PlaybackMode.IN_BACKGROUND)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def FadeToWhite(Time: number):
    # Efecto de transición de pantalla blanca.
    color.start_fade(color.original_palette, color.white, Time / 2)
    color.pause_until_fade_done()
    color.start_fade(color.white, color.original_palette, Time / 2)

def on_a_pressed():
    global start, menu
    # Inicia el juego desde el menú principal al pulsar A.
    if start:
        start = False
        menu = True
        Menu()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(player2, obstacle2):
    # Si toca algún obstáculo muere
    game.over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.obstacle, on_on_overlap)

def SpawnText(text: str, X: number, Y: number):
    global textSprite
    # Crea un TextSprite con el texto indicado en la posición X, Y.
    textSprite = textsprite.create(text, 0, 1)
    textSprite.set_position(X, Y)
    textSprite.set_outline(1, 10)
def setup_score():
    global score
    # Inicializa la puntuación en pantalla.
    score = 0
    info.set_score(0)
def Menu():
    global game2
    # Función del menú principal. Transición y inicio de juego.
    if menu:
        FadeToWhite(2000)
        game2 = True
        set_game()
        setup_score()
bottom_pipe: Sprite = None
top_pipe: Sprite = None
center = 0
score = 0
menu = False
game2 = False
bubble: Sprite = None
textSprite: TextSprite = None
textSprite2: TextSprite = None
start = False
start = True
gap = 20
# -----------------------------
# Pantalla de inicio
# -----------------------------
FadeToWhite(2000)
scene.set_background_image(assets.image("""
    start background
    """))
textSprite2 = textsprite.create("Bubble", 0, 1)
textSprite2.set_position(100, 55)
textSprite2.set_outline(1, 10)
music.play(music.create_song(assets.song("""
        start_song
        """)),
    music.PlaybackMode.IN_BACKGROUND)
SpawnText("Start (A)", 75, 95)
while start:
    textSprite.set_flag(SpriteFlag.INVISIBLE, False)
    pause(1000)
    textSprite.set_flag(SpriteFlag.INVISIBLE, True)
    pause(1000)
# -----------------------------
# Eventos
# -----------------------------

def on_update_interval():
    global center, top_pipe, bottom_pipe, score
    list2: List[Sprite] = []
    # Genera obstáculos tipo Flappy Bird con un hueco al azar y los añade
    # a la lista de obstáculos.
    center = randint(20 + Math.idiv(gap, 2), 120 - Math.idiv(gap, 2))
    # Tubo arriba
    top_pipe = sprites.create(assets.image("""
        pipe_top
        """), SpriteKind.obstacle)
    top_pipe.set_position(160, center - Math.idiv(gap, 2) - 30)
    top_pipe.vx = -50
    top_pipe.set_flag(SpriteFlag.AUTO_DESTROY, True)
    # Tubo abajo
    bottom_pipe = sprites.create(assets.image("""
            pipe_bottom
            """),
        SpriteKind.obstacle)
    bottom_pipe.set_position(160, center + Math.idiv(gap, 2) + 30)
    bottom_pipe.vx = -50
    bottom_pipe.set_flag(SpriteFlag.AUTO_DESTROY, True)
    # Añadimos a la lista
    list2.append(top_pipe)
    list2.append(bottom_pipe)
    # Incrementa puntuación
    score += 1
    info.set_score(score)
game.on_update_interval(1500, on_update_interval)

def on_forever():
    # Comprueba si el jugador toca el suelo para terminar el juego.
    if bubble.bottom > scene.screen_height():
        game.over(False)
forever(on_forever)

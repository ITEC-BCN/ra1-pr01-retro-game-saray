function FadeToWhite (Time: number) {
    color.startFade(color.originalPalette, color.White, Time / 2)
    color.pauseUntilFadeDone()
    color.startFade(color.White, color.originalPalette, Time / 2)
}
function SpawnText (text: string, X: number, Y: number) {
    textSprite = textsprite.create(text, 0, 5)
    textSprite.setPosition(X, Y)
    textSprite.setOutline(1, 14)
}
let textSprite: TextSprite = null
let game2 = false
let menu = false
let start = true
FadeToWhite(4000)
scene.setBackgroundImage(assets.image`start background`)
SpawnText("Press Start", 76, 110)

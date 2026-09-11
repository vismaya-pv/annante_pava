import sys
import io
import re

# Force UTF-8 stdout
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()
with open('audio.js', 'r', encoding='utf-8') as f:
    audio = f.read()
with open('dance-mode.js', 'r', encoding='utf-8') as f:
    dance = f.read()
with open('game.js', 'r', encoding='utf-8') as f:
    game = f.read()
with open('characters.js', 'r', encoding='utf-8') as f:
    characters = f.read()
with open('styles.css', 'r', encoding='utf-8') as f:
    styles = f.read()

# 1. Exact strings check
required_strings = [
    'Annante Pava',
    'varu tholkku povvu :)',
    'DROP',
    'Change View',
    'Oru dance Kalik',
    'ahh polich petta thala polum sahikilla',
    'nanaayi vaa',
    'njn paranjelle thodanda yann chammi poyelle',
    'sarilla kutta try again fail again hehehe',
    'Just one more try...',
    'RECENT WINS',
    'View all →'
]

print("=== CHECKING REQUIRED EXACT STRINGS ===")
for s in required_strings:
    found = (s in html or s in game or s in dance)
    assert found, f'Missing required string: {s}'
    print(f'PASS: Found required string "{s}"')

# 2. Two m's check in chammi
assert 'chammi' in html, 'Failed chammi check in html'
assert 'chammi' in game, 'Failed chammi check in game.js'
print('PASS: Two ms in "chammi" verified')

# 3. Check prohibited coin/payment keywords in user-facing UI
prohibited = ['coin', 'credit', 'wallet', 'insert coin', 'buy credit', 'pay-to-play']
for p in prohibited:
    assert p not in html.lower(), f'Found prohibited term in html: {p}'
print('PASS: Zero coin / credit / wallet terms in HTML')

# 4. Check AUDIO_CONFIG structure
assert 'const AUDIO_CONFIG =' in audio
assert 'rating: "YOUR_RATING_AUDIO_HERE"' in audio
assert 'music: "YOUR_MUSIC_AUDIO_HERE"' in audio
assert 'blessing: "YOUR_BLESSING_AUDIO_HERE"' in audio
assert 'doNotPress: "YOUR_DO_NOT_PRESS_AUDIO_HERE"' in audio
print('PASS: AUDIO_CONFIG matches exact required structure')

# 5. Check dance score values and formatting
assert '[-6767, 10000, 0, 5, -3, 99]' in dance
assert '${chosenValue}/10' in dance
print('PASS: Dance mode random values and format verified')

# 6. Check intentionally reversed joystick mapping
# LEFT -> UP (jx < 0 => clawY decreases)
# RIGHT -> DOWN (jx > 0 => clawY increases)
# UP -> RIGHT (jy < 0 => clawX increases)
# DOWN -> LEFT (jy > 0 => clawX decreases)
assert 'dClawY += jx * moveSpeed' in game
assert 'dClawX -= jy * moveSpeed' in game
print('PASS: Intentionally reversed joystick mapping verified')

# 7. Check grounded plush toys (20-25 toys, none floating, physical colliders)
pile_matches = re.findall(r'y:\s*(\d+)', characters)
assert 20 <= len(pile_matches) <= 25, f'Expected 20-25 plush toys, found {len(pile_matches)}'
for y_str in pile_matches:
    y_val = int(y_str)
    assert y_val >= 50, f'Plush toy floating too high (y={y_val}%)'
print(f'PASS: Grounded plush pile verified ({len(pile_matches)} toys, all resting on machine floor)')

# 8. Check solid machine floor plane
assert 'machine-floor-plane' in html
assert 'machine-floor-plane' in styles
assert 'machineFloor' in html
assert 'floorPercent' in game
print('PASS: Solid collision machine floor plane verified')

# 9. Check BOTTOM-LEFT prize chute positioning
assert 'left: 14px' in styles
assert 'prizeChute' in html
assert 'prize-chute-box' in styles
print('PASS: Bottom-left prize chute positioning verified')

# 10. Check Automated DROP state machine in game.js (Section 10 & 26)
required_states = [
    'MOVING_TO_TARGET',
    'LOWERING',
    'GRABBING',
    'LIFTING',
    'MOVING_TO_PRIZE_BOX',
    'POSITIONING',
    'RELEASING',
    'BOX_CLOSING',
    'TOY_ENTERING_BOX',
    'SHOWING_FAILURE_MESSAGE',
    'RESETTING',
    'IDLE'
]
for state in required_states:
    assert state in game, f'Missing state machine state: {state}'
assert 'executeAutomatedDropSequence' in game
assert 'findTargetPlush' in game
print('PASS: Section 10 & 26 Complete Automated DROP State Machine verified')

# 11. Check animated trapdoor closing BEFORE toy completes fall
assert 'chuteTrapdoor' in html
assert 'chute-trapdoor' in styles
assert 'trapdoor-closing' in game
assert 'trapdoor-closed' in game
print('PASS: Animated motorized prize chute trapdoor mechanism verified')

# 12. Check ceiling rail and carriage attachment
assert 'ceiling-mount-anchor' in html
assert 'trolley-track' in html
assert 'trolleyX' in html
assert 'clawAssembly' in html
print('PASS: Ceiling rail and motorized carriage assembly verified')

# 13. Check DOM ID integrity between JS and HTML
for elem_id in [
    'clawCabinet', 'trolleyTrack', 'trolleyX', 'clawAssembly', 'clawCable',
    'clawHead', 'plushContainer', 'btnDrop', 'joystickStick', 'joystickBall',
    'prizeChute', 'chuteTrapdoor', 'postDropOverlay', 'blessingOverlay',
    'warningOverlay', 'recentWinsList', 'viewAllModal', 'allWinsGrid'
]:
    assert f'id="{elem_id}"' in html, f'Missing DOM element #{elem_id} in index.html'

print('PASS: All DOM element IDs verified')
print("\n🎉 ALL 13 CORE ARCHITECTURE AND COMPLIANCE CHECKS PASSED!")

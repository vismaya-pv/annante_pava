<img width="1280" height="640" alt="git (1)" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />



# Annante Pava — Virtual Claw Machine 🎯


## Basic Details
### Team Name: [Name]


### Team Members
- Team Lead: [Name] - [College]
- Member 2: [Name] - [College]
- Member 3: [Name] - [College]

### Project Description
Annante Pava is a virtual arcade claw machine that looks completely winnable and absolutely is not. Steer a motorized claw around a glass cabinet full of cute plushies, hit DROP, and watch a fully automated grab-lift-carry-release sequence play out — only for the trapdoor to slam shut a moment too soon, every single time.

### The Problem (that doesn't exist)
Real claw machines let you occasionally win, which builds false hope. Nobody asked for a claw machine that's honest about the odds, but here we are.

### The Solution (that nobody asked for)
We built a pixel-perfect claw machine — ceiling rail, motorized carriage, articulated 3-finger claw, 20+ grounded plushies, a "prize chute" and all — then intentionally reversed the joystick controls (left moves the claw up, up moves it right, and so on) and rigged the automated DROP sequence so the chute trapdoor always snaps shut just before the toy lands inside. For good measure, there's a "Do Not Press" button you obviously will press, a "Blessing" button that blesses you with nothing, and a Dance Mode that scores your dancing using your webcam and a completely nonsensical, hard-coded set of possible scores (including -6767 out of 10).

## Technical Details
### Technologies/Components Used
For Software:
- HTML5, CSS3, vanilla JavaScript (no frameworks)
- Web Audio API (procedural kawaii sound effects, with support for optional audio file overrides)
- `getUserMedia` / webcam API (for Dance Mode's live camera view and motion tracking)
- Google Fonts (Fredoka, Mali, Nunito)
- Python 3 (`validate.py` — a build/compliance checker for the project's required strings, DOM IDs, and game logic, not part of the runtime app)

For Hardware:
- None — this is a fully virtual, browser-based claw machine. A webcam is optional, only for Dance Mode.

### Implementation
For Software:
# Installation
No build step or dependencies needed — it's static HTML/CSS/JS.
```
git clone <this-repo-url>
cd useless_project_3.0-main
```

# Run
Just open `index.html` in a browser, or serve it locally:
```
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

# Optional: Run the compliance validator
```
python3 validate.py
```

### Project Documentation
For Software:

# Screenshots (Add at least 3)
![Screenshot1](Add screenshot 1 here with proper name)
*Add caption explaining what this shows*

![Screenshot2](Add screenshot 2 here with proper name)
*Add caption explaining what this shows*

![Screenshot3](Add screenshot 3 here with proper name)
*Add caption explaining what this shows*

For Hardware:

# Build Photos
![Components](Add photo of your components here)
*List out all components shown*

![Build](Add photos of build process here)
*Explain the build steps*

![Final](Add photo of final product here)
*Explain the final build*

### Project Demo
# Video
[Add your demo video link here]
*Explain what the video demonstrates*

# Additional Demos
[Add any extra demo materials/links]

## Team Contributions
- [Name 1]: [Specific contributions]
- [Name 2]: [Specific contributions]
- [Name 3]: [Specific contributions]

---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)

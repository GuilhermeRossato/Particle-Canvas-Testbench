# Particle Canvas Testbench

This particle testbench renders N particles in a world made out of squares.
It varies the amount of particles so that a FPS treshold is met.
With the number of particle and the FPS, you can compare any setup.

# Preview

![Preview v0.1](https://github.com/GuilhermeRossato/ParticleCanvasTextbench/blob/master/Images/preview1.png?raw=true)

# Demo

[Basic Version](https://rawgit.com/GuilhermeRossato/ParticleCanvasTextbench/master/Basic/index.html)

# How to use

1. Choose one of the demos to use as parameter.
2. (optional) Choose a target FPS (default is 60 when you open a demo)
3. Run the demo for at least a minute.
4. The performance score will be shown at the top left

# The Setup
1. All particles have a square on them, with a trail (polygon) of up to 10 points
2. Each block is a square box of varying sizes that shows together often

# Each Frame
1. Each particle updates it's position
2. If a particle is inside a block, it must be destroyed
3. If there's less than the Maximum Particle Count, up to 5 particles can be created in that frame.
4. Everything is redrawn

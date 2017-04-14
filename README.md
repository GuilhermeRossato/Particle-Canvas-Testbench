# Particle Canvas Testbench

This particle testbench renders N particles in a world made out of squares.
It varies the amount of particles so that a FPS treshold is met.
With the number of particle and the FPS, you can compare any setup.

This testbench focuses on High CPU usage and Low to Medium GPU usage.

This experiment should be used to compare different computer's ability to render particles in the canvas.

# Preview

![Preview v0.1](https://raw.githubusercontent.com/GuilhermeRossato/ParticleCanvasTestbench/master/Images/preview1.png)

# Demo

[Basic Version](https://rawgit.com/GuilhermeRossato/ParticleCanvasTestbench/master/index.html)

# How to use

1. Run the Demo.
2. Configure to your liking (lower FPS implies in better result accuracy)
3. Remember configuration.
4. Run the experiment for at least 1 minute (so that particle count stabilizes)
5. Note down the particle count in the chosen configuration.
6. Do the same to another computer and compare both particle counts.

# The Setup
1. All particles have a square on them, with a trail (polygon) of up to 10 points
2. Each block is a square box of varying sizes that shows together often

# Each Frame
1. Each particle updates it's position
2. If a particle is inside a block, it must be destroyed
3. If there's less than the Maximum Particle Count, up to 5 particles can be created in that frame.
4. Everything is redrawn

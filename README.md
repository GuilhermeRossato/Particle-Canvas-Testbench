# Particle Canvas Testbench

This particle testbench renders N particles in a world made out of space and  squares. It varies the amount of particles so that a FPS treshold is met. You can use the number of particles supported in a given configuration to compare browsers and systems performance.

The experiment can also be used to compare the performance of different programming strategies like class abstracting, module instanciation and functional programming.

# Preview

![Preview v0.1](https://raw.githubusercontent.com/GuilhermeRossato/ParticleCanvasTestbench/master/Images/preview1.png)

# Demo

1. [Abstract Version](https://rawgit.com/GuilhermeRossato/ParticleCanvasTestbench/master/Basic/index.html) (Classes and Modules)
2. [Obfuscated Version](https://rawgit.com/GuilhermeRossato/ParticleCanvasTestbench/master/Obfuscated/index.html) (Functional Programming)

# How to use

1. Run the Demo.
2. Configure to your liking (lower FPS implies in better result accuracy)
3. Remember configuration.
4. Run the experiment for at least 1 minute (so that particle count stabilizes)
5. Note down the particle count in the chosen configuration.
6. Do the same to another computer and compare both particle counts.

# The Setup

This experiment uses the Step Update Pattern that divides the update function in timestamps of 16ms, adding up left overs.

1. All particles have a square on them, with a trail (polygon) of up to 10 points
2. Each block is a square box of varying sizes that shows together often

# Each Frame
1. Each particle updates it's position.
2. If a particle is inside a block, it must be destroyed.
3. If there's less than the Maximum Particle Count, up to 5 particles will be created in that frame, depends on the difference between the maximun particle count and the particle count.
4. Filter lists to remove dead particles and blocks.
5. Everything is redrawn.

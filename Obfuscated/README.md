# Obfuscated Particle Canvas Testbench

This demo focuses on obfuscating everything related to the update loop, leaving it entirely functional-oriented.

Basically, I removed every class and method call and put it where it is used, the code became a huge interwined mess, the update function is 100 lines long.

The reason behind that is that I want to test how much is abstraction costing me in terms of performance. The difference between the basic version and this is what I call "abstraction loss".

If you want to compare how clear the code is: Link to [basic code base](https://github.com/GuilhermeRossato/ParticleCanvasTestbench/blob/master/Basic/Script/Classes/Application.js), Link to [obfuscated code base](https://github.com/GuilhermeRossato/ParticleCanvasTestbench/blob/master/Obfuscated/Script/Classes/Application.js)

# Running

[Click Here](https://rawgit.com/GuilhermeRossato/ParticleCanvasTestbench/master/Obfuscated/index.html)

# Testbench on Developer's Computer

The following specs are to be considered:

Board:	Phitronics N68C-M3

CPU:	AMD Athlon II X2 250, 3 GHz - 60W - Technology 45nm - 1.408v

RAM:	DDR3 4GB Dual Channel, 1607.4 MHz

GPU:	Chipset: NVIDIA GeForce 7025 A3 - Southbridge: nForce 630a A2 - Memory: 256MB 1334MHz - Core: 500MHz

BIOS:	American Megatrends Inc. v1.00 - 2010

OS:		Windows 7 Professional 2009 - 64 bits

Browsr:	Google Chrome 57.0.2987.133 (Official version) 64 bits

Canvas:	Balanced size

# Results

57 FPS => 145 Particles

30 FPS => 330 Particles

7 FPS => 1225 Particles

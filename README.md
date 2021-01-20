# ArduinoToneComposer

A JavaScript based GUI webapp that makes it easy and intuitive to code melodies for Arduino buzzers.
The live webapp is currently being hosted at [https://baut.club](https://baut.club/software/arduinotonecomposer).

Using the webapp on that website is probably the easiest way to use it.

Alternatively jump to the "Local hosting & modification" section.

## Screenshots

How the webapp looks:

![ArduinoToneComposer webapp UI example](https://gitlab.com/Baut/readme-images/-/raw/master/ArduinoToneComposer/ArduinoToneComposerUIexample.png)

![ArduinoToneComposer webapp UI example2](https://gitlab.com/Baut/readme-images/-/raw/master/ArduinoToneComposer/ArduinoToneComposerWebsiteExample.png)

![ArduinoToneComposer webapp export example](https://gitlab.com/Baut/readme-images/-/raw/master/ArduinoToneComposer/ArduinoToneComposerExportCodeExample.png)


## Functionality

* **Left click** on the canvas to add a note. Left click on a note to delete it.
* There can only be **one note per column**. This is due to limitations of the `tone()` method and the hardware. If there is a conflict, the old note is replaced with the new note.
* Volume slider: Adjust to change the volume of the melody.
* Note duration [ms]: How long each unit (represented by a column in the grid) is. Unit is milliseconds, expects whole numbers.
* Amount of notes: Length of your canvas/Amount of columns. You can turn this up a lot, as both the export buttons will cut empty time after the melody anyways.
* RESET: Delete all notes, clear the canvas and start over.
* ExportSong: Gives you a simple string that you can use to share or save your melodies in a more compact manner than Arduino code.
* ImportSong: Can take the strings others exported to import their melodies.
* ExportCode: Shows a popup with Arduino code that will play your melody. Just copy paste it to your Arduino IDE.
* Play Audio: Play the melody.
* Loop: If you check this the melody loops (repeats) when reaching the end.
* Combine tones: When not checked, every tone is played individually. Otherwise, multiple same notes after another will be played as one (longer) note.


## Example melodies

Some random melodies made with this tool.

| Song name | Export string |
| ------ | ------ |
| Nokia ringtone | -14,200,0,1+29,27,19,21,26,24,15,17,24,22,14,17,22,22- |
| Happy Birthday | -28,200,0,0+8,8,10,8,13,12,0,8,8,10,8,15,13,0,8,8,20,17,13,12,10,0,18,18,17,13,15,13- |
| Sweet Child o' Mine (intro) | -64,200,1,1+15,27,22,20,32,22,31,22,15,27,22,20,32,22,31,22,17,27,22,20,32,22,31,22,17,27,22,20,32,22,31,22,20,27,22,20,32,22,31,22,20,27,22,20,32,22,31,22,15,27,22,20,32,22,31,22,15,27,22,20,32,22,31,22- |
| Ode to Joy | -15,200,0,0+17,17,18,20,20,18,17,15,13,13,15,17,17,15,15- |
| Smoke on the water (barely)  | -17,300,1,1+15,18,20,20,15,18,21,20,20,15,18,20,20,18,18,15,15- |

## Local hosting & modification

You can backup this repo by cloning it. To use the webapp offline, open the .html file with your browser of choice. By default it loads the optimized version of the code. Remember that the same things apply as they do for the website version: You need to have JavaScript enabled for it to work.

Due to not having the CSS of the main website, backgrounds will be white and the whole thing will look much worse, but functionality will be the same.

There's four files in the repo:

* ArduinoToneComposer.html

This is the .html part of the webapp. It's also what you open to use it. It loads the ArduinoToneComposer_optimized.js file by default.

* ArduinoToneComposer_NoHostVersion.html

***Some browsers do not allow loading of external scripts for locally hosted files. An easy way to circumvent this is to host the folder as a (local) webserver (for example with `python -m http.server`). The NoHostVersion is an alternative that doesn't need this. It's a single file with the content from both ArduinoToneComposer.html and ArduinoToneComposer_optimized.js. To use it, just open it with your browser of choice.***

* ArduinoToneComposer_optimized.js

This is a version where the code was optimized (mostly to reduce bandwidth usage when accessing the live website online, but also to run more efficiently) by the [Closure Compiler](https://github.com/google/closure-compiler). If you just want to use the program, this file is the one for you.

* ArduinoToneComposer_unoptimized.js

Basically the same code, but not optimized. It is easier to read, has comments (albeit few) and is easier to modify. If you want to change things in the programming of the webapp, this is where you do it.

The code for this webapp was partially changed to optimize it, but both the audio and the drawing of the canvas (grid and notes) are done on the same thread, so (especially on slower machines) audio might lag/glitch a little when the code has to handle many inputs in quick succession.

I considered multithreading the audio with a webworker, but webworkers don't support audio. This could possibly be handled with either an audio worklet or by using a webworker to generate the canvas image data on a seperate thread, but with the optimization and improvements of the code this doesn't seem necessary for now.

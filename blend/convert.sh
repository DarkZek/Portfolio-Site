#!/bin/bash
ffmpeg -y -framerate 60 -i %04d.png -c:v libvpx -b:v 1M -auto-alt-ref 0 output.webm
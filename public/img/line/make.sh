#!/bin/bash
ffmpeg -y -framerate 24 -i %04d.png -c:v libvpx -b:v 1M -auto-alt-ref 0 output.webm && cp ./output.webm ../line.webm
ffmpeg -y -c:v libvpx -i output.webm -vf reverse -c:v libvpx -pix_fmt yuva420p -auto-alt-ref 0 '../line_reversed.webm'
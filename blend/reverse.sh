#!/bin/bash
ffmpeg -y -c:v libvpx -i output.webm -vf reverse -c:v libvpx -pix_fmt yuva420p -auto-alt-ref 0 ./output_reversed.webm
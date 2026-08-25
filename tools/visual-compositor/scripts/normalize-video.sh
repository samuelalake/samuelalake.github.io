#!/usr/bin/env bash

set -euo pipefail

if [[ $# -lt 2 || $# -gt 4 ]]; then
  echo "Usage: $0 INPUT OUTPUT_MP4 [POSTER_JPG] [POSTER_TIME_SECONDS]" >&2
  exit 64
fi

input_path="$1"
output_path="$2"
poster_path="${3:-}"
poster_time="${4:-1}"

if [[ ! -f "$input_path" ]]; then
  echo "Input does not exist: $input_path" >&2
  exit 66
fi

mkdir -p "$(dirname "$output_path")"

ffmpeg -y -v error -stats \
  -i "$input_path" \
  -map 0:v:0 \
  -vf "fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2:in_range=full:out_range=tv,format=yuv420p" \
  -c:v libx264 \
  -preset medium \
  -crf 20 \
  -pix_fmt yuv420p \
  -color_range tv \
  -an \
  -movflags +faststart \
  "$output_path"

if [[ -n "$poster_path" ]]; then
  mkdir -p "$(dirname "$poster_path")"
  ffmpeg -y -v error \
    -ss "$poster_time" \
    -i "$output_path" \
    -frames:v 1 \
    -q:v 2 \
    "$poster_path"
fi

ffprobe -v error \
  -select_streams v:0 \
  -show_entries stream=codec_name,width,height,pix_fmt,r_frame_rate \
  -show_entries format=duration \
  -of default=noprint_wrappers=1 \
  "$output_path"

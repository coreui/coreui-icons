#!/bin/bash
dir=${PWD}
# mkdir "$dir"/test/
# mkdir "$dir"/test/pdf/
# for file in ${dir}/raw/brands/*.svg
#     do
#         filename=$(basename "$file")
#         inkscape "$file" -o "$dir"/test/pdf/"${filename%.svg}.pdf"
#     done

mkdir "$dir"/test/svg/
for file in ${dir}/test/pdf/*.pdf
    do
        filename=$(basename "$file")
        inkscape "$file" -o "$dir"/test/svg/"${filename%.pdf}.svg"
    done
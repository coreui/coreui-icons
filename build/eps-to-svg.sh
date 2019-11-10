#!/bin/bash
dir=${PWD}
mkdir "$dir"/test/svg/
for file in ${dir}/test/eps/*.eps
    do
        filename=$(basename "$file")
        inkscape "$file" -o "$dir"/test/svg/"${filename%.eps}.svg"
    done
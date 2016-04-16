#!/bin/sh

function escape_slashes {
    sed 's/\//\\\//g'
}

function change_line {
    local OLD_LINE_PATTERN=$1; shift
    local NEW_LINE=$1; shift
    local FILE=$1

    local NEW=$(echo "${NEW_LINE}" | escape_slashes)
    sed -i .bak '/'"${OLD_LINE_PATTERN}"'/s/.*/'"${NEW}"'/' "${FILE}"
    mv "${FILE}.bak" /tmp/
}

MANIFEST=`cat build/manifest.json | tr "\n" " " | tr -s " "`
HTML_LINE="<script type=\"text/javascript\">window.webpackManifest = $MANIFEST;</script>"

#echo $MANIFEST
change_line "window.webpackManifest" "$HTML_LINE" index.html

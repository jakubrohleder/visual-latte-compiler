KATALOG="."

function testGood {
    for TESTNAME in $1
    do
        extension="${TESTNAME##*.}"
        filename="${TESTNAME%.*}"
        basename=$(basename $filename)

        if [[ "$extension" == "lat" ]]
        then
            STDERR="$(${KATALOG}/latc_x86_64 ${filename}.lat \. 2>&1)"

            if [[ "$STDERR" != OK* ]]
            then
                echo "${KATALOG}/latc_x86_64 ${filename}.lat . && \"./${basename}\""
                echo "${filename}: ERROR"
                exit 1
            fi

            if [ -f "${filename}.input" ]
            then
                "./${basename}" > "${basename}.out" < "${filename}.input"
            else
                "./${basename}" > "${basename}.out"
            fi

            rm "${basename}"
            rm "${basename}.s"

            if diff "${filename}.output" "${basename}.out"; then
                echo "${basename}: OK"
                rm "${basename}.out"
            else
                if [ -f "${filename}.input" ]
                then
                    echo "${KATALOG}/latc_x86_64 ${filename}.lat . && \"./${basename}\" < \"${filename}.input\""
                else
                    echo "${KATALOG}/latc_x86_64 ${filename}.lat . && \"./${basename}\""
                fi
                echo "${basename}: ERROR"
                rm "${basename}.out"
            fi
        fi
    done
}

function testBad {
    for TESTNAME in $1
    do
        extension="${TESTNAME##*.}"
        filename="${TESTNAME%.*}"


        if [[ "$extension" == "lat" ]]
        then
            STDERR="$(${KATALOG}/latc_x86_64 ${filename}.lat \. 2>&1)"
            if [[ "$STDERR" != ERROR* ]]
            then
                rm "${filename}.out"
                rm "${filename}"
                echo "${KATALOG}/latc_x86_64 ${filename}.lat \."
                echo "${filename}: ERROR"
            else
                echo "${filename}: OK"
            fi
        fi
    done
}

testGood "samples/mine/*"

testGood "samples/good/*"

testBad "samples/bad/*"
testGood "samples/extra/bad/runtime/*"
testBad "samples/extra/bad/semantic/*"

# testGood "samples/extra/good/arrays/*"
testGood "samples/extensions/arrays1/*"
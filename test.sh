KATALOG="."

for TESTNAME in samples/extra/good/basic/*
do
    extension="${TESTNAME##*.}"
    filename="${TESTNAME%.*}"


    if [[ "$extension" == "lat" ]]
    then
        STDERR="$(${KATALOG}/latc_x86_64 ${filename}.lat 2>&1)"

        if [[ "$STDERR" != OK* ]]
        then
            echo "${KATALOG}/latc_x86_64 ${filename}.lat && \"${filename}\""
            echo "${filename}: ERROR"
            exit 1
        fi

        "${filename}" > "${filename}.out"
        rm "${filename}"
        rm "${filename}.s"

        if diff "${filename}.output" "${filename}.out"; then
            echo "${filename}: OK"
            rm "${filename}.out"
        else
            echo "${KATALOG}/latc_x86_64 ${filename}.lat && \"${filename}\""
            echo "${filename}: ERROR"
            rm "${filename}.out"
        fi
    fi
done

# for TESTNAME in samples/good/*
# do
#     extension="${TESTNAME##*.}"
#     filename="${TESTNAME%.*}"


#     if [[ "$extension" == "lat" ]]
#     then
#         STDERR="$(${KATALOG}/latc_x86_64 ${filename}.lat 2>&1)"

#         if [[ "$STDERR" != OK* ]]
#         then
#             echo "${KATALOG}/latc_x86_64 ${filename}.lat && \"${filename}\""
#             echo "${filename}: ERROR"
#         fi

#         "${filename}" > "${filename}.out"
#         rm "${filename}"
#         rm "${filename}.s"

#         if diff "${filename}.output" "${filename}.out"; then
#             echo "${filename}: OK"
#             rm "${filename}.out"
#         else
#             echo "${KATALOG}/latc_x86_64 ${filename}.lat && \"${filename}\""
#             echo "${filename}: ERROR"
#             rm "${filename}.out"
#         fi
#     fi
# done

# for TESTNAME in samples/bad/*
# do
#     extension="${TESTNAME##*.}"
#     filename="${TESTNAME%.*}"


#     if [[ "$extension" == "lat" ]]
#     then
#         STDERR="$(${KATALOG}/latc_x86_64 ${filename}.lat 2>&1)"
#         if [[ "$STDERR" != ERROR* ]]
#         then
#             rm "${filename}.out"
#             rm "${filename}"
#             echo "${KATALOG}/latc_x86_64 ${filename}.lat && \"${filename}\""
#             echo "${filename}: ERROR"
#         else
#             echo "${filename}: OK"
#         fi
#     fi
# done
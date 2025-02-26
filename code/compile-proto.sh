#!/bin/bash
set -e
PROTOC=`which protoc`

mkdir -p proto-ts

echo "Using protoc at: $PROTOC"

TS_ARGS=('lowerCaseServiceMethods=true'
         'outputEncodeMethods=false'
         'outputJsonMethods=false'
         'outputClientImpl=false'
         'snakeToCamel=true'
         'avoidUnusedParameters=true'
         'disableStreaming=true')

echo "ts_proto_opts: $(IFS=, ; echo "${TS_ARGS[*]}")"

for f in ./proto/todo/v1/*.proto
do
  echo "Generate stubs for $f file"
  PROTOC --plugin=./node_modules/.bin/protoc-gen-ts_proto\
         --ts_proto_out=./generated\
         --proto_path=./proto\
         --ts_proto_opt="$(IFS=, ; echo "${TS_ARGS[*]}")"\
         "$f"
done

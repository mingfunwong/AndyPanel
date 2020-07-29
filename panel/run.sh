cd ./panel
cd ./client
yarn
yarn build
cd ..
rm -rf ./server/public
mv ./client/dist ./server/public
cd ./server
yarn
yarn build-ts
pm2-runtime ./dist/index.js
# yarn watch 
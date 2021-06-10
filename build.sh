cd frontend
yarn install
npm run build_and_copy
cd ../backend
yarn install
npm run build
npm run pack
mkdir -p src/public/build/static
cp -r src/public/build/static/media dist/backend/src/public/build/static/media
cp -r src/public/build/static/css dist/backend/src/public/build/static/css
cp src/public/build/* dist/backend/src/public/build/

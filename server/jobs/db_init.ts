const sh = require('shelljs')


console.log("Starting DB init")
sh.exec('npx prisma migrate reset --force', { silent: true }).output
console.log('DB is fully reseted and seeded')
console.log('Started pushing DB')

sh.exec('npx prisma db push --accept-data-loss', { silent: true }).output

console.log('DB is pushed')

//console.log('Starting server....')
//sh.exec('npm run start').output

const sh = require('shelljs')
import inquirer from 'inquirer'
import { createSpinner } from 'nanospinner'
import colors from 'colors'


const question = async (): Promise<Boolean> => {
  const foo = await inquirer.prompt({
    name: 'accepted',
    type: 'confirm',
    message: `Ez a művelet teljesen törli az adatbázist, illetve tartalmát. Biztosan szeretnéd folytatni?`,
    prefix: '❗️'
  })
  return foo.accepted
}

const init = async () => {
  try {
    const accepted = await question()

    if (accepted) {
      let spinner = createSpinner('Creating database...').start()
      try {
        sh.exec('npx prisma migrate reset --force').output //, { silent: true }
        spinner.success()
      } catch (error: any) {
        spinner.error()
        throw new Error(error);
      }

      spinner = createSpinner('Seed the database with demo records 🌱').start()
      try {
        sh.exec('npx prisma db push --accept-data-loss').output //, { silent: true }
        sh.exec('npm run db_demo_seed').output //, { silent: true }
        spinner.success()
      } catch (error: any) {
        spinner.error()
        throw new Error(error);
      }
      console.log(`Done! Run \'${colors.green('npm run start')}\' to start the server.`)

      process.exit(0)
    } else {
      process.exit(1)
    }

  } catch (error) {
    console.error(error)
  }
}

init()
import cron from 'node-cron'
import { autoGenerateScheduledMaintenances } from '../utils'

const EveryHour = '0 * * * *'
const EveryDayAt2AM = '0 2 * * *'
const Every10Sec = '*/10 * * * * *'
const RunWithServerStart = true

cron.schedule(EveryHour, function () {
  autoGenerateScheduledMaintenances()
})
if (RunWithServerStart) autoGenerateScheduledMaintenances() // to run when start the server
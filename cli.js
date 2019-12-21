require('yargs')
  .command(
    'create',
    'Creates a user',
    { uid: { type: 'string', description: 'User ID' } },
    async args => {
      const uid = args.uid || 'root'
      const admin = getAdmin()
      await admin.auth().createUser({
        uid,
        displayName: uid === 'root' ? 'Root user' : uid
      })
      console.log('Root user created')
      process.exit(0)
    }
  )
  .command(
    'token',
    'Returns a token for a user',
    { uid: { type: 'string', description: 'User ID' } },
    async args => {
      const uid = args.uid || 'root'
      const admin = getAdmin()
      const token = await admin.auth().createCustomToken(uid)
      console.log(token)
      process.exit(0)
    }
  )
  .demandCommand()
  .help()
  .strict()
  .parse()

function getAdmin() {
  var admin = require('firebase-admin')
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    throw new Error(
      'GOOGLE_APPLICATION_CREDENTIALS environment variable not found. ' +
        'Please set it to the path to the service account.'
    )
  }
  admin.initializeApp()
  return admin
}

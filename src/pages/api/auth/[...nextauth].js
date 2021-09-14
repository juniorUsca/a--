import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

/**
 * See all Next Auth configurations options at:
 * https://next-auth.js.org/configuration
 * @type {import('next-auth').NextAuthOptions}
 */
const options = {
  theme: 'light',
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET,
  session: {
    // Use JWT to manage sessions since we aren't using a Database
    jwt: true,
    maxAge: 60 * 15, // 15 min
  },
  // Secure cookies will be automatically determine
  // by NEXTAUTH_URL: true is https, false otherwise.
  // useSecureCookies: true,
  jwt: {
    encryption: true,
    encryptionKey: process.env.AUTH_JWT_ENCRYPTION_KEY,
    signingKey: process.env.AUTH_JWT_SIGNING_KEY,
  },
  callbacks: {
    /**
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile
     * @return {boolean|string}  Return `true` to allow sign in
     *                           Return `false` to deny access
     *                           Return `string` to redirect to (eg.: "/unauthorized")
     */
    signIn: async user => {
      const allowedUsers = ['juscah@hotmail.com']
      if (allowedUsers.find(e => e === user.email)) return true
      return false
    },
  },
  providers: [
    Providers.Credentials({
      id: 'vmas',
      name: 'Vende Mas',
      credentials: {
        username: {
          label: 'Usuario',
          type: 'text',
          placeholder: 'root',
        },
        password: {
          label: 'Clave',
          type: 'password',
        },
      },
      authorize: async credentials => {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/vmas`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const user = await res.json()
        if (res.ok && user) {
          return user
        }
        return null
      },
    }),
    Providers.AzureADB2C({
      // id: 'azure-active-directory', // el redireccionamiento depende del id
      name: 'Hotmail',
      tenantId: process.env.AZURE_AD_B2C_TENANT_ID,
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET,
      scope: 'offline_access User.Read',
      profile: profile => ({
        id: profile.id,
        name: profile.displayName,
        email: profile.mail || profile.userPrincipalName,
      }),
    }),
  ],
}

export default NextAuth(options)

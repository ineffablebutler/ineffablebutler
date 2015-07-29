if (process.env.ENV === 'production') {
  module.exports = {
    env: 'production',
    baseURL: 'https://munib.herokuapp.com',
    googleClientId: '926781525836-h1hh7ekpram4koj9c07pq34rr0bgu90b.apps.googleusercontent.com',
    googleClientSecret: 'FJXk2SYLWYSO1nebxMs6el9d',
    googleCb: 'http://munib.herokuapp.com/auth/google/callback',
    fbClientId: '1684524431776154',
    fbClientSecret: '469dc8ad6b2fc3c55881ffa410471d6a',
    fbCb: 'http://munib.herokuapp.com/auth/facebook/callback'
  };
} else {
  module.exports = {
    env: 'dev',
    baseURL: 'http://localhost:3000',
    googleClientId: '932957263221-f9gkphoajh2nd3lj1ehi125tflbm4l1l.apps.googleusercontent.com',
    googleClientSecret: 'dMLDuY6Bd0hss9XlcnxeV8vo',
    googleCb: 'http://localhost:3000/auth/google/callback',
    fbClientId: '109373739410044',
    fbClientSecret: '4c0aa4a077f9ddefa4feb466659a33ed',
    fbCb: 'http://localhost:3000/auth/facebook/callback'
  };
}
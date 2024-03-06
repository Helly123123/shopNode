import JwsStrategy from 'passport-jwt'
const JwsStr = JwsStrategy.Strategy
const ExtractJwt = JwsStrategy.ExtractJwt
import { jwtKey } from '../config/keys'
import passport from 'passport'

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKet: jwtKey 
}

export passport = passport => {
    passport.use(
        new.JwsStr(options, (payload, done) => {
            
        })  
    )
}
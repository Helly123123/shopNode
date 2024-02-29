import colors from 'colors'

export function requserTime(req, res, next) {
    req.requserTime = Date.now()

    next()
}

export function Logger(req, res, next) {
    console.log(colors.bgBlue.black(`req.time: ${req.requserTime}`))

    next()
}
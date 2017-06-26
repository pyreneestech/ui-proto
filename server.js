
let express = require('express')
let nib = require('nib')
let stylus = require('express-stylus')
let bodyParser = require('body-parser')
let path = require('path')
let coffeeScript = require('coffee-script')
let connectCoffeescript = require('connect-coffee-script')
let favicon = require('serve-favicon')


let app = express()

let compile = (str, options, coffeePath) => {
    options.bare = true;
    coffeeScript.compile(str, options)
}

app.use(connectCoffeescript({
    src: __dirname + '/public/js',
    dest: __dirname + '/public/js',
    compile: compile
}))

app.set("views", `${__dirname}/views`)
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(favicon(__dirname + '/public/favicon.ico'))

app.use(stylus({
    src: path.join(__dirname, 'public/css'),
    use: [nib()],
    import: ['nib']
}))

app.use(express.static('public'))


app.get('/:page/:subpage', (req, res) => {
    page = req.params.page
    subpage = req.params.subpage
    res.render(path.join(page, subpage))
})

app.get('/:page', (req, res) => {
    page = req.params.page
    res.render(page)
})

app.get('/', (req, res) => {
    res.render("index")
})


app.listen(8080, () =>
    console.log(`App running in ${__dirname}, listening on port 8080!`)
)


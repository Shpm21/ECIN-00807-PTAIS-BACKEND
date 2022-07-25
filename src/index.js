const express = require("express");

require("dotenv").config();

const app = express();

//middleware
app.use(express.json());

app.set('port', 9000);

app.listen(app.get('port'), () => {
    console.log(`Servidor en linea en el puerto ${app.get('port')}`);
});
//routes
app.use(require('./routes/student'));
app.use(require('./routes/career'));
app.use(require('./routes/course'));
app.use(require('./routes/person'));
app.use(require('./routes/studyplain'));
app.use(require('./routes/login'));
app.use(require('./routes/request'));
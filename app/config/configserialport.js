// const { SerialPort } = require('serialport')
// const { ReadlineParser } = require('@serialport/parser-readline')

// const port = new SerialPort({ path: 'COM3', baudRate: 115200,autoOpen:false })

// if(!port.isOpen) port.open();
// const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
// parser.on('data',(line)=> console.log(line))
// module.exports={port};
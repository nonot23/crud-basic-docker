const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const contacts = [
    {
        id: 1,
        name: 'Not',
        phone: '2055000'
        
    }, 

    {
        id: 2,
        name: 'NO',
        phone: '008888'
    },

    {
        id: 3,
        name: 'DO',
        phone: '5565656'
    }

]

app.get('/api/contacts', (req, res) => {
    res.json(contacts)
})

app.get('/api/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const contact = contacts.find(contact => contact.id === id)
    if (contact) {
        res.json(contact)
    } else {
        res.status(404).json( { message: 'ไม่มีชื่อรายชื่อผู้ติดต่อนี้'})
    }
})

app.post('/api/contacts' , (req, res) => {
    const newContact = {
        id: contacts.length + 1,
        name: req.body.name,
        phone: req.body.phone
    }
    if (newContact) {
        contacts.push(newContact)
        res.json(newContact)
    } else {
        res.status(404).json({ error: 'ไม่สามารถเพิ่มรายชื่อนี้ได้'})
    }
    
})

app.put('/api/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const updatedContact = {
        id: req.body.id,
        name: req.body.name,
        phone: req.body.phone
    }
    const index = contacts.findIndex(index => index.id === id)
    if (updatedContact ) {
        contacts[index] = updatedContact
        res.json(updatedContact)
    } else {
        res.status(404).json({ message: 'ไม่สามารถแก้ไขรายชื่อนี้ได้'})
    }
})

app.delete('/api/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = contacts.findIndex(index => index.id === id)
    if (index !== -1) {
        contacts.splice(index, 1)
        res.json(contacts)
    } else {
        res.status(404).json({ message: 'ไม่สามารถลบรายชื่อได้'})
    }
})

app.listen(port , (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log('listening on port ' + port)
    }
})
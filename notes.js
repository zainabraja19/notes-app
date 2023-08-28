const { default: chalk } = require('chalk')
const fs = require('fs')

const loadNotes = () => {
    try {
        const notesBuffer = fs.readFileSync('notes.json')
        const notes = JSON.parse(notesBuffer.toString())
        return notes
    }
    catch (err) {
        return []
    }
}

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.white.bold("Your notes.."))
    notes.forEach(note => { console.log(note.title) })
}

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find(note => {
        return note.title === title
    })

    if (duplicateNote.length === 0) {
        notes.push({
            title, body
        })

        saveNotes(notes)
        console.log(chalk.green.bold("New note added!"))
    } else {
        console.log(chalk.red.bold("Please enter a unique title!"))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    const remainingNotes = notes.filter(note => {
        return note.title !== title
    })

    if (remainingNotes.length === notes.length) {
        console.log(chalk.red.bold("Note not found"))
    } else {
        console.log(chalk.green.bold(`Note "${title}" deleted!`))
    }

    saveNotes(remainingNotes)
}

const readNote = title => {
    const notes = loadNotes()

    const selectedNote = notes.find(note => {
        return note.title === title
    })

    if (selectedNote.length === 0) {
        console.log(chalk.red.bold("Note not found"))
    } else {
        console.log(chalk.blue.bold(`Title: ${title}`))
        console.log(chalk.white.bold(selectedNote.body))
    }
}

module.exports = { addNote, removeNote, listNotes, readNote }
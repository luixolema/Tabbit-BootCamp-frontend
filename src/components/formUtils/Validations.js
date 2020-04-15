const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const germanDatePattern = /^([0-2]\d|3[01])\.([0]\d|1[0-2])\.\d{4}$/

export default {
    required: (message = 'This field is required') => (value) => {
        if (!value || value.match(/^ *$/) !== null) {
            return message
        }
        return true
    },
    maxLength: (max, message = 'The value is too long') => (value) => {
        if (value.length <= max) {
            return true
        }
        return message
    },
    minLength: (min, message = 'The value is too long') => (value) => {
        if (value.length >= min) {
            return true
        }
        return message
    },
    email: (message = 'Invalid Email') => (value) => {
        return emailPattern.test(value) || message
    },
    number: (min, max) => (value) => {
        if (!isNaN(value)) {
            return 'Invalid number'
        }

        if (min !== undefined && value < min) {
            return 'Provide a number longer than' + value
        }

        if (max !== undefined && value > max) {
            return 'Provide a number less than' + value
        }

        return true
    },
    date: (message = 'Invalid Date') => (value) => {
        return germanDatePattern.test(value) || message
    },
}

const validations = {
    required: (message = 'This field is required') => (value) => {
        if (value === undefined || value === '') {
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
}

export default validations

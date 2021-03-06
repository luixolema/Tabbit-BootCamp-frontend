const emailPattern = /^[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/
const germanDatePattern = /^([0-2]\d|3[01])\.([0]\d|1[0-2])\.\d{4}$/

export default {

    required: (message = 'This field is required') => (value) => {
        if (!value || String(value).match(/^ *$/) !== null) {
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
    minLength: (min, message = 'The value is too short') => (value) => {
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
    checkPositiveNumber: (message = 'Value cannot be negative') => (value) => {
        if (value >= 0) {
            return true
        }
        return message
    },
    checkDateNotInFuture: (nameOfDateField) => (value) => {
        if (!value || String(value).match(/^ *$/) !== null) {
            return true
        }

        if (!germanDatePattern.test(value)) {
            return true
        }

        var today = (new Date()).setHours(0, 0, 0, 0)
        function germanTimeStringtoIsoString (germanTimeString) {
            var parts = germanTimeString.match(/(\d+)/g)
            return new Date(parts[2], parts[1] - 1, parts[0] - (-1)).toISOString().substr(0, 10)
          }

        if (nameOfDateField === 'lastDiveDate') {
            if (new Date(germanTimeStringtoIsoString(value)) > today) {
                return 'Last Dive Date cannot be in the future'
            }
        } else if (nameOfDateField === 'birthDate') {
            if (new Date(germanTimeStringtoIsoString(value)) >= today) {
                return 'Birth Date has to be before today'
            }
        }
        return true
    },
    validateStayDates: (stayData, nameOfDateField) => (value) => {
        function getStayDateFromString (stayData, nameOfDateField) {
            if (stayData.stayDetails[nameOfDateField]) {
                return new Date(germanTimeStringtoIsoString(stayData.stayDetails[nameOfDateField]))
            } else {
                return null
            }
        }

        function germanTimeStringtoIsoString (germanTimeString) {
            var parts = germanTimeString.match(/(\d+)/g)
            return new Date(parts[2], parts[1] - 1, parts[0] - (-1)).toISOString().substr(0, 10)
          }

        if (!value || String(value).match(/^ *$/) !== null) {
            return true
        }

        if (!germanDatePattern.test(value)) {
            return true
        }

        var arriveDate = getStayDateFromString(stayData, 'arriveDate')
        var leaveDate = getStayDateFromString(stayData, 'leaveDate')
        var checkInDate = getStayDateFromString(stayData, 'checkInDate')
        var checkOutDate = getStayDateFromString(stayData, 'checkOutDate')
        var valueDate = new Date(germanTimeStringtoIsoString(value))
        var today = (new Date()).setHours(0, 0, 0, 0)

        if (nameOfDateField === 'checkInDate') {
            if (arriveDate !== null) {
                if (arriveDate > valueDate) {
                    return 'Check In Date has to be equal or more then Arrive Date'
                }
            }
            if (leaveDate !== null) {
                if (leaveDate < valueDate) {
                    return 'Check In Date has to be equal or less then Leave Date'
                }
            }
            if (checkOutDate !== null) {
                if (checkOutDate < valueDate) {
                    return 'Check In Date has to be equal or less then Check Out Date'
                }
            }
            return true
        } else if (nameOfDateField === 'checkOutDate') {
            if (arriveDate !== null) {
                if (arriveDate > valueDate) {
                    return 'Check Out Date has to be equal or more then Arrive Date'
                }
            }
            if (leaveDate !== null) {
                if (leaveDate < valueDate) {
                    return 'Check Out Date has to be equal or less then Leave Date'
                }
            }
            if (checkInDate !== null) {
                if (checkInDate > valueDate) {
                    return 'Check Out Date has to be equal or more then Check In Date'
                }
            }
            return true
        } else if (nameOfDateField === 'arriveDate') {
            if (leaveDate !== null) {
                if (leaveDate < valueDate) {
                    return 'Arrive Date has to be equal or less then Leave Date'
                }
            }
            if (checkInDate !== null) {
                if (checkInDate < valueDate) {
                    return 'Arrive Date has to be equal or less then Check In Date'
                }
            }
            if (checkOutDate !== null) {
                if (checkOutDate < valueDate) {
                    return 'Arrive Date has to be equal or less then Check Out Date'
                }
            }
        } else if (nameOfDateField === 'leaveDate') {
            if (arriveDate !== null) {
                if (arriveDate > valueDate) {
                    return 'Leave Date has to be equal or more then Arrive Date'
                }
            }
            if (checkInDate !== null) {
                if (checkInDate > valueDate) {
                    return 'Leave Date has to be equal or more then Check In Date'
                }
            }
            if (checkOutDate !== null) {
                if (checkOutDate > valueDate) {
                    return 'Leave Date has to be equal or more then Check Out Date'
                }
            }
            if (today > valueDate) {
                return 'Leave Date cannot be in the past'
            }
        }
        return true
    },
}

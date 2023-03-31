// check if string is a valid email address
export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export function validateInput(input, validator, errorMessage) {
    const isValid = validator(input);
    return {
        success: isValid,
        ...(isValid && { data: input }),
        ...(!isValid && { error: errorMessage })
    };
}

export function validateNoteId(id) {
    return validateInput(id, (id) => id > 0 && id <= notes.length, 'id must be a valid note id.');
}
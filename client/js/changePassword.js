const passwordForm = document.querySelector('.change_password')

passwordForm.addEventListener("submit", changePassword)

function changePassword(e) {
    e.preventDefault()

    const currentPassword = e.target[0].value
    const newPassword = e.target[1].value

    changePasswordInDB(currentPassword, newPassword)
}

async function changePasswordInDB(currentPassword, newPassword) {
    const userid = localStorage.getItem('userid')
    
    //get request to find the current password
    //response = await fetch(`localhost3000`)

    const response = {password: currentPassword}

    if (response.password === currentPassword) {
        const options = {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
            password: newPassword
        })
        }

        updatedPassword = await fetch(`http://localhost:3000/user/${userid}`, options)

        //take you back to accounts page
    } else {
        throw new Error('The password could not be changed.')
    }
}
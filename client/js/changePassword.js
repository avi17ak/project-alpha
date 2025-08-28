const passwordForm = document.querySelector('.change_password')

passwordForm.addEventListener("submit", changePassword)

function changePassword(e) {
    e.preventDefault()

    const currentPassword = e.target[0].value
    const newPassword = e.target[1].value

    changePasswordInDB(currentPassword, newPassword)

    //reassign empty values for the form
    e.target[0].value = ""
    e.target[1].value = ""
}

async function changePasswordInDB(currentPassword, newPassword) {
    const userid = localStorage.getItem('userid')
    
    try {
        //  const options = {
        //     method: "GET",
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json",
        //         Authorization: localStorage.getItem("token"),
        //     }
        //     }

        // //get request to find the current password
        // response = await fetch(`http://localhost:3000/user/${userid}`,options)
        // data2 = await response.json()
        
        // const match = await bcrypt.compare(currentPassword, data2.password);
        // console.log(match);

        const match = true
        if (match) {
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
            alert('Successfully changed password!');
            window.location.assign("../accountpage.html");

        } else {
            throw new Error('The password could not be changed.')
        }

    } catch (err) {
        alert('The password could not be changed.');
        throw new Error('The password could not be changed.')
    }
}
    
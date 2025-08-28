const usernameForm = document.querySelector('.change_email')

emailForm.addEventListener("submit", changeEmail)

function changeEmail(e) {
    e.preventDefault()

    const currentEmail = e.target[0].value
    const newEmail = e.target[1].value

    changeEmailInDB(currentEmail, newEmail)
    // Redirect after saving
    e.target[0].value = ""
    e.target[1].value = ""
    

   
}

async function changeEmailInDB(currentEmail, newEmail) {
    const userid = localStorage.getItem('userid')
    try{
    const options = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        }
        }
    //get request to find the current password
    response = await fetch(`http://localhost:3000/user/${userid}`,options)
    data2 = await response.json()

    // const response = {email: currentEmail}

    if (data2.email === currentEmail) {
        const options = {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
            email: newEmail
        })
        }

        updatedEmail = await fetch(`http://localhost:3000/user/${userid}`, options)
        alert('Successfully changed email! ');
        window.location.assign("../accountpage.html");

        //take you back to accounts page
    } else {
        throw new Error('The email could not be changed.')
        
    }
}catch (err){
    alert('You are not authorised to change thi email.');
    throw new Error ('You are not authorised to change thi email')
}
}
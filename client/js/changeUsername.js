// const usernameForm = document.querySelector('.change_username')

// usernameForm.addEventListener("submit", changeUsername)

// function changeUsername(e) {
//     e.preventDefault()

//     const currentUsername = e.target[0].value
//     const newUsername = e.target[1].value

//     changeUsernameInDB(currentUsername, newUsername)
//     //Clearing values upon entry
//     e.target[0].value = ""
//     e.target[1].value = ""
   
// }

// async function changeUsernameInDB(currentUsername, newUsername) {
//     const userid = localStorage.getItem('userid')
//     try{
//     const options = {
//         method: "GET",
//         headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json",
//             Authorization: localStorage.getItem("token"),
//         }
//         }
//     //get request to find the current password
//     response = await fetch(`http://localhost:3000/user/${userid}`,options)
//     data2 = await response.json()
//     console.log(data2)

//     // const response = {email: currentEmail}

//     if (data2.username === currentUsername) {
//         const options = {
//         method: "PATCH",
//         headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json",
//             Authorization: localStorage.getItem("token"),
//         },
//         body: JSON.stringify({
//             username: newUsername
//         })
//         }

//         updatedUsername = await fetch(`http://localhost:3000/user/${userid}`, options)
//         // Redirect after saving
//         alert('Successfully changed Username! ');
//         //take you back to accounts page
//         window.location.assign("../accountpage.html");

        
//     } else {
//         throw new Error('The Username could not be changed.')
        
//     }
// }catch (err){
//     alert('You are not authorised to change this Username.');
//     throw new Error ('You are not authorised to change this Username')
// }
// }
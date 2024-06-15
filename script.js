
let otherUsers = [];

document.getElementById('profileButton').addEventListener('click', () => {
    const profileDiv = document.getElementById('profile');
    profileDiv.classList.toggle('hidden');
    if (!profileDiv.classList.contains('hidden')) {
        displayProfile();
    }
});

document.getElementById('editProfileButton').addEventListener('click', () => {
    document.getElementById('editProfile').classList.toggle('hidden');
});

document.getElementById('saveProfileButton').addEventListener('click', updateProfile);
document.getElementById('addUserButton').addEventListener('click', addUser);

document.getElementById('saveEditButton').addEventListener('click', saveEdit);
document.querySelector('.close-button').addEventListener('click', closeModal);

function displayProfile() {
    document.getElementById('username').textContent = `Username: ${userProfile.username}`;
    document.getElementById('email').textContent = `Email: ${userProfile.email}`;
    displayUsers();
}

function updateProfile() {
    const newUsername = document.getElementById('newUsername').value;
    const newEmail = document.getElementById('newEmail').value;

    if (newUsername) userProfile.username = newUsername;
    if (newEmail) userProfile.email = newEmail;

    alert('Profile updated successfully');
    displayProfile();
    document.getElementById('editProfile').classList.add('hidden');
}

function addUser() {
    const username = document.getElementById('addUsername').value;
    const email = document.getElementById('addEmail').value;

    if (username && email) {
        const newUser = { username, email };
        otherUsers.push(newUser);
        displayUsers();
        document.getElementById('addUsername').value = '';
        document.getElementById('addEmail').value = '';
    } else {
        alert('Please enter both username and email');
    }
}

function displayUsers() {
    const userList = document.getElementById('users');
    userList.innerHTML = '';
    otherUsers.forEach((user, index) => {
        const li = document.createElement('li');
        li.textContent = `${user.username} (${user.email})`;
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => openEditModal(index));
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteUser(index));
        li.appendChild(editButton);
        li.appendChild(deleteButton);
        userList.appendChild(li);
    });
}

function openEditModal(index) {
    document.getElementById('editUsername').value = otherUsers[index].username;
    document.getElementById('editEmail').value = otherUsers[index].email;
    document.getElementById('saveEditButton').dataset.index = index;
    document.getElementById('editModal').classList.remove('hidden');
}

function saveEdit() {
    const index = document.getElementById('saveEditButton').dataset.index;
    const newUsername = document.getElementById('editUsername').value;
    const newEmail = document.getElementById('editEmail').value;

    if (newUsername && newEmail) {
        otherUsers[index].username = newUsername;
        otherUsers[index].email = newEmail;
        displayUsers();
        closeModal();
    } else {
        alert('Both username and email are required');
    }
}

function deleteUser(index) {
    otherUsers.splice(index, 1);
    displayUsers();
}

function closeModal() {
    document.getElementById('editModal').classList.add('hidden');
}

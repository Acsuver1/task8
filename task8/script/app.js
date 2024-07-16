document.addEventListener('DOMContentLoaded', () => {
    const rooms = Array(15).fill(false); 
    const luxRooms = [5, 10, 15]; 
    const guestForm = document.getElementById('guestForm');
    const guestList = document.getElementById('guestList');
    const roomSelect = document.getElementById('room');

    // Xonalarni selectga qo'shish
    function updateRoomOptions() {
        roomSelect.innerHTML = '';
        rooms.forEach((booked, index) => {
            const option = document.createElement('option');
            option.value = index + 1;
            option.textContent = `Xona ${index + 1}`;
            if (booked) {
                option.disabled = true;
            }
            if (luxRooms.includes(index + 1)) {
                option.classList.add('lux-room');
                option.textContent += ' (Lux)';
            }
            roomSelect.appendChild(option);
        });
    }

    
    guestForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const age = parseInt(document.getElementById('age').value);
        const maritalStatus = document.getElementById('maritalStatus').value;
        const paymentMethod = document.getElementById('paymentMethod').value;
        const room = parseInt(document.getElementById('room').value);

        if (age < 18) {
            alert('Yoshi 18 dan katta bo\'lmagan mijoz xona band qila olmaydi Uzr=)!');
            return;
        }

        if (rooms[room - 1]) {
            alert('Bu xona band qilingan!');
            return;
        }

        rooms[room - 1] = true;
        addGuestToList(name, age, maritalStatus, paymentMethod, room);
        updateRoomOptions();
        guestForm.reset();
    });

    
    function addGuestToList(name, age, maritalStatus, paymentMethod, room) {
        const li = document.createElement('li');
        li.textContent = `${name} (${age} yosh, ${maritalStatus} marital, ${paymentMethod}, Xona: ${room})`;
        if (luxRooms.includes(room)) {
            li.classList.add('lux-room');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'O\'chirish';
        deleteButton.addEventListener('click', () => {
            rooms[room - 1] = false;
            li.remove();
            updateRoomOptions();
        });

        li.appendChild(deleteButton);
        guestList.appendChild(li);
    }

    updateRoomOptions();
});

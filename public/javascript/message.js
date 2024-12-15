const create_message = async () => {
    const response = await fetch('/message/', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/x-www-form-urlencoded',                 
           'Accept': '*/*' 
        },  
        body: new URLSearchParams({
            'message':document.getElementById('form-message').value,
        })
    });

    const json = await response.json();

    if (json.status) {
        get_message();
        document.getElementById('form-message').value = '';
    }
};

const get_message = async () => {
    const response = await fetch('/message/new-message');
    const json = await response.json();

    if (json.status) {
        const cb = document.getElementById('chat-box');
        cb.innerHTML = '';

        let data = '';

        json.data.forEach(element => {
            data += `<div class="m-box">
                <div class="t">${element.account}</div>
                <div class="m">${element.message}</div>
            </div>`;
        });

        cb.innerHTML = data;
    }
}
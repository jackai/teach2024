const create_message = async () => {
    const response = await fetch('/message/', {
        method: 'POST',
        body: JSON.stringify({ message: "example" }),
    });

    const json = await response.json();

    console.log(json);
};

const get_message = async () => {
    const response = await fetch('/message/new-message');
    const json = await response.json();

    console.log(json);
}
async function delete_cookie() {
    document.cookie = "notesapp =; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export default delete_cookie;
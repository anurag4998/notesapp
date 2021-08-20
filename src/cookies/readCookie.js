async function readCookie() {
    let cookies = document.cookie.split("; ");
    const loggedIn = cookies.find((cookies) =>
      cookies.startsWith("notesapp")
    );
    if (loggedIn) {
      return { loggedIn: true };
    } else return { loggedIn: false };
  }
  
  export default readCookie;
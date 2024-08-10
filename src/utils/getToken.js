import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: '/'});
export let token=cookies.get('token')
export let userId=cookies.get('userId')
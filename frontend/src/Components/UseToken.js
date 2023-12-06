import { useState , useEffect} from 'react';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  }

  function getName(){
    const userName = localStorage.getItem('name');
    return userName && userName
  }

  const [token, setToken] = useState(getToken());
  const [name , setName] = useState("");

  useEffect(() => {
    // Set the token from local storage when the component mounts
    const token = getToken();
    const name = getName();
    if (token) {
      setToken(token);
      saveToken(token);
      setName(name);
      saveName(name);
    }
  }, []);

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  function saveName(userName){
    localStorage.setItem('name' , userName );
    setName(userName);
  }

  function removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setToken(null);
    setName("");
  }

  return {
    setToken: saveToken,
    token,
    name,
    setName: saveName,
    removeToken
  }

}

export default useToken;
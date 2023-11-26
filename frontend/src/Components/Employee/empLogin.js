import React , {useState , useEffect} from "react";
import axios from "axios";

export default function EmpReg(props){

    const [username , setUserName] = useState('');
    const [pass , setPass] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          props.setToken(token);
        }
    }, []);

    function AdminLogin(e){
        e.preventDefault();
        axios.post('http://24.199.101.67:8080/admin/login' ,{
            username: username,
            password: pass,
        })
        .then(function (resp) {
            const token = resp.data.access_token;
            props.setToken(token);
            if (token){
                alert ("Login Success!");
                setUserName('');
                setPass('');
                window.location.href = "/Admin/Booking";
            }
            else{
                alert("Wrong Credetials");
                setUserName('');
                setPass('');
            }
        })
    };

    return (
        <div className="min-h-screen p-4 font-Roboto font-semibold overflow-hidden overscroll-y-none bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 overscroll-none">
            <div className="md:mt-24 grid md:grid-cols-2 grid-cols-1 gap-6 m-auto bg-white rounded-lg shadow-md max-w-4xl max-h-full ">
                <div className=" bg-sky-200 hidden md:flex md:flex-col md:items-center md:justify-center">
                    <button className=" w-[200px] font-Roboto py-3 rounded-full bg-white">Sign Up</button>
                </div>
                <div className=" px-6 py-12 md:px-6 md:py-24">
                    <h1 className="text-xl italic text-center text-sky-700 underline">
                        Sign in
                    </h1>
                    <form className="mt-6">
                        <div className="mb-3">
                            <label for="username" className="block text-md text-gray-800">username</label>
                            <input value={username} onChange={(e) => setUserName(e.target.value)} type="username" name="username" className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                        </div>
                        <div className="mb-3">
                            <label for="pass" className="block text-md text-gray-800">password</label>
                            <input value={pass} onChange={(e) => setPass(e.target.value)} name="pass" type="password" className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                        </div>
                        <div className="mt-6">
                            <button onClick={AdminLogin} className="w-full text-md px-4 py-2 tracking-wide text-black border-2 border-sky-200 hover:bg-sky-200 hover:text-white rounded-full transition-colors duration-200 transform  focus:outline-none ">
                                Login
                            </button>
                        </div>
                    </form>                    
                </div>
            </div>
        </div>
    );
};
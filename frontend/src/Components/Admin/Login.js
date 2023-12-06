import React , {useState , useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook , faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";

export default function Login(props){
    const [username , setUserName] = useState('');
    const [pass , setPass] = useState('');
    const [isClickSignUp , setClickSignUp] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token){
            props.setToken(token);
        }
    })

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          props.setToken(token);
        }
    }, []);

    function AdminLogin(e){
        e.preventDefault();
        if (username === '' && pass === ''){
            alert("Please Enter Missing Information");
        }
        else{
            axios.post(`${process.env.REACT_APP_API_URL}/admin/login` ,{
                username: username,
                password: pass,
            })

            .then(function (resp) {
                const token = resp.data.access_token;
                props.setToken(token);
                props.name(username);
                if (token){
                    alert (resp.data.msg);
                    setUserName('');
                    setPass('');
                    window.location.href = "/Admin/Main";
                }
                else{
                    alert(resp.data.msg);
                    setUserName('');
                    setPass('');
                }
            })
        }
    };

    function AdminRegister(e){
        e.preventDefault();
        if (username === '' && pass === ''){
            alert("Please Enter Missing Information");
        }else{
            axios.post(`${process.env.REACT_APP_API_URL}/admin/register` ,{
                username: username,
                password: pass,
            })

            .then(function (resp) {
                const token = resp.data.access_token;
                props.setToken(token);
                if (token){
                    alert (resp.data.msg);
                    setUserName('');
                    setPass('');
                    window.location.href = "/Admin/Main";
                }
                else{
                    alert(resp.data.msg);
                    setUserName('');
                    setPass('');
                }
            })
        }
    };

    return (
        <div className="min-h-screen p-4 font-Roboto font-semibold overflow-hidden overscroll-y-none bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 overscroll-none">
            <div className="md:mt-24 grid md:grid-cols-2 grid-cols-1 gap-6 m-auto bg-white rounded-lg shadow-md max-w-4xl max-h-full ">
                <div className={`bg-center cursor-pointer bg-cover ${!isClickSignUp? "bg-bgtest" : "bg-bgtest2"} bg-no-repeat hidden md:flex md:flex-col md:items-center md:justify-center`}>
                </div>
                <div className=" px-6 py-12 md:px-6 md:py-24">
                    <div className=" space-y-4">
                        <h1 className="text-xl italic text-center text-sky-700 underline">
                            {!isClickSignUp ? 'Sign In' : 'Sign Up'}
                        </h1>
                        <div className="flex cursor-pointer justify-center space-x-4">
                            <FontAwesomeIcon className=" text-2xl text-sky-300" icon={faFacebook} />
                            <FontAwesomeIcon className=" text-2xl text-rose-300" icon={faInstagram} />
                            <FontAwesomeIcon className=" text-2xl text-sky-600" icon={faTwitter} />

                        </div>
                    </div>
                    <div className=" space-y-4">
                        <form className="mt-5">
                            <div className="mb-3">
                                <label for="username" className="block text-md text-gray-800">username</label>
                                <input value={username} onChange={(e) => setUserName(e.target.value)} type="username" name="username" className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                            </div>
                            <div className="mb-3">
                                <label for="pass" className="block text-md text-gray-800">password</label>
                                <input value={pass} onChange={(e) => setPass(e.target.value)} name="pass" type="password" className="block w-full px-4 py-2 mt-2 text-sky-700 bg-white border rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                            </div>
                            <div className="mt-6">
                                {!isClickSignUp?
                                    (<button onClick={AdminLogin} className="w-full text-md px-4 py-2 tracking-wide text-black border-2 border-sky-200 hover:bg-sky-200 hover:text-white rounded-full transition-colors duration-200 transform  focus:outline-none ">
                                        Log In
                                    </button>):
                                    (<button onClick={AdminRegister} className="w-full text-md px-4 py-2 tracking-wide text-black border-2 border-sky-200 hover:bg-sky-200 hover:text-white rounded-full transition-colors duration-200 transform  focus:outline-none ">
                                        Register
                                    </button>)
                                }
                            </div>
                        </form>    
                        <button onClick={() => setClickSignUp(prevState => !prevState)} className=" w-full text-md px-4 py-2 tracking-wide text-black border-2 border-sky-200 hover:bg-sky-200 hover:text-white rounded-full transition-colors duration-200 transform  focus:outline-none ">
                            {!isClickSignUp ? 'Sign Up' : 'Sign In'}
                        </button>          
                    </div>      
                </div>
            </div>
        </div>
        
    );
};
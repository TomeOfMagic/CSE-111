import React , {useEffect , useState} from "react";
import axios from "axios";
import { Checkbox } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashArrowUp} from "@fortawesome/free-solid-svg-icons";
import Popup from "../../PopupForm";

export default function CustomerPage(props){

    const [data , setData] = useState([]);

    const [isOpen , setIsOpen] = useState(true);

    const [id , setId] = useState(0);

    const [employ_fname , setEmployfn] = useState("");

    const [employ_lname , setEmployln] = useState("");

    const [employ_phone , setEmployph] = useState("");

    const [method , setMethod] = useState("");


    const [dataSubmit, setdataSubmit] = useState(false);

    function OpenNav(index , name){
        if (name === 'update'){

            setIsOpen(!isOpen);
            setId(data[index].customerID);
            setEmployfn(data[index].custUser)
            setEmployln(data[index].custPass);
            setEmployph(data[index].reward);
            setMethod("update")

        }
        else{
            setIsOpen(!isOpen);
            setId(null);
            setEmployln("")
            setEmployfn("");
            setEmployph("");
            setMethod("add")
        }
    }

    function getData(){
        axios.get(`${process.env.REACT_APP_API_URL}/admin/customer` ,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${props.token}`
                },
            }
        )
        .then((resp) => {
            const res = resp.data
            res.access_token && props.setToken(res.access_token);
            setData(res.data);
        })
        .catch(function(error){
            console.log(error);
            window.location.href = "/Login";
        });
    }

    useEffect(() => {
        getData();
    } , [dataSubmit]);

    return (
        <>
            <div className="p-12 space-y-6 h-screen w-full overscroll-x-none">
                <h1 className="text-black font-Roboto font-bold text-3xl">Customer</h1>
                    <table className="w-full h-fit rounded-lg shadow-xl  text-justify">
                        <thead className="">
                            <tr className="border-b-2">
                                <th scope="col">
                                    <Checkbox className="h-5 w-8 border-gray-900/20 bg-gray-900/10"/>
                                </th>
                                <th scope="col" className="font-serif font-light px-6 py-4">Username</th>
                                <th scope="col" className="font-serif font-light px-6 py-4">Password</th>
                                <th scope="col" className="font-serif font-light px-6 py-4">Rewards</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, index) => {
                                return (
                                    <tr className="border-b-2 text-md hover:bg-gray-200" key={index}>
                                        <td className="whitespace-nowrap py-4">
                                            <Checkbox className="h-5 w-8 border-gray-900/20 bg-gray-900/10"/>
                                        </td>
                                        <td className="whitespace-nowrap font-medium px-6 py-4">{d.custUser}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{d.custPass}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{d.reward}</td>
                                        <td>
                                            <div className=" flex gap-6">
                                                <button onClick={() => OpenNav(index , "update")} className=" w-[100px] bg-gray-200 shadow-md space-x-2 h-[40px]">
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                    <span>Edit</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                <div className=" flex justify-center">
                    <button onClick={() => OpenNav(0 , "add")} className=" w-[250px] py-2 bg-sky-300 text-xl rounded-full shadow-lg hover:opacity-50 text-white">
                        <span>Add Customer</span>
                    </button>
                </div>
            </div>
            <Popup 
                isOpen = {isOpen} 
                setIsOpen = {setIsOpen}
                name = "customer"
                id = {id} 
                setId = {setId} 
                employ_fname = {employ_fname}
                setEmployfn = {setEmployfn}
                employ_lname = {employ_lname}
                setEmployln = {setEmployln}
                employ_phone = {employ_phone}
                setEmployph = {setEmployph}
                token = {props.token}
                setToken = {props.setToken}
                dataSubmit = {dataSubmit}
                setdataSubmit = {setdataSubmit}
                method = {method}
                setMethod = {setMethod}
            />
        </>
    );
};
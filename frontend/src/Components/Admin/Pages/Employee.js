import React , {useEffect , useState} from "react";
import axios from "axios";
import { Checkbox } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";
import Popup from "../../PopupForm";

export default function EmployeePage(props){

    const [data , setData] = useState([]);

    const [isOpen , setIsOpen] = useState(true);

    const [id , setId] = useState(0);

    const [employ_fname , setEmployfn] = useState("");

    const [employ_lname , setEmployln] = useState("");

    const [employ_Hours , setEmployhr] = useState(0);

    const [employ_phone , setEmployph] = useState("");

    const [tip_amount , setTipAmount] = useState("");

    const [payrate , setPayRate] = useState("");

    const [dataSubmit, setdataSubmit] = useState(false);


    function OpenNav(index){
        setIsOpen(!isOpen);
        setId(data[index].employID);
        setEmployfn(data[index].employ_fname);
        setEmployln(data[index].employ_lname);
        setEmployhr(data[index].employ_Hours);
        setEmployph(data[index].employ_phone);
        setTipAmount(data[index].tip_amount);
        setPayRate(data[index].hourly_rate);
    }

    function getData(){
        axios.get(`${process.env.REACT_APP_API_URL}/admin/employee` ,
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
                <h1 className="text-black font-Roboto font-bold text-3xl">Employee</h1>
                    <table className="w-full h-fit rounded-lg shadow-xl  text-justify">
                        <thead className="">
                            <tr className="border-b-2">
                                <th scope="col">
                                    <Checkbox className="h-5 w-8 border-gray-900/20 bg-gray-900/10"/>
                                </th>
                                <th scope="col" className="font-serif font-light px-6 py-4">First Name</th>
                                <th scope="col" className="font-serif font-light px-6 py-4">Last Name</th>
                                <th scope="col" className="font-serif font-light px-6 py-4">Phone</th>
                                <th scope="col" className="font-serif font-light px-6 py-4">Hours</th>
                                <th scope="col" className="font-serif font-light px-6 py-4">Pay/Hr</th>
                                <th scope="col" className="font-serif font-light px-6 py-4">Tip</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, index) => (
                                <tr className="border-b-2 text-md hover:bg-gray-200" key={index}>
                                    <td className="whitespace-nowrap py-4">
                                        <Checkbox className="h-5 w-8 border-gray-900/20 bg-gray-900/10"/>
                                    </td>
                                    <td className="whitespace-nowrap font-medium px-6 py-4">{d.employ_fname}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{d.employ_lname}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{d.employ_phone}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{d.employ_Hours}</td>
                                    <td className="whitespace-nowrap px-6 py-4">${d.hourly_rate}</td>
                                    <td className="whitespace-nowrap px-6 py-4">${d.tip_amount}</td>

                                    <td>
                                        <div className=" flex gap-6">
                                            <button onClick={() => OpenNav(index)} className=" w-[100px] bg-gray-200 shadow-md space-x-2 h-[40px]">
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                                <span>Edit</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>
            <Popup 
                isOpen = {isOpen} 
                setIsOpen = {setIsOpen} 
                id = {id} 
                setId = {setId} 
                employ_fname = {employ_fname}
                setEmployfn = {setEmployfn}
                employ_lname = {employ_lname}
                setEmployln = {setEmployln}
                employ_Hours = {employ_Hours}
                setEmployhr = {setEmployhr}
                employ_phone = {employ_phone}
                setEmployph = {setEmployph}
                tip_amount = {tip_amount}
                setTipAmount = {setTipAmount}
                payrate = {payrate}
                setPayRate = {setPayRate}
                token = {props.token}
                setToken = {props.setToken}
                dataSubmit = {dataSubmit}
                setdataSubmit = {setdataSubmit}
                name = "employee"
            />
        </>
    );
};
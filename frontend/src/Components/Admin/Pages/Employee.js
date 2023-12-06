import React , {useEffect , useState} from "react";
import axios from "axios";
import { Checkbox } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function EmployeePage(props){

    const [data , setData] = useState([]);

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

    const DeleteBtn = (id , name) => {
        const isconfirm = window.confirm("Are you sure you want to delete this employee ? ");
        if (isconfirm){
            axios.delete(`${process.env.REACT_APP_API_URL}/admin/employee` , {
                data: {id:id},
                withCredentials: true,
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${props.token}`
                },
            })
            .then((resp) => {
                alert(resp.data.msg);
                setData(data.filter(item => item.name !== name));
            })
        }
    }

    useEffect(() => {
        getData();
    } , []);

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
                                    <td className="whitespace-nowrap px-6 py-4">{d.employ_fname}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{d.employ_lname}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{d.employ_phone}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{d.employ_Hours}</td>
                                    <td className="whitespace-nowrap px-6 py-4">${d.hourly_rate}</td>
                                    <td className="whitespace-nowrap px-6 py-4">${d.tip_amount}</td>

                                    <td>
                                        <div className=" flex gap-6">
                                            <button className=" w-[100px] bg-gray-200 shadow-md space-x-2 h-[40px]">
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
        </>
    );
};
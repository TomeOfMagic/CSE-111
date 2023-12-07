import React , {useEffect , useState} from "react";
import axios from "axios";
import { Checkbox } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashArrowUp} from "@fortawesome/free-solid-svg-icons";
import Popup from "../../PopupForm";

export default function ServicesPage(props){

    const [data , setData] = useState([]);

    const [isOpen , setIsOpen] = useState(true);

    const [id , setId] = useState(0);

    const [employ_fname , setEmployfn] = useState("");

    const [employ_lname , setEmployln] = useState("");

    const [employ_phone , setEmployph] = useState("");

    const [dataSubmit, setdataSubmit] = useState(false);

    function OpenNav(index){
        setIsOpen(!isOpen);
        setId(data[index].serviceID);
        setEmployln(data[index].description)
        setEmployfn(data[index].nameservice);
        setEmployph(data[index].price);
    }

    function getData(){
        axios.get(`${process.env.REACT_APP_API_URL}/admin/services` ,
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

    const deleteBtn = (id , name) => {

        const isConfirmed = window.confirm(`Are you sure ypu want to delete ${name}`);

        if (isConfirmed){
            axios.delete(`${process.env.REACT_APP_API_URL}/admin/services` , {
                withCredentials : true,
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: `Bearer ${props.token}`
                },
                data: {
                    id: id
                }
            })
            .then((resp) => {
                alert(resp.data.msg);
                setData(data.filter(item => item.nameservice !== name))
            })
        };

    };

    useEffect(() => {
        getData();
    } , [dataSubmit]);

    return (
        <>
            <div className="p-12 space-y-6 h-screen w-full overscroll-x-none">
                <h1 className="text-black font-Roboto font-bold text-3xl">Services</h1>
                    <table className="w-full h-fit rounded-lg shadow-xl  text-justify">
                        <thead className="">
                            <tr className="border-b-2">
                                <th scope="col">
                                    <Checkbox className="h-5 w-8 border-gray-900/20 bg-gray-900/10"/>
                                </th>
                                <th scope="col" className="font-serif font-light px-6 py-4">Service Name</th>
                                <th scope="col" className="font-serif font-light px-6 py-4">Description</th>
                                <th scope="col" className="font-serif font-light px-6 py-4">Price</th>
                                <th scope="col" className="font-serif font-light px-6 py-4">Active Employer</th>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map((d, index) => {

                                return (
                                    <tr className="border-b-2 text-md hover:bg-gray-200" key={index}>
                                        <td className="whitespace-nowrap py-4">
                                            <Checkbox className="h-5 w-8 border-gray-900/20 bg-gray-900/10"/>
                                        </td>
                                        <td className="whitespace-nowrap font-medium px-6 py-4">{d.nameservice}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{d.description}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{d.price}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className=" flex gap-2 items-center">
                                                
                                                {d.status !== null?
                                                    (
                                                        <>
                                                            <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                                                            <div>{d.status}</div>
                                                        </>
                                                    ): (
                                                        
                                                        <>
                                                            <div className="h-2.5 w-2.5 rounded-full bg-red-400 mr-2"></div>
                                                            <div>{d.status}</div>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </td>

                                        <td>
                                            <div className=" flex gap-6">
                                                <button onClick={() => OpenNav(index)} className=" w-[100px] bg-gray-200 shadow-md space-x-2 h-[40px]">
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                    <span>Edit</span>
                                                </button>
                                                <button onClick={() => deleteBtn(d.serviceID , d.nameservice)} className=" w-[100px] bg-red-400 text-white shadow-md space-x-2 h-[40px]">
                                                    <FontAwesomeIcon icon={faTrashArrowUp} />
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
            </div>
            <Popup 
                isOpen = {isOpen} 
                setIsOpen = {setIsOpen}
                name = "services"
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
            />
        </>
    );
};